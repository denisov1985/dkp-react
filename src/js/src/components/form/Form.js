import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
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

    /**
     * On receive new props
     * May me need to invoke on did mount
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        let data = {};
        if (nextProps.dataset !== null && nextProps.dataset !== undefined) {
            data = nextProps.dataset;
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
