import React, {Component} from 'react'
import {Link} from 'react-router';

export default class ProductTabs extends Component {
    link(path) {
        return path + '/' + this.props.id;
    }

    render() {
        return (
            <div className="ui top attached tabular menu">
                <Link to={this.link('/catalog/products/view')} className="item" activeClassName="active">
                    Информация
                </Link>
                <Link to={this.link('/catalog/products/attributes')}  className="item" activeClassName="active">
                    Аттрибуты
                </Link>
                <Link to={this.link('/catalog/products/inventory')} className="item" activeClassName="active">
                    Инвентаризация
                </Link>
                <Link to={this.link('/catalog/products/related')} className="item" activeClassName="active">
                    Сопутствующие товары
                </Link>
                <Link to={this.link('/catalog/products/review')} className="item" activeClassName="active">
                    Обзоры
                </Link>
                <Link to={this.link('/catalog/products/tabs')} className="item" activeClassName="active">
                    Закладки
                </Link>
                <Link to={this.link('/catalog/products/coupons')} className="item" activeClassName="active">
                    Подарочные сертификаты
                </Link>
                <Link to={this.link('/catalog/products/attachments')} className="item" activeClassName="active">
                    Вложения
                </Link>
            </div>
        )
    }

    renderItem(name) {
        return (<a className="item" >{name}</a>);
    }
}
