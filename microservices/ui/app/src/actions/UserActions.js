import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

import config from "./../config/config.json";
import "whatwg-fetch";
import { profile } from "./../resources";

export const userActions = {
    login,
    logout,
    register, loginFacebook, loginGoogle,
    failureLogin, requestLogin
};

function requestLogin() { return { type: userConstants.LOGIN_REQUEST } }

function successLogin(user) {
    return { type: userConstants.LOGIN_SUCCESS, user }
}

function failureLogin(error) {
    return (dispatch) => {
        dispatch(alertActions.error("Authentication failed"));
        dispatch(failureLoginSync());
    }
}
function failureLoginSync(error) {
    return { type: userConstants.LOGIN_FAILURE, error }
}

function login(username, password) {
    return dispatch => {
        userService.login(username, password)
            .then(
            user => {
                dispatch(successLogin(user));
            },
            error => {
                dispatch(failureLogin(error));
            });
    };

}

function loginFacebook(data) {
    return (dispatch) => {
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
                "access_token": data._token.accessToken
            }
        };

        requestOptions.body = JSON.stringify(body);

        fetch(url, requestOptions)
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                localStorage.setItem('userAuth', JSON.stringify(data));
                localStorage.setItem('user', JSON.stringify(result));
                dispatch(successLogin(result));

                if (result.extra_info.new_user) {
                    dispatch(profile.createProfile("loginFacebook"));
                }
                dispatch(profile.getProfile());

                history.push(config.Redirect.Login);
            })
            .catch(function (error) {
                dispatch(failureLogin(error));
            });
    };
}

function loginGoogle(data) {
    return (dispatch) => {

        var url = "https://auth." + config.Cluster + ".hasura-app.io/v1/signup";

        var requestOptions = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            }
        };

        var body = {
            "provider": "google",
            "data": {
                "access_token": data._token.accessToken
            }
        };

        requestOptions.body = JSON.stringify(body);

        fetch(url, requestOptions)
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                localStorage.setItem('userAuth', JSON.stringify(data));
                localStorage.setItem('user', JSON.stringify(result));
                dispatch(successLogin(result));

                if (result.extra_info.new_user) {
                    dispatch(profile.createProfile("loginGoogle"));
                }
                dispatch(profile.getProfile());

                history.push(config.Redirect.Login);
            })
            .catch(function (error) {
                dispatch(failureLogin(error));
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