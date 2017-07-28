import React, {Component} from 'react'
import Element from './Element';
import { fromJS, Map, List } from 'immutable';

export default class InputImage extends Element {

    render() {
        console.log(this);
        console.log('___________');
        console.log(this.getValue());
        console.log('___________');
        return (
        <div>
            <div className="ui six cards">
                {this.getValue(this.props, []).map((element, index) => {
                    const path = "/img/" + element.get('name');
                    return (<a className="card">
                        <div style={{
                            padding: 10 + 'px',
                            backgroundColor: 'white'
                        }} className="image">
                            <img src={path} />
                        </div>
                    </a>);
                })}
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
        console.log(this);
    }

    handleFile = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onload = (upload) => {
            this.setState({
                data_uri: upload.target.result,
                filename: file.name,
                filetype: file.type
            });
        };

        reader.readAsDataURL(file);
        console.log('on upload');
    }
}
