import { combineReducers } from 'redux';

import { authentication } from './AuthenticationReducer';
import { registration } from './RegistrationReducer';
import { users } from './UsersReducer';
import { alert } from './AlertReducer';
import { profile } from "./../resources";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  profile: profile.profileReducer
});

export default rootReducer;
