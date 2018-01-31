import { createResource } from 'redux-rest-resource';
import config from "./../config/config.json";
import { getAuthHeader, getUserID, getProfileData, getLoginProivderData } from "./../services/AuthService";

const { types, actions, rootReducer } = createResource({
    name: 'notifications',
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

let fetchNotifications = () => {
    return (dispatch) => {
        let UID = getUserID();
        if (UID) {
            dispatch(actions.fetchNotificationss({
                "type": "select",
                "args": {
                    "table": "notifications",
                    "columns": [
                        "*"
                    ]
                }
            }));
        }
    }
}

export const notifications = {
    "notificationsReducer": rootReducer,
    "notificationsTypes": types,
    "notificationsActions": actions,
    fetchNotifications
};
