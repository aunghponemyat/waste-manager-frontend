import {
  GET_TRAINING_SLIDE_LIST,
  GET_TRAINING_SLIDE_DETAIL,
} from '../../actions/apiActions/ActionTypes';

const INITIAL_STATE = {
  list: null,
  detail: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TRAINING_SLIDE_DETAIL:
      return { ...state, detail: action.payload };
    case GET_TRAINING_SLIDE_LIST:
      return { ...state, list: action.payload };
    default:
      return state;
  }
};
