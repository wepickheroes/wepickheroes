import { css } from "styled-components"

const sizes = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
}

export const media = Object.keys(sizes).reduce((acc, label) => ({
    ...acc,
    [label]: (...args) => css`
        @media (min-width: ${sizes[label]}px) {
            ${css(...args)}
        }
    `
}), {})
