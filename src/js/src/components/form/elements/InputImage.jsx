import React, {Component} from 'react'
import Element from './Element';
import Loader from 'components/loader/Loader';
import { fromJS, Map, List } from 'immutable';

export default class InputImage extends Element {

    render() {

        let placeholderStyles = {}
        if (this.props.form.props.provider.get('status') != '1') {
            placeholderStyles.display = 'none';
        }

        return (
        <div>
            <div className="ui six cards">
                {this.getValue(this.props, []).map((element, index) => {
                    const path = "/img/upload/" + element.get('name');
                    return (<a className="card">
                        <div style={{
                            padding: 10 + 'px',
                            backgroundColor: 'white'
                        }} className="image">
                            <img src={path} />
                        </div>
                    </a>);
                })}

                <a style={placeholderStyles} className="card">
                    <div style={{
                        padding: 10 + 'px',
                        backgroundColor: 'white'
                    }} className="image">
                        <img src='/img/placeholder.png' />
                        <Loader visible={this.props.form.props.provider.get('status') == '1'}/>
                    </div>
                </a>
            </div>

            <input  onChange={this.handleFile} ref="file" type="file" />
            <button onClick={this.onUpload} type="button" className="ui button">Upload</button>

        </div>);
    }

    onUpload = () => {
        let value = this.getValue();
        value = value.push(new Map({
            id: 123,
            name: 'product1.jpg'
        }))
        this.props.form.props.handler(this.getFieldName(), value);
    }

    handleFile = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onload = (upload) => {
            this.props.form.props.upload({
                data_uri: upload.target.result,
                filename: file.name,
                filetype: file.type,
                id: this.props.form.props.provider.getIn(['dataset', 'id'])
            });

            this.setState({
                data_uri: upload.target.result,
                filename: file.name,
                filetype: file.type,
                id: this.props.form.props.provider.getIn(['dataset', 'id'])
            });
        };

        reader.readAsDataURL(file);
    }
}
