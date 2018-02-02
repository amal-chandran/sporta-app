import { createResource } from 'redux-rest-resource';
import config from "./../config/config.json";
import { getAuthHeader, getUserID, getProfileData } from "./../services/AuthService";
// import { store } from "./../helpers/Store";

const { types, actions, rootReducer } = createResource({
    name: 'events',
    url: config.Query,
    headers: (getState, { actionId, context, contextOpts }) => getAuthHeader(),
    actions: {
        create: { method: 'POST', },
        get: { method: 'POST' },
        update: { method: 'POST' },
        delete: { method: 'POST' },
        fetch: { method: 'POST' },
        participate: { method: 'POST' },
        undoparticipate: { method: 'POST' }
    }
});


let createEvents = (data) => {
    return (dispatch) => {
        let UID = getUserID();
        if (UID) {
            dispatch(actions.createEvents({
                "type": "insert",
                "args": {
                    "table": "events",
                    "objects": [
                        {
                            "name": data.name,
                            "photo": data.photo,
                            "discription": data.discription,
                            "started": "false"
                        }
                    ]
                }
            }));
        }
    }
}

let updateEvents = (data) => {
    return (dispatch) => {
        let UID = getUserID();
        if (UID) {
            dispatch(actions.updateEvents({
                "type": "update",
                "args": {
                    "table": "events",
                    "where": {
                        "eid": {
                            "$eq": data.eid
                        }
                    },
                    "$set": {
                        "name": data.name,
                        "photo": data.photo,
                        "discription": data.discription,
                        "started": data.started
                    }
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
                                "eiduid": '' + eventid + UID,
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

let undoparticipateEvents = (eventid) => {
    return (dispatch) => {
        let UID = getUserID();
        if (UID) {
            dispatch(actions.undoparticipateEvents(
                {
                    "type": "delete",
                    "args": {
                        "table": "participants",
                        "where": {
                            "$and": [
                                {
                                    "uid": {
                                        "$eq": UID
                                    }
                                },
                                {
                                    "eid": {
                                        "$eq": eventid
                                    }
                                }
                            ]
                        }
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

let getEvent = (eid) => {
    return (dispatch) => {
        let UID = getUserID();
        if (UID) {
            // console.log("Selecting");
            dispatch(actions.getEvents({
                "type": "select",
                "args": {
                    "table": "events",
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

let deleteEvent = (eid) => {
    return (dispatch) => {
        let UID = getUserID();
        if (UID) {
            dispatch(actions.deleteEvents({
                "type": "delete",
                "args": {
                    "table": "events",
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


export const events = {
    "eventsReducer": rootReducer,
    "eventsTypes": types,
    "eventsActions": actions,
    createEvents,
    fetchEvents,
    participateEvents,
    getEvent,
    updateEvents,
    deleteEvent,
    undoparticipateEvents
};
