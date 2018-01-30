import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { createUrl } from './utils'

const httpLink = createHttpLink({
    uri: createUrl('/graphql'),
    credentials: 'include',
})

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})
