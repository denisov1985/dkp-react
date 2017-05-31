import React, {Component} from 'react'
import DataCell from './DataCell';

export default class DataTextEditCell extends DataCell {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            editable: false,
            value: this.getValue()
        }
    }

    /**
     * On new props
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {

    }

    onMouseEnter = () => {
        this.setState({
            hovered: true
        });
    }

    onMouseLeave = () => {
        this.setState({
            hovered: false
        });
    }

    onClick = (e) => {
        e.stopPropagation();
        let state = this.setNested(this.props.table.state, this.getPath('active'), true);
        this.props.table.setState(state);
    };

    getPath(item) {
        return ['rows', 'editable', this.props.record.id, this.props.column.props.field, item];
    }

    isActive() {
        return this.getNested(this.props.table.state, this.getPath('active'), false);
    }

    onClose = (e) => {
        let state = this.setNested(this.props.table.state, this.getPath('active'), false);
        this.props.table.setState(state);
        e.stopPropagation();
    }

    onSave = (e) => {
        let record = {...this.props.record};
        record[this.props.column.props.field] = this.getNested(this.props.table.state, this.getPath('value'), this.getValue());
        this.props.onSave(record);
        this.onClose(e);
    }

    onChange = (e) => {
        let state = this.setNested(this.props.table.state, this.getPath('value'), e.target.value);
        this.props.table.setState(state);
    }

    renderInput() {
        return (<div className="ui action input fluid">
            <input onChange={this.onChange} type="text" placeholder="Search..." value={this.getNested(this.props.table.state, this.getPath('value'), this.getValue())} />
            <button onClick={this.onSave} className="ui icon button primary">
                <i className="save icon" />
            </button>
            <button onClick={this.onClose} className="ui icon button">
                <i className="cancel icon" />
            </button>
        </div>)
    }

    renderText() {
        return (<span>{this.getValue()}</span>)
    }

    renderActiveText() {
        return (<span><span style={{
            borderBottom: '1px dashed #4183c4',
            color: '#4183c4'
        }}>{this.getValue()}</span><i style={{marginLeft: '3px'}} className="write icon" /></span>)
    }

    renderContent() {
        if (this.isActive()) {
            return this.renderInput();
        }
        return this.state.hovered ? this.renderActiveText() : this.renderText();
    }

    render() {
        return <td style={{cursor: 'pointer'}} onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter} onClick={this.onClick}>{this.renderContent()}</td>
    }
}