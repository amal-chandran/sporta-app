import { createResource } from 'redux-rest-resource';
import config from "./../config/config.json";
import { getAuthHeader, getUserID, getProfileData, getLoginProivderData } from "./../services/AuthService";
import graph from "fb-react-sdk";
import isObject from "lodash/isObject";

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
        },
        update: {
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
                    ProfileData.profilepic = res.picture.data.url;
                    createData(dispatch, ProfileData);
                });
            } else {
                if (isObject(fromData)) {
                    ProfileData.name = fromData.name;
                    ProfileData.email = fromData.email;
                }
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
                    "photo": ProfileData.profilepic,
                    "name": ProfileData.name,
                    "other": ProfileData.res,
                    "email": ProfileData.email,
                    "collegeid": "0",
                    "phone": ""
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

let updateProfile = (ProfileData) => {
    return (dispatch) => {
        let UID = getUserID();
        if (UID) {
            dispatch(actions.updateProfile(
                {
                    "type": "update",
                    "args": {
                        "table": "profile",
                        "where": {
                            "uid": {
                                "$eq": UID
                            }
                        },
                        "$set": {
                            "name": ProfileData.name,
                            "collegeid": ProfileData.collegeid,
                            "email": ProfileData.email,
                            "phone": ProfileData.phone
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
    "getProfile": getProfile,
    updateProfile
};
