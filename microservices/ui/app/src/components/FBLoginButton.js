import React, { Component } from "react";
import FacebookProvider, { Login as FBLogin } from 'react-facebook';
import { Button } from "reactstrap";

import config from "./../config/config.json";

export default class FBLoginButton extends Component {

    handleResponse = (data) => {
        console.log(data);
    }

    handleError = (error) => {
        this.setState({ error });
    }

    render() {
        return (
            <FacebookProvider appId={config.FBAppID}>
                <FBLogin
                    scope="email"
                    onResponse={this.handleResponse}
                    onError={this.handleError}
                    render={({ isLoading, isWorking, onClick }) => (
                        <Button onClick={onClick} className="btn-facebook" block><span>facebook</span>
                            {(isLoading || isWorking) && (<span>Loading...</span>)}
                        </Button>
                    )}
                />
            </FacebookProvider>
        );
    }
}