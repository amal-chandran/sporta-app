import { createResource } from 'redux-rest-resource';
import config from "./../config/config.json";
import { getAuthHeader, getUserID, getProfileData, getLoginProivderData } from "./../services/AuthService";
import graph from "fb-react-sdk";

const { types, actions, rootReducer } = createResource({
    name: 'profile',
    url: config.Query,
    headers: (getState, { actionId, context, contextOpts }) => getAuthHeader(),
    actions: {
        create: {
            method: 'POST',
        },
        get: {
            method: 'POST'
        }
    }
});


let createProfile = (fromData) => {
    return (dispatch) => {
        let UID = getUserID();
        let ProfileData = getProfileData();
        if (UID && ProfileData) {
            ProfileData.UID = UID;
            ProfileData.res = {};
            if (fromData === "loginFacebook") {
                graph.setAccessToken(getLoginProivderData()._token.accessToken);
                graph.get("me?fields=id,name,picture.type(large),cover,email,gender", function (err, res) {
                    ProfileData.res = res;
                    createData(dispatch, ProfileData);
                });
            } else {
                createData(dispatch, ProfileData);
            }
        }
    }
}

function createData(dispatch, ProfileData) {
    dispatch(actions.createProfile({
        "type": "insert",
        "args": {
            "table": "profile",
            "objects": [
                {
                    "uid": ProfileData.UID,
                    "verified": "false",
                    "photo": ProfileData.profilepic,
                    "name": ProfileData.name,
                    "other": ProfileData.res
                }
            ],
            "returning": [
                "pid"
            ]
        }
    }));
}

let getProfile = () => {
    return (dispatch) => {
        let UID = getUserID();
        if (UID) {
            dispatch(actions.getProfile({
                "type": "select",
                "args": {
                    "table": "profile",
                    "columns": [
                        "*"
                    ],
                    "where": {
                        "uid": {
                            "$eq": UID
                        }
                    }
                }
            }));
        }
    }
}

export const profile = {
    "profileReducer": rootReducer,
    "profileTypes": types,
    "profileActions": actions,
    "createProfile": createProfile,
    "getProfile": getProfile
};
