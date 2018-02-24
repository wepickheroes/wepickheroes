export const isProduction = process.env.NODE_ENV === 'production'

export const getCookie = cookieName => document.cookie.replace(
    new RegExp(`(?:(?:^|.*;\s*)${cookieName}\s*\=\s*([^;]*).*$)|^.*$`), "$1"
)

export const createUrl = url => isProduction ? `//api.push.gg${url}` : `//local.push.gg:8000${url}`
