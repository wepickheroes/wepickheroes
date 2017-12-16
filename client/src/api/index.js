import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const isProduction = process.env.NODE_ENV === 'production'

const getCookie = cookieName => document.cookie.replace(
    new RegExp(`(?:(?:^|.*;\s*)${cookieName}\s*\=\s*([^;]*).*$)|^.*$`), "$1"
)

export const createUrl = url => (
    isProduction ? `//api.wepickheroes.com${url}` : `//localhost:8000${url}`
)

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
