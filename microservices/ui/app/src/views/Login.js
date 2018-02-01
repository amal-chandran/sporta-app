import React, { Component } from "react";
import {
    Row, Col, CardGroup, Card, CardBody, CardFooter,
    InputGroup, Input, Button, Container
} from "reactstrap";

import { NavLink as RsNavLink, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { userActions, alertActions } from "./../actions";
import { history } from './../helpers';
import { FacebookLoginButton, GoogleLoginButton } from "./../components/SocialLoginButton";
import Loadable from "react-loading-overlay";

class Login extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    handleError = () => {
        this.props.dispatch(userActions.failureLogin());
    }

    handleLogin = () => {
        this.props.dispatch(userActions.requestLogin());
    }

    componentWillMount() {
        this.props.dispatch(userActions.checkLogin());
    }

    render() {
        let { props } = this;
        return (
            <div className="app flex-row align-items-center animated fadeIn">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="4">
                            <Loadable
                                active={props.loggingIn}
                                spinner
                                text='Processing ...'
                            >
                                <Card>
                                    <CardBody>
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In / Sign Up to your account</p>
                                        {/* <form onSubmit={this.handleSubmit}>
                                            <InputGroup className="mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">@</span>
                                                </div>
                                                <Input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="icon-lock"></i>
                                                    </span>
                                                </div>
                                                <Input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4">Login</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0">Forgot password?</Button>
                                                </Col>
                                            </Row>
                                            <InputGroup className="mb-4">
                                            </InputGroup>
                                        </form> */}

                                        {/* <Button color="success" onClick={() => { this.props.history.push("/public/register"); }} block>Register</Button> */}
                                        <Row>
                                            <Col xs="12" sm="12">
                                                <div style={{ paddingBottom: "12px" }} onClick={this.handleLogin}>
                                                    <FacebookLoginButton handleResponse={(data) => {
                                                        this.props.dispatch(userActions.loginFacebook(data));
                                                    }} handleError={this.handleError} />
                                                </div>
                                            </Col>
                                            <Col xs="12" sm="12">
                                                <div onClick={this.handleLogin}>
                                                    <GoogleLoginButton
                                                        handleResponse={(data) => {
                                                            this.props.dispatch(userActions.loginGoogle(data));
                                                        }}
                                                        handleError={this.handleError} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                    <CardFooter className="p-4">

                                    </CardFooter>
                                </Card>
                            </Loadable>
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}


export default withRouter(connect(mapStateToProps)(Login)); 