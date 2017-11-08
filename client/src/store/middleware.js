import logger from 'redux-logger'
import { queryMiddleware } from 'redux-query';

const getEntities = state => state.entities
const getQueries = state => state.queries

export default [
    queryMiddleware(getQueries, getEntities),
    logger,
]
