import React, {Component} from 'react'
import {Link} from 'react-router';

export default class ProductTabs extends Component {
    render() {
        return (
            <div className="ui top attached tabular menu">
                <Link to="/catalog/products/view/29998" className="item" activeClassName="active">
                    Информация
                </Link>
                <Link to="/catalog/products/attributes/29998" className="item" activeClassName="active">
                    Аттрибуты
                </Link>
                <Link to="/catalog/products/inventory/29998" className="item" activeClassName="active">
                    Инвентаризация
                </Link>
                <Link to="/catalog/products/related/29998" className="item" activeClassName="active">
                    Сопутствующие товары
                </Link>
                <Link to="/catalog/products/review/29998" className="item" activeClassName="active">
                    Обзоры
                </Link>
                <Link to="/catalog/products/tabs/29998" className="item" activeClassName="active">
                    Закладки
                </Link>
                <Link to="/catalog/products/coupons/29998" className="item" activeClassName="active">
                    Подарочные сертификаты
                </Link>
                <Link to="/catalog/products/attachments/29998" className="item" activeClassName="active">
                    Вложения
                </Link>
            </div>
        )
    }

    renderItem(name) {
        return (<a className="item" >{name}</a>);
    }
}