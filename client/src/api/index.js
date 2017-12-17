import ApolloClient from 'apollo-client';
import { createHttpLink, HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, concat } from 'apollo-link';

import { createUrl, getCookie } from './utils'

const httpLink = createHttpLink({
    uri: createUrl('/graphql'),
    credentials: 'include',
})

const csrfMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        }
    })
    return forward(operation)
})

export const client = new ApolloClient({
    link: concat(csrfMiddleware, httpLink),
    cache: new InMemoryCache(),
})
