import * as cheerio from 'cheerio'
import type { RequestHandler } from './$types'

const RATING_MAP: Record<string, number> = {
	'★': 1,
	'★★': 2,
	'★★★': 3,
	'★★★★': 4,
	'★★★★★': 5,
	'★½': 1.5,
	'★★½': 2.5,
	'★★★½': 3.5,
	'★★★★½': 4.5
}

async function getTmdbId(slug: string): Promise<number> {
	const url = `https://letterboxd.com/film/${slug}/`
	const response = await fetch(url)
	if (!response.ok) {
		throw new Error(`Failed to fetch film ${slug}: ${response.statusText}`)
	}
	const html = await response.text()
	const $ = cheerio.load(html)
	const contentSection = $('#content')
	const tmdbLink = contentSection
		.find('a')
		.filter((_, el) => $(el).text().includes('TMDB'))
		.first()
	if (!tmdbLink.length) {
		throw new Error(`No TMDB link found for film ${slug}`)
	}

	const href = tmdbLink.attr('href')
	if (!href) {
		throw new Error(`TMDB link has no href for film ${slug}`)
	}

	// https://www.themoviedb.org/movie/<id>
	const match = href.match(/\/movie\/(\d+)\//)
	if (!match) {
		throw new Error(`Invalid TMDB link format for film ${slug}`)
	}

	return parseInt(match[1])
}

type ProgressEvent =
	| {
			status: 'fetching'
			page: number
			filmsFound: number
			currentFilm: string
			lastTmdbId?: number
	  }
	| {
			status: 'complete'
			films: Array<{ slug: string; rating: number | undefined; tmdbId: number }>
	  }
	| {
			status: 'error'
			error: string
			lastProcessedFilm?: string
	  }

export const GET: RequestHandler = async ({ url }) => {
	const username = url.searchParams.get('username')

	if (!username) {
		return new Response('Username is required', { status: 400 })
	}

	const encoder = new TextEncoder()
	const stream = new ReadableStream({
		async start(controller) {
			const sendEvent = (event: ProgressEvent) => {
				controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
			}

			try {
				let page = 1
				const films: Array<{ slug: string; rating: number | undefined; tmdbId: number }> = []

				while (true) {
					sendEvent({
						status: 'fetching',
						page,
						filmsFound: films.length,
						currentFilm: films[films.length - 1]?.slug
					})

					const url = `https://letterboxd.com/${username}/films/page/${page}`
					const response = await fetch(url)

					if (!response.ok) {
						throw new Error(`Failed to fetch page ${page}: ${response.statusText}`)
					}

					const html = await response.text()
					const $ = cheerio.load(html)

					const contentSection = $('#content')
					const posterList = contentSection.find('ul.poster-list')
					const ulElement = posterList.find('li')

					if (ulElement.length === 0) {
						break
					}

					for (const liElement of ulElement) {
						const $element = $(liElement)
						const ratingText = $element.find('.rating').text().trim()
						const slug = $element.find('.poster').attr('data-film-slug')

						if (!slug) continue

						const rating = ratingText ? RATING_MAP[ratingText] : undefined

						try {
							const tmdbId = await getTmdbId(slug)
							films.push({ slug, rating, tmdbId })

							sendEvent({
								status: 'fetching',
								page,
								filmsFound: films.length,
								currentFilm: slug,
								lastTmdbId: tmdbId
							})
						} catch (error) {
							const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
							sendEvent({
								status: 'error',
								error: `Failed to get TMDB ID for ${slug}: ${errorMessage}`,
								lastProcessedFilm: slug
							})
							controller.close()
							return
						}
					}

					page++
				}

				sendEvent({
					status: 'complete',
					films
				})
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
				sendEvent({
					status: 'error',
					error: errorMessage
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
