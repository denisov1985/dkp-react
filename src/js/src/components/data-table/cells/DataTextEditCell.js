import React, {Component} from 'react'
import DataCell from './DataCell';

export default class DataTextEditCell extends DataCell {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            hovered: false
        }
    }

    /**
     * On new props
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {}

    /**
     *  Highlight cell
     */
    onMouseEnter = () => {
        this.setState({
            hovered: true
        });
    }

    /**
     * Remove highlight cell
     */
    onMouseLeave = () => {
        this.setState({
            hovered: false
        });
    }

    /**
     * On click - edit cell value
     * @param e
     */
    onClick = (e) => {
        e.stopPropagation();
        let state = this.setNested(this.props.table.state, this.getPath('active'), true);
        this.props.table.setState(state);
    };

    /**
     * Get nested path for storing cell data
     * @param item
     * @returns {[string,string,*,*,*]}
     */
    getPath(item) {
        return ['rows', 'editable', this.props.record.id, this.props.column.props.field, item];
    }

    /**
     * Checks if cell is active (editing state)
     * @returns {*}
     */
    isActive() {
        return this.getNested(this.props.table.state, this.getPath('active'), false);
    }

    /**
     * On close cell
     * @param e
     */
    onClose = (e) => {
        let state = this.setNested(this.props.table.state, this.getPath('active'), false);
        let stateVal = this.setNested(state, this.getPath('value'), this.getValue());
        this.props.table.setState(stateVal);
        e.stopPropagation();
    }

    /**
     * On save cell value
     * @param e
     */
    onSave = (e) => {
        e.stopPropagation();
        let record = {...this.props.record};
        record[this.props.column.props.field] = this.getNested(this.props.table.state, this.getPath('value'), this.getValue());
        this.props.onSave(record, this.props.column.props.field, this.props.table.props.name || 'default');
        let state = this.setNested(this.props.table.state, this.getPath('active'), false);
        this.props.table.setState(state);
    }

    /**
     * On change - update table state
     * @param e
     */
    onChange = (e) => {
        let state = this.setNested(this.props.table.state, this.getPath('value'), e.target.value);
        this.props.table.setState(state);
    }

    /**
     * Dummy handler for loading state
     */
    onChangeDummy() {
        // do nothing
    }

    /**
     * Render loading state
     * @returns {XML}
     */
    renderInputLoading() {
        return (<div className="ui icon input loading fluid">
            <input onChange={this.onChangeDummy} type="text" placeholder="Search..." value={this.getNested(this.props.table.state, this.getPath('value'), this.getValue())} />
                <i className="search icon"></i>
        </div>)
    }

    /**
     * Render input state
     * @returns {XML}
     */
    renderInput() {
        return (<div className="ui action input fluid loading">
            <input onChange={this.onChange} type="text" placeholder="Search..." value={this.getNested(this.props.table.state, this.getPath('value'), this.getValue())} />
            <button onClick={this.onSave} className="ui icon button primary">
                <i className="save icon" />
            </button>
            <button onClick={this.onClose} className="ui icon button">
                <i className="cancel icon" />
            </button>
        </div>)
    }

    /**
     * Render text state
     * @returns {XML}
     */
    renderText() {
        return (<span>{this.getValue()}</span>)
    }

    /**
     * Render hovered text
     * @returns {XML}
     */
    renderActiveText() {
        return (<span><span style={{
            borderBottom: '1px dashed #4183c4',
            color: '#4183c4'
        }}>{this.getValue()}</span><i style={{marginLeft: '3px'}} className="write icon" /></span>)
    }

    /**
     * Render content logic
     * @returns {XML}
     */
    renderContent() {
        let status = this.getNested(this.props.table.props, ['join', this.props.record.id, this.props.column.props.field, this.props.table.props.name || 'default', 'status'], 0);
        if (status === 1) {
            return this.renderInputLoading();
        }
        if (this.isActive()) {
            return this.renderInput();
        }
        return this.state.hovered ? this.renderActiveText() : this.renderText();
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
        return <td style={{cursor: 'pointer'}} onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter} onClick={this.onClick}>{this.renderContent()}</td>
    }
}