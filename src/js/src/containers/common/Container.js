import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Container extends Component {

    initReduxProps() {
        return {}
    }

    static _mapStateToProps(state, ownProps) {
        console.log(this);
        return this.mapStateToProps(state, ownProps)
    }

    static _mapDispatchToProps(dispatch) {
        return {
            actions: this.mapDispatchToProps(dispatch)
        }
    }

    static mapStateToProps(state, ownProps) {
        return {}
    }

    static mapDispatchToProps(dispatch) {
        return {}
    }

    static connect() {
        let self = this;
        return connect((state, ownProps) => {
            return self.mapStateToProps(state, ownProps)
        } , (dispatch) => {
            return {
                actions: self.mapDispatchToProps(dispatch)
            }
        })(this)
    }
}

export default Container;