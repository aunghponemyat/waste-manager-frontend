/* eslint-disable no-param-reassign */
import axios from 'axios';
import { END_POINT_TRAINING_SLIDES } from '../../../shared/utils/endPoints';
import {
  GET_SUCCESS,
  UNAUTHORIZED,
  // INSERT_SUCCESS,
} from '../../../shared/utils/reponseTypes';
import {
  GET_TRAINING_SLIDE_LIST,
  GET_TRAINING_SLIDE_DETAIL,
  // ADD_NEW_ORGANIZATION,
  // UPDATE_ORGANIZATION,
  // DELETE_ORGANIZATION,
} from './ActionTypes';
import { JWT } from '../../../shared/utils/constants';
import { checkJWTExpire, refreshJWTToken, logOut } from './AuthActions';
// import history from '../../../shared/utils/history';

export const getTrainingSlideList = () => (dispatch) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${JWT}`,
    },
    withCredentials: false,
    mode: 'no-cors',
    url: END_POINT_TRAINING_SLIDES,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_TRAINING_SLIDE_LIST,
          payload: response.data.data,
        });
      } else if (response.status === UNAUTHORIZED) {
        dispatch(logOut());
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      if (error.message && error.message === 'Request failed with status code 401') {
        dispatch(logOut());
      } else {
        window.alert(error);
      }
    });
};

export const getTrainingSlideDetail = trainingSlideId => (dispatch) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${JWT}`,
    },
    withCredentials: false,
    mode: 'no-cors',
    url: `${END_POINT_TRAINING_SLIDES}/${trainingSlideId}`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_TRAINING_SLIDE_DETAIL,
          payload: response.data.data,
        });
      } else if (response.status === UNAUTHORIZED) {
        dispatch(logOut());
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      if (error.message && error.message === 'Request failed with status code 401') {
        dispatch(logOut());
      } else {
        window.alert(error);
      }
    });
};
