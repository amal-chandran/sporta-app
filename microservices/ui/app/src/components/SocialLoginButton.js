import React, { Component } from "react";
import { Button } from "reactstrap";
import SocialLogin from 'react-social-login'

import config from "./../config/config.json";


const GoogleLogin = SocialLogin(({ children, triggerLogin, ...props }) => (
    <Button onClick={triggerLogin} className="btn-google-plus" block {...props} >
        {children}
    </Button>
));

const FacebootLogin = SocialLogin(({ children, triggerLogin, ...props }) => (
    <Button onClick={triggerLogin} className="btn-facebook" block {...props} >
        {children}
    </Button>
));


export const FacebookLoginButton = (props) => (
    <FacebootLogin
        provider='facebook'
        appId={config.FacebookAppID}
        onLoginSuccess={props.handleResponse}
        onLoginFailure={props.handleError}
    > <span>Facebook</span></FacebootLogin >
);

export const GoogleLoginButton = (props) => (
    <GoogleLogin
        provider='google'
        appId={config.GoogleAppID}
        onLoginSuccess={props.handleResponse}
        onLoginFailure={props.handleError}
    ><span>Google</span></GoogleLogin>
);