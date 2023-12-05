import { USER_DETAILS_LIST, IS_NEW_USER_FORM, SELECTED_USER_DETAILS } from '../constants/userDetailsTypes';

const INITIAL_STATE = {
  userDetailsList: [
    {
      id: 0,
      details: [
        { id: 1, title: 'FirstName', value: 'Amar' },
        { id: 2, title: 'Last Name', value: 'Perera' },
        { id: 3, title: 'Date of Birth', value: '1995-02-01' },
        { id: 4, title: 'Age', value: '28' },
        { id: 5, title: 'Language', value: 'Sinhala' },
        { id: 6, title: 'Gender', value: 'Male' },
        { id: 7, title: 'Email', value: 'Amar1995@gmail.com' },
        { id: 8, title: 'Telephone', value: '0710000000' }
      ]
    }
  ],
  selectedUserDetails: null,
  isNewUserForm: false
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_DETAILS_LIST:
      console.log('USER_DETAILS_LIST:-', action.payload);
      return {
        ...state,
        userDetailsList: action.payload
      };
    case SELECTED_USER_DETAILS:
      console.log('SELECTED_USER_DETAILS:-', action.payload);
      return {
        ...state,
        selectedUserDetails: action.payload
      };
    case IS_NEW_USER_FORM:
      console.log('IS_NEW_USER_FORM:-', action.payload);
      return {
        ...state,
        isNewUserForm: action.payload
      };
    default:
      return state;
  }
};

export default loginReducer;