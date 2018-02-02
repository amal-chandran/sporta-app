import { createResource } from 'redux-rest-resource';
import config from "./../config/config.json";
import { getAuthHeader, getUserID, getProfileData, getLoginProivderData } from "./../services/AuthService";

const { types, actions, rootReducer } = createResource({
    name: 'eventusers',
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

let getEventusers = (eid) => {
    return (dispatch) => {
        let UID = getUserID();
        if (UID) {
            dispatch(actions.fetchEventuserss({
                "type": "select",
                "args": {
                    "table": "eventusers",
                    "columns": [
                        "*"
                    ],
                    "where": {
                        "eid": {
                            "$eq": eid
                        }
                    }
                }
            }));
        }
    }
}

export const eventusers = {
    "eventusersReducer": rootReducer,
    "eventusersTypes": types,
    "eventusersActions": actions,
    getEventusers
};
