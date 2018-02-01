import { userConstants } from '../constants';
import { userService, getAuthHeader } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

import config from "./../config/config.json";
import "whatwg-fetch";
import { profile } from "./../resources";
import { fetch } from 'redux-rest-resource';
import cookies from "browser-cookies";

export const userActions = {
    login,
    logout,
    register, loginFacebook, loginGoogle,
    failureLogin, requestLogin, checkLogin
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
                LoginSuccesCommit(data, result, 'loginFacebook', dispatch);
            })
            .catch(function (error) {
                dispatch(failureLogin(error));
            });
    };
}

function LoginSuccesCommit(data, result, loginAuth, dispatch) {
    localStorage.setItem('userAuth', JSON.stringify(data));
    localStorage.setItem('user', JSON.stringify(result));
    dispatch(successLogin(result));

    console.log("Logined");
    if (result.extra_info.new_user) {
        dispatch(profile.createProfile(loginAuth));
        history.push(config.Redirect.newLogin);
    }
    dispatch(profile.getProfile());
    history.push(config.Redirect.Login);
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
                LoginSuccesCommit(data, result, 'loginGoogle', dispatch);
            })
            .catch(function (error) {
                dispatch(failureLogin(error));
            });
    };
}


function checkLogin() {
    return (dispatch) => {
        var url = "https://auth." + config.Cluster + ".hasura-app.io/v1/user/info";
        //  "https://auth." + config.Cluster + ".hasura-app.io/v1/user/info";

        var requestOptions = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + cookies.get(config.Cluster)
            },
            credentials: 'include'
        };
        console.log(cookies.get(config.Cluster));
        // var body = {};

        // requestOptions.body = JSON.stringify(body);

        fetch(url, requestOptions).then(function (response) {
            return response.json();
        }).then(function (result) {
            LoginSuccesCommit({}, result, '', dispatch);
        }).catch(function (error) {
            // dispatch(failureLogin(error));
        });
    };
}

function logout() {
    userService.logout();
    if (localStorage.getItem('user')) {
        return (dispatch) => {
            var url = "https://auth." + config.Cluster + ".hasura-app.io/v1/user/logout";

            var requestOptions = {
                "method": "POST",
                "headers": getAuthHeader()
            };

            var body = {};

            requestOptions.body = JSON.stringify(body);

            fetch(url, requestOptions).then(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('userAuth');
                dispatch({ type: userConstants.LOGOUT });
            });
        }
    } else {
        return { type: userConstants.LOGOUT };
    }
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