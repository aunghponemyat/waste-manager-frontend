import {
  GET_USER_LIST,
  GET_USER_DETAIL,
  ADD_NEW_USER,
  GET_DRIVER_LIST,
  GET_OPERATION_TEAM_LIST,
  DELETE_USER,
} from '../../actions/apiActions/ActionTypes';

const INITIAL_STATE = {
  list: null,
  detail: null,
  drivers: null,
  operationTeam: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      return { ...state, list: action.payload };
    case GET_USER_DETAIL:
      return { ...state, detail: action.payload };
    case GET_DRIVER_LIST:
      return { ...state, drivers: action.payload };
    case GET_OPERATION_TEAM_LIST:
      return { ...state, operationTeam: action.payload };
    case ADD_NEW_USER:
      return { ...state };
    case DELETE_USER:
      return { ...state };
    default:
      return state;
  }
};
