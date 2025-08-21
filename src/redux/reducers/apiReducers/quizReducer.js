import {
  GET_QUIZ_LIST,
  GET_QUIZ_DETAIL,
  // ADD_NEW_ORGANIZATION,
  // CHANGE_START_DATE,
  // CHANGE_EXPIRED_DATE,
} from '../../actions/apiActions/ActionTypes';

const INITIAL_STATE = {
  list: null,
  detail: null,
  // startDate: new Date().toISOString(),
  // expiredDate: new Date().toISOString(),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_QUIZ_LIST:
      return { ...state, list: action.payload };
    case GET_QUIZ_DETAIL:
      return { ...state, detail: action.payload };
    // case ADD_NEW_ORGANIZATION:
    //   return { ...state };
    // case CHANGE_START_DATE:
    //   return { ...state, startDate: action.payload };
    // case CHANGE_EXPIRED_DATE:
    //   return { ...state, expiredDate: action.payload };
    default:
      return state;
  }
};
