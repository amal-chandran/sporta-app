import { createResource } from 'redux-rest-resource';
import config from "./../config/config.json";
import { getAuthHeader, getUserID, getProfileData } from "./../services/AuthService";


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


let createProfile = () => {
    return (dispatch) => {
        let UID = getUserID();
        let ProfileData = getProfileData();
        if (UID && ProfileData) {
            dispatch(actions.createProfile({
                "type": "insert",
                "args": {
                    "table": "profile",
                    "objects": [
                        {
                            "uid": UID,
                            "verified": "false",
                            "photo": ProfileData.profilepic,
                            "name": ProfileData.name
                        }
                    ],
                    "returning": [
                        "pid"
                    ]
                }
            }));
        }
    }
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
