import React, {Component} from 'react'
import {Link} from 'react-router';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ActionFactory from 'actions/ActionFactory';

class Container extends Component {

    /**
     * Init user session
     */
    componentWillMount() {
        //this.props.actions.auth.initSession();
    }

    /**
     * Checks if user logged in
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.get('loggedIn', false)) {
            //this.redirect('login');
        }
    }

    /**
     * Redirect to route
     * @param path
     */
    redirect(path) {
        this.props.router.push('/' + path);
    }

    isLoggedIn() {
        return this.props.auth.get('loggedIn', false);
    }

    /**
     * Redux mapStateToProps wrapper
     * @param state
     * @param ownProps
     * @returns {{}}
     */
    static mapStateToProps(state, ownProps) {
        let result = {};
        result[this.getEntity().toLowerCase()] = state[this.getEntity().toLowerCase()];
        return result;
    }

    /**
     * Redux mapDispatchToProps wrapper
     * @param dispatch
     * @returns {{}}
     */
    static mapDispatchToProps(dispatch) {
        let result = {};
        result[this.getEntity().toLowerCase()] = Container.getActionFactory().createCrudActions(dispatch, this.getEntity().toLowerCase())
        return result;
    }

    /**
     * Init default Redux props
     * @param state
     * @param ownProps
     * @returns {{auth: (auth|B|N|*)}}
     */
    static mapStateToPropsDefault(state, ownProps) {
        return {
            auth: state.auth
        }
    }

    /**
     * Init default Redux actions
     * @param dispatch
     * @returns {{auth: (auth|B|N)}}
     */
    static mapDispatchToPropsDefault(dispatch) {
        return {
            auth: ActionFactory.createAuthActions(dispatch)
        }
    }

    /**
     * Init redux
     * @returns {null}
     */
    static getEntity() {
        return 'Product';
    }

    /**
     * Redux connect wrapper
     * @returns {*}
     */
    static connect() {
        let self = this;
        return connect((state, ownProps) => {
            let props = self.mapStateToProps(state, ownProps)
            let defaultProps = self.mapStateToPropsDefault(state, ownProps);
            for (let key of Object.keys(defaultProps)) {
                props[key] = defaultProps[key];
            }
            return props;
        } , (dispatch) => {
            let actions = self.mapDispatchToProps(dispatch)
            let defaultActions = self.mapDispatchToPropsDefault(dispatch);
            for (let key of Object.keys(defaultActions)) {
                actions[key] = defaultActions[key];
            }
            return {
                actions: actions
            }
        })(this)
    }

    static getActionFactory = () => ActionFactory;

    getEntity = () => {
        null;
    }
}

Container.Link = Link;

export default Container;