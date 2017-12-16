export const isProduction = process.env.NODE_ENV === 'production'

export const getCookie = cookieName => document.cookie.replace(
    new RegExp(`(?:(?:^|.*;\s*)${cookieName}\s*\=\s*([^;]*).*$)|^.*$`), "$1"
)

export const createUrl = url => {
    const _url = isProduction ? `//api.wepickheroes.com${url}` : `//localhost:8000${url}`
    console.log('_url', _url)
    return _url
}
