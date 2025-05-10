export interface Film {
	title: string
	slug: string
	tmdbId: number
	rating: number | undefined
}

export type FilmWithoutTmdbId = Omit<Film, 'tmdbId'>

export interface ProgressEvent {
	status: 'fetching_films' | 'fetching_details' | 'complete' | 'error'
	stage?: 'films' | 'details'
	page?: number
	filmsFound?: number
	totalFilms?: number
	currentFilm?: string
	lastTmdbId?: number
	progress?: number
	films?: Film[]
	error?: string
	lastProcessedFilm?: string
}
