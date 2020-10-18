import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

import AppRoute from './routes/AppRoute';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigStore';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <AppRoute />
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();