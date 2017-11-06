
let id = 0

const createLeague = args => {
    id++
    return {
        id,
        skill_bracket: '2k',
        teams: 14,
        ...args,
    }
}

export default [

]
