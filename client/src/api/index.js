import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { createUrl, getCookie } from './utils'

export const client = new ApolloClient({
    link: new HttpLink({
        uri: createUrl('/graphql'),
        credentials: 'include',
        headers: {
            'x-csrftoken': getCookie('csrftoken'),
        },
    }),
    cache: new InMemoryCache(),
})
