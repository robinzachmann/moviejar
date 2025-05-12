/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n\tmutation InsertWatchedMovie($tmdbId: bigint!, $userRating: Int, $userId: bigint!) {\n\t\tinsert_watched_movie_one(\n\t\t\tobject: { tmdb_id: $tmdbId, user_rating: $userRating, user_id: $userId }\n\t\t\ton_conflict: { constraint: watched_movie_tmdb_id_user_id_key, update_columns: [user_rating] }\n\t\t) {\n\t\t\ttmdb_id\n\t\t\tuser_rating\n\t\t\tuser_id\n\t\t}\n\t}\n": typeof types.InsertWatchedMovieDocument,
    "\n\tquery GetWatchedMovies($userId: bigint!) {\n\t\twatched_movie_aggregate(where: { user_id: { _eq: $userId } }) {\n\t\t\taggregate {\n\t\t\t\tcount\n\t\t\t}\n\t\t}\n\t\twatched_movie(\n\t\t\twhere: { user_id: { _eq: $userId }, user_rating: { _is_null: false } }\n\t\t\torder_by: { user_rating: desc }\n\t\t\tlimit: 20\n\t\t) {\n\t\t\tid\n\t\t\ttmdb_id\n\t\t\tuser_rating\n\t\t}\n\t}\n": typeof types.GetWatchedMoviesDocument,
};
const documents: Documents = {
    "\n\tmutation InsertWatchedMovie($tmdbId: bigint!, $userRating: Int, $userId: bigint!) {\n\t\tinsert_watched_movie_one(\n\t\t\tobject: { tmdb_id: $tmdbId, user_rating: $userRating, user_id: $userId }\n\t\t\ton_conflict: { constraint: watched_movie_tmdb_id_user_id_key, update_columns: [user_rating] }\n\t\t) {\n\t\t\ttmdb_id\n\t\t\tuser_rating\n\t\t\tuser_id\n\t\t}\n\t}\n": types.InsertWatchedMovieDocument,
    "\n\tquery GetWatchedMovies($userId: bigint!) {\n\t\twatched_movie_aggregate(where: { user_id: { _eq: $userId } }) {\n\t\t\taggregate {\n\t\t\t\tcount\n\t\t\t}\n\t\t}\n\t\twatched_movie(\n\t\t\twhere: { user_id: { _eq: $userId }, user_rating: { _is_null: false } }\n\t\t\torder_by: { user_rating: desc }\n\t\t\tlimit: 20\n\t\t) {\n\t\t\tid\n\t\t\ttmdb_id\n\t\t\tuser_rating\n\t\t}\n\t}\n": types.GetWatchedMoviesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation InsertWatchedMovie($tmdbId: bigint!, $userRating: Int, $userId: bigint!) {\n\t\tinsert_watched_movie_one(\n\t\t\tobject: { tmdb_id: $tmdbId, user_rating: $userRating, user_id: $userId }\n\t\t\ton_conflict: { constraint: watched_movie_tmdb_id_user_id_key, update_columns: [user_rating] }\n\t\t) {\n\t\t\ttmdb_id\n\t\t\tuser_rating\n\t\t\tuser_id\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation InsertWatchedMovie($tmdbId: bigint!, $userRating: Int, $userId: bigint!) {\n\t\tinsert_watched_movie_one(\n\t\t\tobject: { tmdb_id: $tmdbId, user_rating: $userRating, user_id: $userId }\n\t\t\ton_conflict: { constraint: watched_movie_tmdb_id_user_id_key, update_columns: [user_rating] }\n\t\t) {\n\t\t\ttmdb_id\n\t\t\tuser_rating\n\t\t\tuser_id\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetWatchedMovies($userId: bigint!) {\n\t\twatched_movie_aggregate(where: { user_id: { _eq: $userId } }) {\n\t\t\taggregate {\n\t\t\t\tcount\n\t\t\t}\n\t\t}\n\t\twatched_movie(\n\t\t\twhere: { user_id: { _eq: $userId }, user_rating: { _is_null: false } }\n\t\t\torder_by: { user_rating: desc }\n\t\t\tlimit: 20\n\t\t) {\n\t\t\tid\n\t\t\ttmdb_id\n\t\t\tuser_rating\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetWatchedMovies($userId: bigint!) {\n\t\twatched_movie_aggregate(where: { user_id: { _eq: $userId } }) {\n\t\t\taggregate {\n\t\t\t\tcount\n\t\t\t}\n\t\t}\n\t\twatched_movie(\n\t\t\twhere: { user_id: { _eq: $userId }, user_rating: { _is_null: false } }\n\t\t\torder_by: { user_rating: desc }\n\t\t\tlimit: 20\n\t\t) {\n\t\t\tid\n\t\t\ttmdb_id\n\t\t\tuser_rating\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;