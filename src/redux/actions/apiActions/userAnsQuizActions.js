/* eslint-disable no-param-reassign */
import axios from 'axios';
import { END_POINT_USER_ANS_QUIZ } from '../../../shared/utils/endPoints';
import {
  GET_SUCCESS,
  // UNAUTHORIZED,
  INSERT_SUCCESS,
} from '../../../shared/utils/reponseTypes';
import {
  // ADD_NEW_USER_ANS_QUIZ,
  DELETE_USER_ANS_QUIZ,
  // ADD_NEW_ORGANIZATION,
  // UPDATE_ORGANIZATION,
  // DELETE_ORGANIZATION,
} from './ActionTypes';
import { JWT } from '../../../shared/utils/constants';
import { checkJWTExpire, refreshJWTToken } from './AuthActions';
// import { userAnsQuizReducer } from '../../reducers';
// import history from '../../../shared/utils/history';

export const addNewUserAnsQuiz = (data) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  if (data.quizId) {
    data.quizId = data.quizId.value;
  }
  if (data.userId) {
    data.userId = data.userId.value;
  }
  console.log(data);
  axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${JWT}`,
    },
    withCredentials: false,
    mode: 'no-cors',
    data,
    url: END_POINT_USER_ANS_QUIZ,
  })
    .then((response) => {
      if (response.status === INSERT_SUCCESS) {
        console.log(response.data);
        // window.alert(response.data.message);
        // window.location.reload();
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};

export const deleteUserAnsQuiz = userAnsQuizId => (dispatch) => {
  axios({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${JWT}`,
    },
    withCredentials: false,
    mode: 'no-cors',
    url: `${END_POINT_USER_ANS_QUIZ}/${userAnsQuizId}`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: DELETE_USER_ANS_QUIZ,
          payload: response.data,
        });
        window.location.reload();
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};
