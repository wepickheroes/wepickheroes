import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import 'font-awesome/css/font-awesome.min.css'
import './styles/bootstrap-theme/wepickheroes.css'

import { client } from './api'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

const app = (
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
