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
            <Route name="Register" path="/" component={Register} />
            <Route name="Login" path="/login" component={Login} />
            <Route name="Главная" path="/dashboard" component={Dashboard} >
                <Route name="Отчеты" path="/reports" component={UnderConstruction} />
            </Route>
            <Route name="Заказы" path="/orders" component={UnderConstruction} />
            <Route name="Товары" path="/products" component={UnderConstruction} />
            <Route name="Бренды" path="/brands" component={UnderConstruction} />
            <Route name="Персонал" path="/employers" component={UnderConstruction} />
            <Route name="Настройки" path="/settings" component={UnderConstruction} />
        </Router>
    </Provider>,
    document.getElementById('root')
);