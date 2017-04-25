import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import Loader from '../loader/Loader';
import InputText from './elements/InputText';
import Row from './Row';

export default class Form extends CoreComponent {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let data = {};
        if (this.props.data !== null && this.props.data !== undefined) {
            data = this.props.data;
        }
        this.setState(data);
    }

    render() {
        return (<form  className="ui form">
            {this.renderElementWithProps({
                form: this
            }, this.props.children)}
        </form>);
    }
}

Form.Row        = Row;
Form.Input      = InputText;
Form.Input.Text = InputText;
