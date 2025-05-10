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
`
