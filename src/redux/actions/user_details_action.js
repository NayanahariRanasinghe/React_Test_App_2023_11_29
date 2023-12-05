import { USER_DETAILS_LIST,IS_NEW_USER_FORM,SELECTED_USER_DETAILS} from '../constants/userDetailsTypes';

export const userDetailsListAction = (payload) => {
    return {
      type: USER_DETAILS_LIST,
      payload
    }
};

export const setSelectedUserAction = (payload) => {
  return {
    type: SELECTED_USER_DETAILS,
    payload
  }
};

export const setIsNewUserFormAction = (payload) => {
  return {
    type: IS_NEW_USER_FORM,
    payload
  }
};