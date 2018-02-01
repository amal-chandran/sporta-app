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
        },
        setactive: {
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

let setactiveAppusers = (pid) => {
    console.log(pid);
    return (dispatch) => {
        let UID = getUserID();
        if (UID) {
            dispatch(actions.setactiveAppusers({
                "type": "update",
                "args": {
                    "table": "profile",
                    "where": {
                        "pid": {
                            "$eq": pid
                        }
                    },
                    "$set": {
                        "verified": "true"
                    }
                }
            }));
        }
    }
}

export const appusers = {
    "appusersReducer": rootReducer,
    "appusersTypes": types,
    "appusersActions": actions,
    fetchAppusers,
    setactiveAppusers
};
