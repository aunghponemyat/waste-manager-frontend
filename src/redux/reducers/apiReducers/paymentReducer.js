import {
  GET_PAYMENT_LIST,
  GET_PAYMENT_DETAIL,
} from '../../actions/apiActions/ActionTypes';

const INITIAL_STATE = {
  list: null,
  detail: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PAYMENT_LIST:
      return { ...state, list: action.payload };
    case GET_PAYMENT_DETAIL:
      return { ...state, detail: action.payload };
    default:
      return state;
  }
};
