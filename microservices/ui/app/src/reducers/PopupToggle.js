import { popupToggleConstants } from '../constants';

export function popupToggle(state = {
    EVENTSFORMtogglePopupForm: false,
    EVENTSFORMdata: {},
    TESTFORMtogglePopupForm: false,
    TESTFORMdata: {},
    USERFORMtogglePopupForm: false,
    USERFORMdata: {}
}, action) {
    switch (action.type) {
        case popupToggleConstants.EVENTSFORM:
            return {
                ...state,
                EVENTSFORMtogglePopupForm: !state.EVENTSFORMtogglePopupForm,
                EVENTSFORMdata: action.data
            };
        case popupToggleConstants.TESTFORM:
            return {
                ...state,
                TESTFORMtogglePopupForm: !state.TESTFORMtogglePopupForm,
                TESTFORMdata: action.data
            };
        case popupToggleConstants.USERFORM:
            return {
                ...state,
                USERFORMtogglePopupForm: !state.USERFORMtogglePopupForm,
                USERFORMdata: action.data
            };
        default:
            return state
    }
}