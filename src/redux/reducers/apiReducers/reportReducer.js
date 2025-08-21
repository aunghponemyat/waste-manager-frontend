import { REPORT_LIST, SET_REPORT_DATA, GET_REPORT_DETAIL } from '../../actions/apiActions/ActionTypes';

const INITIAL_STATE = {
  list: {},
  data: null,
  detail: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_REPORT_DATA:
      return { ...state, data: action.payload };
    case GET_REPORT_DETAIL:
      return { ...state, detail: action.payload };
    case REPORT_LIST:
      return { ...state, list: action.payload };
    default:
      return state;
  }
};
