import {
  ADD_NEW_USER_ANS_QUIZ,
} from '../../actions/apiActions/ActionTypes';

const INITIAL_STATE = {
  list: null,
  detail: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_USER_ANS_QUIZ:
      return { ...state };
    default:
      return state;
  }
};
