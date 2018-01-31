import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { history } from './../helpers';
import { userActions } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="app flex-row align-items-center  animated fadeIn">
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} md="5" sm="5">
                            <Card>
                                <CardBody className="p-4">
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <h1>Register</h1>
                                        <p className="text-muted">Create your account</p>

                                        <InputGroup className="mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="icon-user"></i>
                                                </span>
                                            </div>
                                            <Input type="text" placeholder="First Name" name="firstName" value={user.firstName} onChange={this.handleChange} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="icon-user"></i>
                                                </span>
                                            </div>
                                            <Input type="text" placeholder="Last Name" name="lastName" value={user.lastName} onChange={this.handleChange} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">@</span>
                                            </div>
                                            <Input type="text" placeholder="Username" name="username" value={user.username} onChange={this.handleChange} />
                                        </InputGroup>

                                        <InputGroup className="mb-4">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="icon-lock"></i>
                                                </span>
                                            </div>
                                            <Input type="password" placeholder="Password" name="password" value={user.password} onChange={this.handleChange} />
                                        </InputGroup>
                                        <Row>
                                            <Col xs="6">
                                                <Button color="success" block>Create Account</Button>
                                            </Col>
                                            <Col xs="6" className="text-right">
                                                <Button color="link" className="px-0 float-right">Forgot password?</Button>
                                            </Col>
                                        </Row>
                                        <InputGroup className="mb-4">
                                        </InputGroup>
                                    </form>

                                    <Button color="primary" onClick={() => { this.props.history.push("/public/login"); }} block>Login</Button>

                                </CardBody>
                                <CardFooter className="p-4">
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <Button className="btn-facebook" block><span>facebook</span></Button>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Button className="btn-twitter" block><span>twitter</span></Button>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

// const connectedRegisterPage = connect(mapStateToProps)(Register);
export default (withRouter(connect(mapStateToProps)(Register)));
