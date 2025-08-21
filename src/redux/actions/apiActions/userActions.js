/* eslint-disable no-param-reassign */
import axios from 'axios';
import { END_POINT_USERS } from '../../../shared/utils/endPoints';
import {
  GET_SUCCESS,
  UNAUTHORIZED,
  INSERT_SUCCESS,
} from '../../../shared/utils/reponseTypes';
import {
  GET_USER_LIST,
  GET_USER_DETAIL,
  ADD_NEW_USER,
  GET_DRIVER_LIST,
  GET_OPERATION_TEAM_LIST,
  DELETE_USER,
} from './ActionTypes';
import { JWT } from '../../../shared/utils/constants';
import { checkJWTExpire, refreshJWTToken } from './AuthActions';
import history from '../../../shared/utils/history';

export const getUserList = () => (dispatch) => {
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
    url: END_POINT_USERS,
    params: { timestamp: new Date().getTime() },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_USER_LIST,
          payload: response.data.data,
        });
      } else if (response.status === UNAUTHORIZED) {
        window.alert('UNAUTHORIZED');
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};

export const getUserDetail = userId => (dispatch) => {
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
    url: `${END_POINT_USERS}/${userId}`,
    params: { timestamp: new Date().getTime() },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_USER_DETAIL,
          payload: response.data.data,
        });
      } else if (response.status === UNAUTHORIZED) {
        window.alert('UNAUTHORIZED');
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};

export const getUserDetailWithPromise = (userId) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  return axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${JWT}`,
    },
    withCredentials: false,
    mode: 'no-cors',
    url: `${END_POINT_USERS}/${userId}`,
    params: { timestamp: new Date().getTime() },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        // dispatch({
        //   type: GET_USER_DETAIL,
        //   payload: response.data.data,
        // });
        return response.data.data;
      } if (response.status === UNAUTHORIZED) {
        window.alert('UNAUTHORIZED');
        return null;
      }
      window.alert('SERVER ERROR FOUND');
      return null;
    })
    .catch((error) => {
      window.alert(error);
    });
};

export const getDriverList = () => (dispatch) => {
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
    url: END_POINT_USERS,
    params: {
      where: { type: 'DRIVER' },
    },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_DRIVER_LIST,
          payload: response.data.data,
        });
      } else if (response.status === UNAUTHORIZED) {
        window.alert('UNAUTHORIZED');
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};

export const getOperationTeamList = () => (dispatch) => {
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
    url: END_POINT_USERS,
    params: {
      where: { type: 'OPERATION' },
    },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_OPERATION_TEAM_LIST,
          payload: response.data.data,
        });
      } else if (response.status === UNAUTHORIZED) {
        window.alert('UNAUTHORIZED');
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};

export const updateUser = (data, userId) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }

  if (data.organizationId) {
    data.organizationId = data.organizationId.value;
  }
  if (data.type) {
    data.type = data.type.value;
  }

  axios({
    method: 'patch',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${JWT}`,
    },
    withCredentials: false,
    mode: 'no-cors',
    url: `${END_POINT_USERS}/${userId}`,
    data,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        window.location.reload();
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};

export const changePassword = (userId, currentPassword, newPassword) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  const data = {
    currentPassword, newPassword,
  };
  console.log(userId);

  axios({
    method: 'patch',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${JWT}`,
    },
    withCredentials: false,
    mode: 'no-cors',
    url: `${END_POINT_USERS}/change_password/${userId}`,
    data,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        history.push('/');
        window.location.reload();
      } else if (response.status === UNAUTHORIZED) {
        window.alert('Unauthorized to change password.');
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      if (error.message === 'Request failed with status code 401') {
        window.alert('Unauthorized to change password.');
      } else {
        window.alert(error);
      }
    });
};

export const addNewUser = data => (dispatch) => {
  data.type = data.type.value;
  if (data.organizationId) {
    data.organizationId = data.organizationId.value;
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
    url: END_POINT_USERS,
  })
    .then((response) => {
      if (response.status === INSERT_SUCCESS) {
        console.log(response.data);
        window.alert(response.data.message);
        dispatch({
          type: ADD_NEW_USER,
          payload: response.data.message,
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

export const deleteUser = userId => (dispatch) => {
  axios({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${JWT}`,
    },
    withCredentials: false,
    mode: 'no-cors',
    url: `${END_POINT_USERS}/${userId}`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: DELETE_USER,
          payload: response.data,
        });
        history.push('/users');
        window.location.reload();
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};
