/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
  GET_LOGISTICS_SCHEDULE_LIST,
  ADD_NEW_ORGANIZATION,
  CHANGE_PICKUP_TIME,
  GET_LOGISTICS_SCHEDULE_DETAIL,
  UPDATE_LOGISTICS,
  GET_TODAY_LOGISTICS_SCHEDULE,
  GET_WAY_DETAIL,
} from '../../actions/apiActions/ActionTypes';

const INITIAL_STATE = {
  list: null,
  pickUpTime: new Date().toISOString(),
  addedLogistics: null,
  detail: null,
  today: null,
  wayDetail: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LOGISTICS_SCHEDULE_LIST:
      return { ...state, list: action.payload };
    case GET_TODAY_LOGISTICS_SCHEDULE:
      return { ...state, today: action.payload };
    case ADD_NEW_ORGANIZATION:
      return { ...state, addedLogistics: action.payload };
    case CHANGE_PICKUP_TIME:
      return { ...state, pickUpTime: action.payload };
    case GET_LOGISTICS_SCHEDULE_DETAIL:
      return { ...state, detail: action.payload };
    case GET_WAY_DETAIL:
      state.wayDetail[action.payload._id] = action.payload;
      return { ...state };
    case UPDATE_LOGISTICS:
      return { ...state };
    default:
      return state;
  }
};
