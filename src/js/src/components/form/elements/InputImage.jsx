import React, {Component} from 'react'
import Element from './Element';

export default class InputImage extends Element {
    render() {
        return (
        <div>
            <div className="ui six cards">

                <a className="card">
                    <div style={{
                        padding: 10 + 'px',
                        backgroundColor: 'white'
                    }} className="image">
                        <img src="/img/product1.jpg"/>
                    </div>
                </a>

                <a className="card">
                    <div style={{
                        padding: 10 + 'px',
                        backgroundColor: 'white'
                    }} className="image">
                        <img src="/img/product2.jpg"/>
                    </div>
                </a>

                <a className="card">
                    <div style={{
                        padding: 10 + 'px',
                        backgroundColor: 'white',
                        opacity: '0.1'
                    }} className="image">
                        <img src="/img/addicon.png"/>
                    </div>
                </a>
            </div>
            <form encType="multipart/form-data">
            <input  onChange={this.handleFile} ref="file" type="file" />
            <button onClick={this.onUpload} type="button" className="ui button">Upload</button>
            </form>
        </div>);
    }

    onUpload = () => {
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
