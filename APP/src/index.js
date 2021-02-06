import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';

import 'normalize.css/normalize.css';
import 'react-notifications/lib/notifications.css';
import 'react-image-lightbox/style.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import '@draft-js-plugins/mention/lib/plugin.css';
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