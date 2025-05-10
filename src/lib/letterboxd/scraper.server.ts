import * as cheerio from 'cheerio'
import type { Film, FilmWithoutTmdbId, ProgressEvent } from './types'

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

export const getTmdbId = async (slug: string): Promise<number> => {
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

export const importLetterboxdFilms = async (
	username: string,
	sendEvent: (event: ProgressEvent) => void
): Promise<FilmWithoutTmdbId[]> => {
	// Stage 1: Fetch all watched films
	sendEvent({
		status: 'fetching_films',
		page: 1,
		filmsFound: 0
	})

	let page = 1
	const films: FilmWithoutTmdbId[] = []

	while (true) {
		sendEvent({
			status: 'fetching_films',
			page,
			filmsFound: films.length
		})

		const url = `https://letterboxd.com/${username}/films/page/${page}`
		const response = await fetch(url)

		if (!response.ok) {
			if (response.status === 404) {
				throw new Error(`User "${username}" not found on Letterboxd`)
			}
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
			const poster = $element.find('.poster')
			const slug = poster.attr('data-film-slug')
			const title = poster.find('img').attr('alt')

			if (!title || !slug) {
				throw new Error(`Missing required film data: title=${title}, slug=${slug}`)
			}

			const rating = ratingText ? RATING_MAP[ratingText] : undefined
			films.push({ title, slug, rating })
		}

		page++
	}

	return films
}

export const fetchLetterboxdDetails = async (
	films: FilmWithoutTmdbId[],
	sendEvent: (event: ProgressEvent) => void
): Promise<Film[]> => {
	// Stage 2: Fetch TMDB IDs
	sendEvent({
		status: 'fetching_details',
		currentFilm: '',
		lastTmdbId: 0,
		filmsFound: 0,
		totalFilms: films.length,
		progress: 0
	})

	const filmsWithTmdbId: Array<Film> = []

	for (let i = 0; i < films.length; i++) {
		const film = films[i]
		try {
			const tmdbId = await getTmdbId(film.slug)

			sendEvent({
				status: 'fetching_details',
				currentFilm: film.title,
				lastTmdbId: tmdbId,
				filmsFound: i + 1,
				totalFilms: films.length,
				progress: Math.round(((i + 1) / films.length) * 100)
			})

			filmsWithTmdbId.push({ ...film, tmdbId })
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
			sendEvent({
				status: 'error',
				error: `Failed to get TMDB ID for ${film.title}: ${errorMessage}`,
				lastProcessedFilm: film.title
			})
			return filmsWithTmdbId
		}
	}

	return filmsWithTmdbId
}
