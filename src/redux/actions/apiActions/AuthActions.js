/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { END_POINT_REPORTS, END_POINT_LOGIN, END_POINT_REFRESH_TOKEN, END_POINT_SEND_PASSWORD_RESET_LINK, END_POINT_RESET_PASSWORD } from '../../../shared/utils/endPoints';
import {
  GET_SUCCESS,
  UNAUTHORIZED,
} from '../../../shared/utils/reponseTypes';
import { REPORT_LIST, LOGIN, LOG_OUT, REFRESH_TOKEN, SEND_PASSWORD_RESET_LINK, RESET_PASSWORD } from './ActionTypes';
import history from '../../../shared/utils/history';
import { JWT } from '../../../shared/utils/constants';

export const login = data => (dispatch) => {
  axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
    withCredentials: false,
    mode: 'no-cors',
    data,
    url: END_POINT_LOGIN,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: LOGIN,
          payload: response.data,
        });
        history.push('/');
        window.location.reload();
      } else if (response.status === UNAUTHORIZED) {
        this.refreshJWTToken();
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      if (error.message && error.message === 'Request failed with status code 401') {
        window.alert('Incorrect email or password');
      } else {
        window.alert(error);
      }
    });
};

export const logOut = () => (dispatch) => {
  dispatch({
    type: LOG_OUT,
    payload: true,
  });
  history.push('/');
  window.location.reload();
};

export const getUserType = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user.type;
};


export const getReports = () => (dispatch) => {
  axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: sessionStorage.getItem('jwt'),
    },
    withCredentials: false,
    mode: 'no-cors',
    url: END_POINT_REPORTS,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: REPORT_LIST,
          payload: response.data.data,
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

export const refreshJWTToken = () => (dispatch) => {
  const refreshToken = localStorage.getItem('refreshToken');
  axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: sessionStorage.getItem('jwt'),
    },
    withCredentials: false,
    mode: 'no-cors',
    url: END_POINT_REFRESH_TOKEN,
    data: {
      refreshToken,
    },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: REFRESH_TOKEN,
          payload: response.data.data,
        });
        window.location.reload();
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
      // window.alert(error);
    });
};

export const checkJWTExpire = () => {
  const { exp } = jwtDecode(JWT);
  if (exp > new Date().getTime() / 1000) {
    return false;
  }
  return true;
};

export const sendPasswordResetLink = data => (dispatch) => {
  // if (data.email) {
  //   data.email = data.email.value;
  // }
  console.log(data);
  axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: sessionStorage.getItem('jwt'),
    },
    withCredentials: false,
    mode: 'no-cors',
    data,
    url: END_POINT_SEND_PASSWORD_RESET_LINK,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: SEND_PASSWORD_RESET_LINK,
          payload: response.data,
        });
        // window.location.reload();
        window.alert('We have sent you an email!Check it out!');
        history.push('/log_in');
        window.location.reload();
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      if (error.message && error.message === 'Request failed with status code 401') {
        window.alert('Incorrect email');
      } else {
        window.alert(error);
      }
    });
};

export const resetPassword = (data, link) => (dispatch) => {
  // console.log(this.props.match.params);
  console.log(`${END_POINT_RESET_PASSWORD}/${link}`);
  console.log(data.password);
  const password = { password: data.password };
  console.log(password);
  axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: sessionStorage.getItem('jwt'),
    },
    withCredentials: false,
    mode: 'no-cors',
    url: `${END_POINT_RESET_PASSWORD}/${link}`,
    data: password,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: RESET_PASSWORD,
          payload: response.data,
        });
        window.alert('Password reset finished!');
        history.push('/log_in');
        window.location.reload();
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};
