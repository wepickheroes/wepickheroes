import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const getCookie = cookieName => document.cookie.replace(
    new RegExp(`(?:(?:^|.*;\s*)${cookieName}\s*\=\s*([^;]*).*$)|^.*$`), "$1"
)

export const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:8000/graphql',
        credentials: 'include',
        headers: {
            'x-csrftoken': getCookie('csrftoken'),
        },
    }),
    cache: new InMemoryCache(),
})