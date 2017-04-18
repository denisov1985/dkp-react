import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import Link from '../../router/Link';

export default class Breadcrumbs extends CoreComponent {
    buildItems(items, template) {
        console.log(template)
        let result = [];
        if (Array.isArray(items)) {
            result = items.map((e, i) => {
                if (Array.isArray(e.children)) {
                    return (<div key={i} className="ui simple dropdown item">
                        {e.title} <i className="dropdown icon"></i>
                        <div className="menu">
                            {this.buildItems(e.children, template)}
                        </div>

                    </div>);
                }   else  {
                    let props = {
                        key: i,
                        className: 'item'
                    };
                    props[this.props.itemData] = e;
                    props.children = e[this.props.itemTitle];
                    return this.renderElementWithProps(props, template)
                }
            })
        }
        return result;
    }

    render() {
        let route = this.props.router.resolve();
        let items = route.getAllParent([]);

        return (
            <div className="ui breadcrumb">
                <a href="#/" className="section">Home</a>
                {items.reverse().map((row, index) => {
                    let style = row.isActive() ? {color: '#777'} : {};
                    return (<span><i className="right angle icon divider"></i><Link
                        style={style}
                        route={row}
                        key={index}
                        className="section"
                    >{row.title}</Link>
                    </span>)
                })}
            </div>
        )
    }
}
