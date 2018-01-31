import { createResource } from 'redux-rest-resource';
import config from "./../config/config.json";
import { getAuthHeader, getUserID, getProfileData, getLoginProivderData } from "./../services/AuthService";
import graph from "fb-react-sdk";

const { types, actions, rootReducer } = createResource({
    name: 'appusers',
    url: config.Query,
    headers: (getState, { actionId, context, contextOpts }) => getAuthHeader(),
    actions: {
        create: {
            method: 'POST',
        },
        get: {
            method: 'POST'
        },
        fetch: {
            method: 'POST'
        }
    }
});

let fetchAppusers = () => {
    return (dispatch) => {
        let UID = getUserID();
        if (UID) {
            dispatch(actions.fetchAppuserss({
                "type": "select",
                "args": {
                    "table": "profile",
                    "columns": [
                        "*"
                    ]
                }
            }));
        }
    }
}

export const appusers = {
    "appusersReducer": rootReducer,
    "appusersTypes": types,
    "appusersActions": actions,
    fetchAppusers
};
