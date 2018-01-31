import { createResource } from 'redux-rest-resource';
import config from "./../config/config.json";
import { getAuthHeader, getUserID, getProfileData } from "./../services/AuthService";

const { types, actions, rootReducer } = createResource({
    name: 'events',
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
        participate: { method: 'POST' }
    }
});


let createEvents = () => {
    return (dispatch) => {
        let UID = getUserID();
        if (UID) {
            dispatch(actions.createEvents({
                "type": "select",
                "args": {
                    "table": "events",
                    "columns": [
                        "*"
                    ]
                }
            }));
        }
    }
}

let participateEvents = (eventid) => {
    return (dispatch) => {
        let UID = getUserID();
        if (UID) {
            dispatch(actions.participateEvents(
                {
                    "type": "insert",
                    "args": {
                        "table": "participants",
                        "objects": [
                            {
                                "uid": UID,
                                "eid": eventid,
                                "confirmed": "0"
                            }
                        ],
                        "returning": [
                            "eid"
                        ]
                    }
                }
            ));
            // dispatch(fetchEvents());
        }
    }
}

let fetchEvents = () => {
    return (dispatch) => {
        let UID = getUserID();
        if (UID) {
            dispatch(actions.fetchEventss({
                "type": "select",
                "args": {
                    "table": "event_participants",
                    "columns": [
                        "*"
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

export const events = {
    "eventsReducer": rootReducer,
    "eventsTypes": types,
    "eventsActions": actions,
    createEvents,
    fetchEvents,
    participateEvents
};
