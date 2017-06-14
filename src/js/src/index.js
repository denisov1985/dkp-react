import semanticUi from 'semantic-ui-css/semantic.css';
import semanticGridUi from 'semantic-ui-css/components/grid.css';
import React from 'react';
import thunkMiddleware from 'redux-thunk'
import { render } from 'react-dom'
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './reducers/Root';
//import Router from './router/Router';
import { Router, Route, browserHistory } from 'react-router';
import * as routes from './config/routes';

import Login from './containers/profile/Login';
import Register from './containers/profile/Register';

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Register} />
            <Route path="/login/(:filter)" component={Login} />
        </Router>
    </Provider>,
    document.getElementById('root')
);