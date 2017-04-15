import semanticUi from 'semantic-ui-css/semantic.css';
import React from 'react';
import thunkMiddleware from 'redux-thunk'
import { render } from 'react-dom'
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './reducers/Root';
import Router from './router/Router';
import * as routes from './config/routes';
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
);

render(
    <Provider store={store}>
        <Router routes={routes.routes} />
    </Provider>,
    document.getElementById('root')
);