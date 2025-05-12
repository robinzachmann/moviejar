import type { GetWatchedMoviesQuery, InsertWatchedMovieMutation } from '$lib/graphql/graphql'
import { gql } from 'graphql-request'

export const INSERT_WATCHED_MOVIE = gql`
	mutation InsertWatchedMovie($tmdbId: bigint!, $userRating: Int, $userId: bigint!) {
		insert_watched_movie_one(
			object: { tmdb_id: $tmdbId, user_rating: $userRating, user_id: $userId }
			on_conflict: { constraint: watched_movie_tmdb_id_user_id_key, update_columns: [user_rating] }
		) {
			tmdb_id
			user_rating
			user_id
		}
	}
` as const

export const GET_WATCHED_MOVIES = gql`
	query GetWatchedMovies($userId: bigint!) {
		watched_movie_aggregate(where: { user_id: { _eq: $userId } }) {
			aggregate {
				count
			}
		}
		watched_movie(
			where: { user_id: { _eq: $userId }, user_rating: { _is_null: false } }
			order_by: { user_rating: desc }
			limit: 20
		) {
			id
			tmdb_id
			user_rating
		}
	}
` as const

export type { GetWatchedMoviesQuery, InsertWatchedMovieMutation }
