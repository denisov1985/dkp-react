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
        this.state = {
            active: false,
            editable: false,
            value: this.getFieldValue(nextProps)
        }
    }

    onMouseEnter = () => {
        this.setState({
            active: true
        });
    }

    onMouseLeave = () => {
        this.setState({
            active: false
        });
    }

    onClick = (e) => {
        let rows = this.props.table.state.rows.editable || [];
        rows[this.props.record.id] || (rows[this.props.record.id] = {});
        rows[this.props.record.id][this.props.column.props.field] || (rows[this.props.record.id][this.props.column.props.field] = {});
        rows[this.props.record.id][this.props.column.props.field].editable = true;
        this.props.table.setState({
            rows: {
                ...this.props.table.state.rows,
                editable: rows
            }
        })

        this.setState({
            editable: true
        })
    }

    isEditable() {
        let rows = this.props.table.state.rows.editable || [];
        rows[this.props.record.id] || (rows[this.props.record.id] = {});
        rows[this.props.record.id][this.props.column.props.field] || (rows[this.props.record.id][this.props.column.props.field] = {});
        return rows[this.props.record.id][this.props.column.props.field].editable === true;
    }

    onClose = (e) => {
        console.log(this);
        e.stopPropagation();
        let state = {...this.props.table.state};
        state.rows.editable[this.props.record.id][this.props.column.props.field].editable = false;
        this.props.table.setState(state)
    }

    onSave = (e) => {
        let record = {...this.props.record};
        record[this.props.column.props.field] = this.state.value
        this.props.onSave(record);
        e.stopPropagation();
        this.setState({
            editable: false
        })
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    renderInput() {
        return (<div className="ui action input fluid">
            <input onChange={this.onChange} type="text" placeholder="Search..." value={this.state.value} />
            <button onClick={this.onSave} className="ui icon button primary">
                <i className="save icon"></i>
            </button>
            <button onClick={this.onClose} className="ui icon button">
                <i className="cancel icon"></i>
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

    render() {
        let content = null;
        if (this.isEditable()) {
            content = this.renderInput();
        }   else  {
            content = this.state.active ? this.renderActiveText() : this.renderText();
        }
        return <td style={{cursor: 'pointer'}} onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter} onClick={this.onClick}>{content}</td>
    }
}