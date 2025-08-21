import {
  GET_ORGANIZATION_LIST,
  GET_ORGANIZATION_DETAIL,
  ADD_NEW_ORGANIZATION,
  CHANGE_START_DATE,
  CHANGE_EXPIRED_DATE,
  CHANGE_LOCATION,
} from '../../actions/apiActions/ActionTypes';

const INITIAL_STATE = {
  list: null,
  detail: null,
  startDate: new Date().toISOString(),
  expiredDate: new Date().toISOString(),
  location: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ORGANIZATION_LIST:
      return { ...state, list: action.payload };
    case GET_ORGANIZATION_DETAIL:
      return { ...state, detail: action.payload };
    case ADD_NEW_ORGANIZATION:
      return { ...state };
    case CHANGE_START_DATE:
      return { ...state, startDate: action.payload };
    case CHANGE_EXPIRED_DATE:
      return { ...state, expiredDate: action.payload };
    case CHANGE_LOCATION:
      return { ...state, location: action.payload };
    default:
      return state;
  }
};
