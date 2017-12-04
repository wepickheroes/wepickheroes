import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import 'font-awesome/css/font-awesome.min.css';
import './styles/bootstrap/bootstrap.css'
import './styles/bootstrap/bootstrap-reboot.css'

import { client } from './api'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store'

import gql from 'graphql-tag';

client.query({ query: gql`{ isAuthenticated }` }).then(console.log);

const app = (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </ApolloProvider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
