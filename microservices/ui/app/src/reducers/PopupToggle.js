import { popupToggleConstants } from '../constants';

export function popupToggle(state = {
    EVENTSFORMtogglePopupForm: false,
    EVENTSFORMdata: {},
    TESTFORMtogglePopupForm: false,
    TESTFORMdata: {}
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
        default:
            return state
    }
}