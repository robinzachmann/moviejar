/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  bigint: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "watched_movie" */
  delete_watched_movie?: Maybe<Watched_Movie_Mutation_Response>;
  /** delete single row from the table: "watched_movie" */
  delete_watched_movie_by_pk?: Maybe<Watched_Movie>;
  /** insert data into the table: "watched_movie" */
  insert_watched_movie?: Maybe<Watched_Movie_Mutation_Response>;
  /** insert a single row into the table: "watched_movie" */
  insert_watched_movie_one?: Maybe<Watched_Movie>;
  /** update data of the table: "watched_movie" */
  update_watched_movie?: Maybe<Watched_Movie_Mutation_Response>;
  /** update single row of the table: "watched_movie" */
  update_watched_movie_by_pk?: Maybe<Watched_Movie>;
  /** update multiples rows of table: "watched_movie" */
  update_watched_movie_many?: Maybe<Array<Maybe<Watched_Movie_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_Watched_MovieArgs = {
  where: Watched_Movie_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Watched_Movie_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootInsert_Watched_MovieArgs = {
  objects: Array<Watched_Movie_Insert_Input>;
  on_conflict?: InputMaybe<Watched_Movie_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Watched_Movie_OneArgs = {
  object: Watched_Movie_Insert_Input;
  on_conflict?: InputMaybe<Watched_Movie_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Watched_MovieArgs = {
  _inc?: InputMaybe<Watched_Movie_Inc_Input>;
  _set?: InputMaybe<Watched_Movie_Set_Input>;
  where: Watched_Movie_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Watched_Movie_By_PkArgs = {
  _inc?: InputMaybe<Watched_Movie_Inc_Input>;
  _set?: InputMaybe<Watched_Movie_Set_Input>;
  pk_columns: Watched_Movie_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Watched_Movie_ManyArgs = {
  updates: Array<Watched_Movie_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "watched_movie" */
  watched_movie: Array<Watched_Movie>;
  /** fetch aggregated fields from the table: "watched_movie" */
  watched_movie_aggregate: Watched_Movie_Aggregate;
  /** fetch data from the table: "watched_movie" using primary key columns */
  watched_movie_by_pk?: Maybe<Watched_Movie>;
};


export type Query_RootWatched_MovieArgs = {
  distinct_on?: InputMaybe<Array<Watched_Movie_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Watched_Movie_Order_By>>;
  where?: InputMaybe<Watched_Movie_Bool_Exp>;
};


export type Query_RootWatched_Movie_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Watched_Movie_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Watched_Movie_Order_By>>;
  where?: InputMaybe<Watched_Movie_Bool_Exp>;
};


export type Query_RootWatched_Movie_By_PkArgs = {
  id: Scalars['bigint']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "watched_movie" */
  watched_movie: Array<Watched_Movie>;
  /** fetch aggregated fields from the table: "watched_movie" */
  watched_movie_aggregate: Watched_Movie_Aggregate;
  /** fetch data from the table: "watched_movie" using primary key columns */
  watched_movie_by_pk?: Maybe<Watched_Movie>;
  /** fetch data from the table in a streaming manner: "watched_movie" */
  watched_movie_stream: Array<Watched_Movie>;
};


export type Subscription_RootWatched_MovieArgs = {
  distinct_on?: InputMaybe<Array<Watched_Movie_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Watched_Movie_Order_By>>;
  where?: InputMaybe<Watched_Movie_Bool_Exp>;
};


export type Subscription_RootWatched_Movie_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Watched_Movie_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Watched_Movie_Order_By>>;
  where?: InputMaybe<Watched_Movie_Bool_Exp>;
};


export type Subscription_RootWatched_Movie_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootWatched_Movie_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Watched_Movie_Stream_Cursor_Input>>;
  where?: InputMaybe<Watched_Movie_Bool_Exp>;
};

/** columns and relationships of "watched_movie" */
export type Watched_Movie = {
  __typename?: 'watched_movie';
  id: Scalars['bigint']['output'];
  tmdb_id: Scalars['bigint']['output'];
  user_id: Scalars['bigint']['output'];
  user_rating?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "watched_movie" */
export type Watched_Movie_Aggregate = {
  __typename?: 'watched_movie_aggregate';
  aggregate?: Maybe<Watched_Movie_Aggregate_Fields>;
  nodes: Array<Watched_Movie>;
};

/** aggregate fields of "watched_movie" */
export type Watched_Movie_Aggregate_Fields = {
  __typename?: 'watched_movie_aggregate_fields';
  avg?: Maybe<Watched_Movie_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Watched_Movie_Max_Fields>;
  min?: Maybe<Watched_Movie_Min_Fields>;
  stddev?: Maybe<Watched_Movie_Stddev_Fields>;
  stddev_pop?: Maybe<Watched_Movie_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Watched_Movie_Stddev_Samp_Fields>;
  sum?: Maybe<Watched_Movie_Sum_Fields>;
  var_pop?: Maybe<Watched_Movie_Var_Pop_Fields>;
  var_samp?: Maybe<Watched_Movie_Var_Samp_Fields>;
  variance?: Maybe<Watched_Movie_Variance_Fields>;
};


/** aggregate fields of "watched_movie" */
export type Watched_Movie_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Watched_Movie_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Watched_Movie_Avg_Fields = {
  __typename?: 'watched_movie_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  tmdb_id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
  user_rating?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "watched_movie". All fields are combined with a logical 'AND'. */
export type Watched_Movie_Bool_Exp = {
  _and?: InputMaybe<Array<Watched_Movie_Bool_Exp>>;
  _not?: InputMaybe<Watched_Movie_Bool_Exp>;
  _or?: InputMaybe<Array<Watched_Movie_Bool_Exp>>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  tmdb_id?: InputMaybe<Bigint_Comparison_Exp>;
  user_id?: InputMaybe<Bigint_Comparison_Exp>;
  user_rating?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "watched_movie" */
export enum Watched_Movie_Constraint {
  /** unique or primary key constraint on columns "id" */
  WatchedMoviePkey = 'watched_movie_pkey',
  /** unique or primary key constraint on columns "user_id", "tmdb_id" */
  WatchedMovieTmdbIdUserIdKey = 'watched_movie_tmdb_id_user_id_key'
}

/** input type for incrementing numeric columns in table "watched_movie" */
export type Watched_Movie_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  tmdb_id?: InputMaybe<Scalars['bigint']['input']>;
  user_id?: InputMaybe<Scalars['bigint']['input']>;
  user_rating?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "watched_movie" */
export type Watched_Movie_Insert_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  tmdb_id?: InputMaybe<Scalars['bigint']['input']>;
  user_id?: InputMaybe<Scalars['bigint']['input']>;
  user_rating?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Watched_Movie_Max_Fields = {
  __typename?: 'watched_movie_max_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  tmdb_id?: Maybe<Scalars['bigint']['output']>;
  user_id?: Maybe<Scalars['bigint']['output']>;
  user_rating?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Watched_Movie_Min_Fields = {
  __typename?: 'watched_movie_min_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  tmdb_id?: Maybe<Scalars['bigint']['output']>;
  user_id?: Maybe<Scalars['bigint']['output']>;
  user_rating?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "watched_movie" */
export type Watched_Movie_Mutation_Response = {
  __typename?: 'watched_movie_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Watched_Movie>;
};

/** on_conflict condition type for table "watched_movie" */
export type Watched_Movie_On_Conflict = {
  constraint: Watched_Movie_Constraint;
  update_columns?: Array<Watched_Movie_Update_Column>;
  where?: InputMaybe<Watched_Movie_Bool_Exp>;
};

/** Ordering options when selecting data from "watched_movie". */
export type Watched_Movie_Order_By = {
  id?: InputMaybe<Order_By>;
  tmdb_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  user_rating?: InputMaybe<Order_By>;
};

/** primary key columns input for table: watched_movie */
export type Watched_Movie_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "watched_movie" */
export enum Watched_Movie_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  TmdbId = 'tmdb_id',
  /** column name */
  UserId = 'user_id',
  /** column name */
  UserRating = 'user_rating'
}

/** input type for updating data in table "watched_movie" */
export type Watched_Movie_Set_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  tmdb_id?: InputMaybe<Scalars['bigint']['input']>;
  user_id?: InputMaybe<Scalars['bigint']['input']>;
  user_rating?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Watched_Movie_Stddev_Fields = {
  __typename?: 'watched_movie_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  tmdb_id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
  user_rating?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Watched_Movie_Stddev_Pop_Fields = {
  __typename?: 'watched_movie_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  tmdb_id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
  user_rating?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Watched_Movie_Stddev_Samp_Fields = {
  __typename?: 'watched_movie_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  tmdb_id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
  user_rating?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "watched_movie" */
export type Watched_Movie_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Watched_Movie_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Watched_Movie_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  tmdb_id?: InputMaybe<Scalars['bigint']['input']>;
  user_id?: InputMaybe<Scalars['bigint']['input']>;
  user_rating?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Watched_Movie_Sum_Fields = {
  __typename?: 'watched_movie_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  tmdb_id?: Maybe<Scalars['bigint']['output']>;
  user_id?: Maybe<Scalars['bigint']['output']>;
  user_rating?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "watched_movie" */
export enum Watched_Movie_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  TmdbId = 'tmdb_id',
  /** column name */
  UserId = 'user_id',
  /** column name */
  UserRating = 'user_rating'
}

export type Watched_Movie_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Watched_Movie_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Watched_Movie_Set_Input>;
  /** filter the rows which have to be updated */
  where: Watched_Movie_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Watched_Movie_Var_Pop_Fields = {
  __typename?: 'watched_movie_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  tmdb_id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
  user_rating?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Watched_Movie_Var_Samp_Fields = {
  __typename?: 'watched_movie_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  tmdb_id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
  user_rating?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Watched_Movie_Variance_Fields = {
  __typename?: 'watched_movie_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  tmdb_id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
  user_rating?: Maybe<Scalars['Float']['output']>;
};

export type InsertWatchedMovieMutationVariables = Exact<{
  tmdbId: Scalars['bigint']['input'];
  userRating?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['bigint']['input'];
}>;


export type InsertWatchedMovieMutation = { __typename?: 'mutation_root', insert_watched_movie_one?: { __typename?: 'watched_movie', tmdb_id: any, user_rating?: number | null, user_id: any } | null };

export type GetWatchedMoviesQueryVariables = Exact<{
  userId: Scalars['bigint']['input'];
}>;


export type GetWatchedMoviesQuery = { __typename?: 'query_root', watched_movie_aggregate: { __typename?: 'watched_movie_aggregate', aggregate?: { __typename?: 'watched_movie_aggregate_fields', count: number } | null }, watched_movie: Array<{ __typename?: 'watched_movie', id: any, tmdb_id: any, user_rating?: number | null }> };


export const InsertWatchedMovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertWatchedMovie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userRating"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_watched_movie_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"tmdb_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userRating"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"on_conflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"watched_movie_tmdb_id_user_id_key"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"user_rating"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tmdb_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_rating"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}}]}}]} as unknown as DocumentNode<InsertWatchedMovieMutation, InsertWatchedMovieMutationVariables>;
export const GetWatchedMoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWatchedMovies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"watched_movie_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"watched_movie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_rating"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_is_null"},"value":{"kind":"BooleanValue","value":false}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_rating"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdb_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_rating"}}]}}]}}]} as unknown as DocumentNode<GetWatchedMoviesQuery, GetWatchedMoviesQueryVariables>;