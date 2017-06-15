import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Dashboard extends Component {

    render() {
        return (
            <div>
                <div className="ui inverted segment" style={{ borderRadius: 0}}>

                    <div className="ui inverted secondary menu">
                        <div className="item" style={{padding: '0px'}}>
                            <img width="32" height="32" className="logo margin-right-10" src="/img/logo.png" />
                        </div>

                        <a className="active item">
                            Главная
                        </a>
                        <a className="item">
                            Заказы
                        </a>
                        <a className="item">
                            Товары
                        </a>
                        <a className="item">
                            Бренды
                        </a>
                        <a className="item">
                            Поставщики
                        </a>
                        <a className="item">
                            Настройки
                        </a>
                    </div>
                </div>

                <div style={{
                    marginRight: '14px',
                    marginLeft: '14px',
                }}>
                    <div className="ui breadcrumb">
                        <a className="section">Home</a>
                        <i className="right angle icon divider"/>
                        <a className="section">Store</a>
                        <i className="right angle icon divider"/>
                        <div className="active section">T-Shirt</div>
                    </div>

                    <h2 className="ui header">
                        Account Settings
                        <div className="sub header">Manage your account settings and set e-mail preferences.</div>
                    </h2>

                    <div className="ui buttons">
                        <button className="ui button right floated">One</button>
                        <button className="ui button">Two</button>
                        <button className="ui button">Three</button>
                    </div>
                    
                    <table className="ui compact celled definition table">
                        <thead className="full-width">
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Registration Date</th>
                            <th>E-mail address</th>
                            <th>Premium Plan</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="collapsing">
                                <div className="ui fitted slider checkbox">
                                    <input type="checkbox"/> <label></label>
                                </div>
                            </td>
                            <td>John Lilki</td>
                            <td>September 14, 2013</td>
                            <td>jhlilk22@yahoo.com</td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <td className="collapsing">
                                <div className="ui fitted slider checkbox">
                                    <input type="checkbox"/> <label></label>
                                </div>
                            </td>
                            <td>Jamie Harington</td>
                            <td>January 11, 2014</td>
                            <td>jamieharingonton@yahoo.com</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td className="collapsing">
                                <div className="ui fitted slider checkbox">
                                    <input type="checkbox"/> <label></label>
                                </div>
                            </td>
                            <td>Jill Lewis</td>
                            <td>May 11, 2014</td>
                            <td>jilsewris22@yahoo.com</td>
                            <td>Yes</td>
                        </tr>
                        </tbody>
                        <tfoot className="full-width">
                        <tr>
                            <th></th>
                            <th colspan="4">
                                <div className="ui right floated small primary labeled icon button">
                                    <i className="user icon"></i> Add User
                                </div>
                                <div className="ui small  button">
                                    Approve
                                </div>
                                <div className="ui small  disabled button">
                                    Approve All
                                </div>
                            </th>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)