import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { events } from "./../resources";

const loggerMiddleware = createLogger();

// function jsUcfirst(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }

const customMiddleWare = store => next => action => {

    next(action);
    if (action.type == "@@resource/EVENTS/PARTICIPATE" && action.status == "resolved") {
        store.dispatch(events.fetchEvents());
    }

    // let Expression = /^@@resource\/(\w+)\/(\w+)/;
    // if (Expression.test(action.type) && action.status == "resolved") {
    //     let Matchs = Expression.exec(action.type);
    //     Matchs[1] = String(Matchs[1]).toLowerCase();//Name



    // Matchs[2] = Matchs[2].toLowerCase();//Function
    // if (Matchs[2] !== "fetch" && isFunction(Resources[Matchs[1]]["fetch" + jsUcfirst(Matchs[1]) + "s"])) {
    //     store.dispatch(isFunction(Resources[Matchs[1]]["fetch" + jsUcfirst(Matchs[1]) + "s"]));
    // }
};

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        customMiddleWare
    ))
);

