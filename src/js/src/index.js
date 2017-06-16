import semanticUi from 'semantic-ui-css/semantic.css';
import semanticGridUi from 'semantic-ui-css/components/grid.css';
import React from 'react';
import thunkMiddleware from 'redux-thunk'
import { render } from 'react-dom'
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './reducers/Root';
import { Router, Route, browserHistory } from 'react-router';

import Login from './containers/profile/Login';
import Register from './containers/profile/Register';
import Dashboard from './containers/dashboard/Dashboard';
import UnderConstruction from './containers/common/UnderConstruction';

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
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/orders" component={UnderConstruction} />
        </Router>
    </Provider>,
    document.getElementById('root')
);