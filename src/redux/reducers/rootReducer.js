import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import userDetailsReducer from './userDetailsReducer';

import { SIGNOUT_SET } from '../constants/loginTypes';

const appReducer = combineReducers({
  loginReducer: loginReducer,
  userDetailsReducer:userDetailsReducer
});

const rootReducer = (state, action) => {
  if(action.type === SIGNOUT_SET){
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;