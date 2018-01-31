import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

import config from "./../config/config.json";
import "whatwg-fetch";


export const userActions = {
    login,
    logout,
    register, loginFacebook
};

function requestLogin() { return { type: userConstants.LOGIN_REQUEST } }
function successLogin(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
function failureLogin(error) { return { type: userConstants.LOGIN_FAILURE, error } }

function login(username, password) {
    return dispatch => {
        dispatch(requestLogin());

        userService.login(username, password)
            .then(
            user => {
                dispatch(successLogin(user));
                history.push(config.Redirect.Login);
            },
            error => {
                dispatch(failureLogin(error));
                dispatch(alertActions.error(error));
            }
            );
    };

}

function loginFacebook({ _token }) {
    return (dispatch) => {
        dispatch(requestLogin());

        var url = "https://auth." + config.Cluster + ".hasura-app.io/v1/signup";

        var requestOptions = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            }
        };

        var body = {
            "provider": "facebook",
            "data": {
                "access_token": _token.accessToken
            }
        };

        requestOptions.body = JSON.stringify(body);

        fetch(url, requestOptions)
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                // localStorage.setItem('user', JSON.stringify(user));

                console.log(result);

            })
            .catch(function (error) {
                console.log('Request Failed:' + error);
            });
    };
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
            user => {
                dispatch(success());
                history.push("/");
                dispatch(alertActions.success('Registration successful'));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}