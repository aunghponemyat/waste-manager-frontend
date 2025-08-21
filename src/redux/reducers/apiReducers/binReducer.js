import {
  GET_BINS_LIST,
  GET_BIN_DETAIL,
} from '../../actions/apiActions/ActionTypes';

const INITIAL_STATE = {
  list: null,
  detail: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BINS_LIST:
      return { ...state, list: action.payload };
    case GET_BIN_DETAIL:
      return { ...state, detail: action.payload };
    default:
      return state;
  }
};
