import React, {Component} from 'react'
import {Link} from 'react-router';
import Form from 'components/form/Form';

const LoginForm = ({onLogin, handler, provider}) => (
    <Form dataset={provider.get('dataset').toObject()} handler={handler} className="ui form">

        <Form.Wrapper tag="div" className="ui teal segment">
            <Form.Row>
                <Form.Input.IconText icon="user" name="user.email" placeholder="Email"/>
            </Form.Row>
            <Form.Row>
                <Form.Input.IconText icon="lock" name="user.password" placeholder="Password"/>
            </Form.Row>
            <Form.Button loading={provider.get('status') === 1} onClick={onLogin} color="teal" size="large"
                         fluid="yes">Login</Form.Button>
        </Form.Wrapper>

        <Form.Error errorMessage={provider.get('response').get('errorMessage')} />

        <div className="ui message">
            New to us? <Link to="/" activeStyle={{textDecoration: 'none', color: 'black'}}>
            Sign Up
        </Link>
        </div>

    </Form>);

export default LoginForm;