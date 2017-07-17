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
import Products from './containers/products/Products';
import Category from './containers/category/Category';
import ProductView from './containers/products/ProductView';
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
            <Route roles={[ROLE_ADMIN, ROLE_MANAGER]} name="Register" path="/register" component={Register} />
            <Route roles={[ROLE_ADMIN, ROLE_MANAGER]} name="Login" path="/login" component={Login} />
            <Route roles={[ROLE_ADMIN, ROLE_MANAGER]} name="Logout" path="/logout" component={Logout} />

            <Route name="Главная" path="/">
                <IndexRoute name="Главная" component={Dashboard} />
                <Route name="Каталог" path="catalog">
                    <Route name="Продукты" path="products">
                        <IndexRoute name="Главная" component={Products} />
                        <Route name="Просмотр продукта" path="view/:id" component={ProductView} />
                        <Route name="Просмотр продукта" path="attributes/:id" component={ProductView} />
                        <Route name="Просмотр продукта" path="inventory/:id" component={ProductView} />
                        <Route name="Просмотр продукта" path="related/:id" component={ProductView} />
                        <Route name="Просмотр продукта" path="review/:id" component={ProductView} />
                        <Route name="Просмотр продукта" path="tabs/:id" component={ProductView} />
                        <Route name="Просмотр продукта" path="coupons/:id" component={ProductView} />
                        <Route name="Просмотр продукта" path="attachments/:id" component={ProductView} />
                    </Route>
                    <Route name="Категории" path="category" component={Category} />
                    <Route name="Отзывы" path="reviews" component={UnderConstruction} />
                    <Route name="Закладки" path="tabs" component={UnderConstruction} />
                    <Route name="Атрибуты" path="attributes" component={UnderConstruction} />
                    <Route name="Запросы" path="requests" component={UnderConstruction} />
                    <Route name="Импорт" path="import" component={UnderConstruction} />
                    <Route name="Експорт" path="export" component={UnderConstruction} />
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);