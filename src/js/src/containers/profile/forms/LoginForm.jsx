import React, {Component} from 'react'
import {Link} from 'react-router';
import Form from 'components/form/Form';

const LoginForm = ({onLogin, handler, provider}) => (
    <Form provider={provider.get('dataset')} handler={handler} className="ui form">

        <Form.Wrapper tag="div" className="ui teal segment">
            <Form.Row>
                <Form.Input.IconText icon="user" name="email" placeholder="Email"/>
            </Form.Row>
            <Form.Row>
                <Form.Input.IconText icon="lock" name="password" placeholder="Password"/>
            </Form.Row>
            <Form.Button loading={provider.get('status') === 1} onClick={onLogin} color="teal" size="large"
                         fluid="yes">Login</Form.Button>
        </Form.Wrapper>

        <Form.Error errorMessage={provider.getIn(['response', 'error', 'message'])} />

        <div className="ui message">
            New to us? <Link to="/" activeStyle={{textDecoration: 'none', color: 'black'}}>
            Sign Up
        </Link>
        </div>

    </Form>);

export default LoginForm;