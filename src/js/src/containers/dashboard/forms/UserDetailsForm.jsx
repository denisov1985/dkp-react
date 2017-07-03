import React, {Component} from 'react'
import {Link} from 'react-router';
import Form from 'components/form/Form';

const UserDetailsForm = ({onLogin, handler, provider}) => (
    <Form dataset={provider.get('dataset').toObject()} handler={handler} className="ui form">
        <Form.Row>
            <Form.Input.IconText icon="user" name="user.email" placeholder="Email"/>
        </Form.Row>
        <Form.Row>
            <Form.Input.IconText icon="lock" name="user.name" placeholder="Password"/>
        </Form.Row>
    </Form>);

export default LoginForm;