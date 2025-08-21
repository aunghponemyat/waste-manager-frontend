import {
  GET_TRAINING_LIST, GET_TRAINING_DETAIL, CHANGE_TRAINING_DATE, UPDATE_TRAINING,
} from '../../actions/apiActions/ActionTypes';

const INITIAL_STATE = {
  list: null,
  detail: null,
  trainingDate: new Date().toISOString(),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TRAINING_LIST:
      return { ...state, list: action.payload };
    case GET_TRAINING_DETAIL:
      return { ...state, detail: action.payload };
    case CHANGE_TRAINING_DATE:
      return { ...state, trainingDate: action.payload };
    case UPDATE_TRAINING:
      return { ...state };
    default:
      return state;
  }
};
