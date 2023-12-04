import { USER_DETAILS_LIST} from '../constants/userDetailsTypes';

export const userDetailsListAction = (payload) => {
    return {
      type: USER_DETAILS_LIST,
      payload
    }
};