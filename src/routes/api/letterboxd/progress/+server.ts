import { hasuraClient } from '$lib/hasura/client'
import { INSERT_WATCHED_MOVIE } from '$lib/hasura/operations'
import { fetchLetterboxdDetails, importLetterboxdFilms } from '$lib/letterboxd/scraper.server'
import type { ProgressEvent } from '$lib/letterboxd/types'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url }) => {
	const username = url.searchParams.get('username')

	if (!username) {
		return new Response('Username is required', { status: 400 })
	}

	const encoder = new TextEncoder()
	const stream = new ReadableStream({
		async start(controller) {
			const sendEvent = async (event: ProgressEvent) => {
				controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))

				// Save movie to database when we have TMDB ID
				if (event.status === 'fetching_details' && event.tmdbId && !event.isSkipped) {
					try {
						await hasuraClient.request(INSERT_WATCHED_MOVIE, {
							tmdbId: event.tmdbId,
							userRating: event.film.rating,
							userId: 1 // Hardcoded user ID for now
						})
					} catch (error) {
						console.error('Failed to save movie to database:', error)
						sendEvent({
							status: 'error',
							error: error instanceof Error ? error.message : 'Unknown error occurred',
							lastProcessedFilm: event.film.title
						})
					}
				}
			}

			try {
				const films = await importLetterboxdFilms(username, sendEvent)
				const details = await fetchLetterboxdDetails(films, sendEvent)
				sendEvent({
					status: 'complete',
					films: details
				})
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
				sendEvent({
					status: 'error',
					error: errorMessage,
					lastProcessedFilm: undefined
				})
			} finally {
				controller.close()
			}
		}
	})

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive'
		}
	})
}
