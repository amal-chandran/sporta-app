import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

const AuthRoute = ({ component: Component, RedirectPath, Auth, ...rest }) => (
    <Route {...rest} render={props => (
        
            ? <Component {...props} />
            : <Redirect to={{ pathname: RedirectPath, state: { from: props.location } }} />
    )} />
);

const mapStateToProps = (state) => {
    return {
        Auth: state.authentication
    };
};

export default connect(mapStateToProps)(AuthRoute);