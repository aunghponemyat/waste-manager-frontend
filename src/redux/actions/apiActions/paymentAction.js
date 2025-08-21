/* eslint-disable no-param-reassign */
import axios from 'axios';
import { END_POINT_ORGANIZATOINS, END_POINT_PAYMENT } from '../../../shared/utils/endPoints';
import {
  GET_SUCCESS,
  UNAUTHORIZED,
  INSERT_SUCCESS,
} from '../../../shared/utils/reponseTypes';
import {
  GET_PAYMENT_DETAIL,
  ADD_NEW_ORGANIZATION,
  GET_PAYMENT_LIST,
} from './ActionTypes';
import { JWT } from '../../../shared/utils/constants';
import { checkJWTExpire, refreshJWTToken, logOut } from './AuthActions';
import history from '../../../shared/utils/history';

export const getPaymentsForSpecificOrganization = organizationId => (dispatch) => {
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
    url: `${END_POINT_PAYMENT}/organizations/${organizationId}`,
    params: { timestamp: new Date().getTime() },
  })
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_PAYMENT_LIST,
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

export const getPaymentDetail = paymentId => (dispatch) => {
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
    url: `${END_POINT_PAYMENT}/${paymentId}`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_PAYMENT_DETAIL,
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

export const addNewPayment = (data) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${JWT}`,
    },
    withCredentials: false,
    mode: 'no-cors',
    data,
    url: END_POINT_PAYMENT,
  })
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response.status === INSERT_SUCCESS) {
        console.log(response.data);
        return response;
      }
      window.alert('SERVER ERROR FOUND');
    })
    .catch((error) => {
      window.alert(error);
    });
};

export const addNewOrganization = (data, startDate) => (dispatch) => {
  if (data.companyType) {
    data.companyType = data.companyType.value;
  }
  data.startDate = startDate;
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
    url: END_POINT_ORGANIZATOINS,
  })
    .then((response) => {
      if (response.status === INSERT_SUCCESS) {
        // console.log(response.data);
        window.alert(response.data.message);
        dispatch({
          type: ADD_NEW_ORGANIZATION,
          payload: response.data.message,
        });

        history.push('/organizations');
        window.location.reload();
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};
