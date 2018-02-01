import React from "react";
import { store } from "./../helpers/Store";
import { FacebookLoginButton, GoogleLoginButton } from "./../components/SocialLoginButton";
import { userActions, alertActions } from "./../actions";
import {
    Row, Col, CardFooter
} from "reactstrap";

export default class SocialFooter extends React.Component {

    handleError = () => {
        store.dispatch(userActions.failureLogin());
    }

    handleLogin = () => {
        store.dispatch(userActions.requestLogin());
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs="12" sm="12">
                        <div style={{ paddingBottom: "12px" }} onClick={this.handleLogin}>
                            <FacebookLoginButton handleResponse={(data) => {
                                store.dispatch(userActions.loginFacebook(data));
                            }} handleError={this.handleError} />
                        </div>
                    </Col>
                    <Col xs="12" sm="12">
                        <div onClick={this.handleLogin}>
                            <GoogleLoginButton
                                handleResponse={(data) => {
                                    store.dispatch(userActions.loginGoogle(data));
                                }}
                                handleError={this.handleError} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

}