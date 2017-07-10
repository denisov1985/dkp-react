import semanticUi from 'semantic-ui-css/semantic.css';
import semanticGridUi from 'semantic-ui-css/components/grid.css';
import React from 'react';
import thunkMiddleware from 'redux-thunk'
import { render } from 'react-dom'
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './reducers/Root';
import {IndexRoute, Router, Route, browserHistory } from 'react-router';

import Login from './containers/profile/Login';
import Logout from './containers/profile/Logout';
import Register from './containers/profile/Register';
import Dashboard from './containers/dashboard/Dashboard';
import Regions from './containers/dashboard/Regions';
import Classes from './containers/member/Classes';
import Products from './containers/products/Products';
import UnderConstruction from './containers/common/UnderConstruction';

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
);

const ROLE_ADMIN   = 'admin';
const ROLE_MANAGER = 'manager';

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route roles={[ROLE_ADMIN, ROLE_MANAGER]} name="Register" path="/" component={Register} />
            <Route roles={[ROLE_ADMIN, ROLE_MANAGER]} name="Login" path="/login" component={Login} />
            <Route roles={[ROLE_ADMIN, ROLE_MANAGER]} name="Logout" path="/logout" component={Logout} />
            <Route roles={[ROLE_ADMIN, ROLE_MANAGER]} someData="ololo" name="Главная" path="dashboard" >
                <IndexRoute  roles={[ROLE_ADMIN, ROLE_MANAGER]} name="Админка" component={Dashboard} />
                <Route  roles={[ROLE_ADMIN, ROLE_MANAGER]} name="Отчеты" path="reports" component={UnderConstruction} />
                <Route  roles={[ROLE_ADMIN, ROLE_MANAGER]} name="Регионы" path="regions" component={Regions} />
            </Route>
            <Route roles={[ROLE_ADMIN, ROLE_MANAGER]} name="Заказы" path="/orders" component={Classes} />
            <Route roles={[ROLE_ADMIN, ROLE_MANAGER]} name="Товары" path="/products" component={Products} />
            <Route roles={[ROLE_ADMIN, ROLE_MANAGER]} name="Бренды" path="/brands" component={UnderConstruction} />
            <Route roles={[ROLE_ADMIN, ROLE_MANAGER]} name="Персонал" path="/employers" component={UnderConstruction} />
            <Route roles={[ROLE_ADMIN, ROLE_MANAGER]} name="Настройки" path="/settings" component={UnderConstruction} />
        </Router>
    </Provider>,
    document.getElementById('root')
);