import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import 'font-awesome/css/font-awesome.min.css';
import './styles/bootstrap/bootstrap.css'
import './styles/bootstrap/bootstrap-reboot.css'

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store'

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
