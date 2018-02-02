import intersection from "lodash/intersection";
import isEmpty from "lodash/isEmpty";
import { store } from "./Store";

export const isAuthentic = (State) => {
    try {
        let Roles = store.getState().authentication.user['hasura_roles'];
        return !isEmpty(intersection(State, Roles));
    } catch (error) {
        return false;
    }
};

export const isVerified = () => {
    try {
        if (store.getState().profile.item[0].verified) {
            return true;
        } else {
            return false;
        }
    } catch (error) {

    }
}