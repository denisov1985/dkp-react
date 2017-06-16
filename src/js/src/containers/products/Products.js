import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Layout from '../Layout';
import Container from '../common/Container';

class Products extends Container {

    test() {
        console.log('test');
    }
    render() {
        console.log(this);
        return (<h1>123123</h1>)
    }

}

export default Products.connect(Products);