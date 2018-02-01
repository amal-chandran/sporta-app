import { popupToggleConstants } from '../constants';


function eventFormToggle(data) {
    return { type: popupToggleConstants.EVENTSFORM, data };
}

function testFormToggle(data) {
    return { type: popupToggleConstants.TESTFORM, data };
}

export const popupToggleActions = {
    eventFormToggle,
    testFormToggle
};