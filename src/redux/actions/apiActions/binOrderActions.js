/* eslint-disable no-param-reassign */
import axios from 'axios';
import { END_POINT_BIN_ORDERS } from '../../../shared/utils/endPoints';
import {
  GET_SUCCESS,
  UNAUTHORIZED,
  // INSERT_SUCCESS,
} from '../../../shared/utils/reponseTypes';
import {
  GET_BIN_ORDER_LIST,
  GET_BIN_ORDER_DETAIL,
  ADD_NEW_BIN_ORDER,
  UPDATE_BIN_ORDER,
  DELETE_BIN_ORDER,
} from './ActionTypes';
import { JWT } from '../../../shared/utils/constants';
import { checkJWTExpire, refreshJWTToken, logOut } from './AuthActions';
import history from '../../../shared/utils/history';

export const getBinOrderList = () => (dispatch) => {
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
    url: END_POINT_BIN_ORDERS,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_BIN_ORDER_LIST,
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

export const getBinOrderDetail = binOrderId => (dispatch) => {
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
    url: `${END_POINT_BIN_ORDERS}/${binOrderId}`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_BIN_ORDER_DETAIL,
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

export const addNewBinOrder = data => (dispatch) => {
  if (data.organization && typeof data.organization === 'object') {
    data.organization = data.organization.value;
  }
  if (data.bin && typeof data.bin === 'object') {
    data.bin = data.bin.value;
  }
  if (data.quantity) {
    // eslint-disable-next-line radix
    data.quantity = parseInt(data.quantity);
  }
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
    url: END_POINT_BIN_ORDERS,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        // console.log(response.data);
        window.alert(response.data.message);
        dispatch({
          type: ADD_NEW_BIN_ORDER,
          payload: response.data.message,
        });

        history.push('/bin/orders');
        window.location.reload();
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};

export const updateBinOrder = (data, binOrderId) => (dispatch) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
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
    url: `${END_POINT_BIN_ORDERS}/${binOrderId}`,
    data,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: UPDATE_BIN_ORDER,
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

export const deleteBinOrder = binOrderId => (dispatch) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  axios({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${JWT}`,
    },
    withCredentials: false,
    mode: 'no-cors',
    url: `${END_POINT_BIN_ORDERS}/${binOrderId}`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: DELETE_BIN_ORDER,
          payload: response.data,
        });
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};
