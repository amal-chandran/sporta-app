import { combineReducers } from 'redux';

import { authentication } from './AuthenticationReducer';
import { registration } from './RegistrationReducer';
import { users } from './UsersReducer';
import { alert } from './AlertReducer';
import { profile, events, appusers, notifications } from "./../resources";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  profile: profile.profileReducer,
  events: events.eventsReducer,
  appusers: appusers.appusersReducer,
  notifications: notifications.notificationsReducer
});

export default rootReducer;
