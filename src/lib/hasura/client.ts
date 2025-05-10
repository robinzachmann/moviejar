import { HASURA_ADMIN_SECRET, HASURA_ENDPOINT } from '$env/static/private'
import { GraphQLClient } from 'graphql-request'

if (!HASURA_ENDPOINT || !HASURA_ADMIN_SECRET) {
	throw new Error('HASURA_ENDPOINT and HASURA_ADMIN_SECRET must be set')
}

export const hasuraClient = new GraphQLClient(HASURA_ENDPOINT, {
	headers: {
		'x-hasura-admin-secret': HASURA_ADMIN_SECRET
	}
})
