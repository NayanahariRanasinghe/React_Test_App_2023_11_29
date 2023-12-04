import { SIGNIN_SET,SIGNOUT_SET } from '../constants/loginTypes';

const INITIAL_STATE = {
   signinDetails: false ,
   signOutStatus:false
};

const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SIGNIN_SET:
        console.log('SIGNIN_SET:-',action.payload);
        return {
          ...state,
          signinDetails: action.payload
        };
      case SIGNOUT_SET:
        console.log('SIGNOUT_SET:-',action.payload);
        return {
          ...state,
          signOutStatus: action.payload
        };
      default:
        return state;
    }
  };
 
export default loginReducer;