import { hasuraClient } from '$lib/hasura/client'
import { GET_WATCHED_MOVIES } from '$lib/hasura/operations'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	try {
		const { watched_movie, watched_movie_aggregate } = await hasuraClient.request(
			GET_WATCHED_MOVIES,
			{
				userId: 1
			}
		)

		return {
			watchedMovies: watched_movie,
			watchedMoviesCount: watched_movie_aggregate.aggregate.count
		}
	} catch (error) {
		console.error('Error fetching watched movies:', error)
		return {
			watchedMovies: [],
			watchedMoviesCount: 0
		}
	}
}
