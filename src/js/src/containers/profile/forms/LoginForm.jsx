import React, {Component} from 'react'
import { Link } from 'react-router';
import Form from 'components/form/Form';

const LoginForm = ({onLogin, handler, dataset}) => (
    <Form dataset={dataset} handler={handler} className="ui form">

        <Form.Wrapper tag="div" className="ui teal segment">
            <Form.Row>
                <Form.Input.IconText icon="user" name="user.name" placeholder="Email" />
            </Form.Row>
            <Form.Row>
                <Form.Input.IconText icon="lock" name="user.password" placeholder="Password" />
            </Form.Row>
            <Form.Button onClick={onLogin} color="teal" size="large" fluid="yes">Login</Form.Button>
        </Form.Wrapper>

        <div className="ui error message"/>

        <div className="ui message">
            New to us? <Link to="/" activeStyle={{textDecoration: 'none', color: 'black'}}>
            Sign Up
        </Link>
        </div>

    </Form>);

export default LoginForm;