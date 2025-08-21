import {
  GET_BIN_ORDER_LIST,
  GET_BIN_ORDER_DETAIL,
} from '../../actions/apiActions/ActionTypes';

const INITIAL_STATE = {
  list: null,
  detail: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BIN_ORDER_LIST:
      return { ...state, list: action.payload };
    case GET_BIN_ORDER_DETAIL:
      return { ...state, detail: action.payload };
    default:
      return state;
  }
};
