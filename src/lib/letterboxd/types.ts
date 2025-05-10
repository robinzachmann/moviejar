export interface Film {
	title: string
	slug: string
	tmdbId: number
	rating: number | undefined
}

export type FilmWithoutTmdbId = Omit<Film, 'tmdbId'>

export type ProgressEvent =
	| {
			status: 'fetching_films'
			page: number
			filmsFound: number
	  }
	| {
			status: 'fetching_details'
			// current film
			film: FilmWithoutTmdbId
			tmdbId: number
			tmdbType: 'movie' | 'tv'
			isSkipped: boolean
			// progress
			filmsFound: number
			totalFilms: number
			progress: number
			skippedFilms: string[]
	  }
	| {
			status: 'complete'
			films: Film[]
	  }
	| {
			status: 'error'
			error: string
			lastProcessedFilm?: string
	  }
