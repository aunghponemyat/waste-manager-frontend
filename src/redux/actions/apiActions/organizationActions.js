/* eslint-disable no-param-reassign */
import axios from 'axios';
import { END_POINT_ORGANIZATOINS, END_POINT_UPLOAD } from '../../../shared/utils/endPoints';
import {
  GET_SUCCESS,
  UNAUTHORIZED,
  INSERT_SUCCESS,
} from '../../../shared/utils/reponseTypes';
import {
  GET_ORGANIZATION_LIST,
  GET_ORGANIZATION_DETAIL,
  ADD_NEW_ORGANIZATION,
  UPDATE_ORGANIZATION,
  DELETE_ORGANIZATION,
} from './ActionTypes';
import { JWT } from '../../../shared/utils/constants';
import { checkJWTExpire, refreshJWTToken, logOut } from './AuthActions';
import history from '../../../shared/utils/history';

export const getOrganizationList = () => (dispatch) => {
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
    url: END_POINT_ORGANIZATOINS,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_ORGANIZATION_LIST,
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

export const getOrganizationDetail = organizationId => (dispatch) => {
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
    url: `${END_POINT_ORGANIZATOINS}/${organizationId}`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_ORGANIZATION_DETAIL,
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

export const addNewOrganization = (data, startDate, location) => (dispatch) => {
  console.log(data);
  console.log("CT api:", data.companyType.value);
  if (data.companyType) {
    data.companyType = data.companyType.value;
  }
  data.startDate = startDate;
  if (location) { data.location = location; }
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
        // console.log(response.data);
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
      window.alert(error.response.data);
      // console.log(Object.keys(error));
      console.log(error.response);
    });
};

export const updateOrganization = (data, organizationId, location, startDate, expiredDate) => (dispatch) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }

  console.log(data);

  if (startDate) {
    // eslint-disable-next-line no-param-reassign
    data.startDate = new Date(startDate);
  }
  if (data.companyType) {
    // eslint-disable-next-line no-param-reassign
    data.companyType = data.companyType.value;
  }
  if (expiredDate) {
    // eslint-disable-next-line no-param-reassign
    data.expiredDate = new Date(expiredDate);
  }
  if (location) {
    // eslint-disable-next-line no-param-reassign
    data.location = location;
  }

  if (data.logo && typeof data.logo !== 'string') {
    const formData = new FormData();
    formData.append('files', data.logo[0]);
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Credentials': true,
        Authorization: `Bearer ${JWT}`,
      },
      withCredentials: false,
      mode: 'no-cors',
      url: `${END_POINT_UPLOAD}`,
      data: formData,
    })
      .then((response) => {
        if (response.status === GET_SUCCESS) {
          console.log(response.data.file);
          data.logo = response.data.file;
          console.log(data);
          axios({
            method: 'patch',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': true,
              Authorization: `Bearer ${JWT}`,
            },
            withCredentials: false,
            mode: 'no-cors',
            url: `${END_POINT_ORGANIZATOINS}/${organizationId}`,
            data,
          })
            .then((res) => {
              if (res.status === GET_SUCCESS) {
                dispatch({
                  type: UPDATE_ORGANIZATION,
                  payload: res.data,
                });
                window.location.reload();
              } else {
                window.alert('SERVER ERROR FOUND');
              }
            })
            .catch((error) => {
              window.alert(error);
            });
        } else {
          window.alert('SERVER ERROR FOUND');
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  } else {
    axios({
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        Authorization: `Bearer ${JWT}`,
      },
      withCredentials: false,
      mode: 'no-cors',
      url: `${END_POINT_ORGANIZATOINS}/${organizationId}`,
      data,
    })
      .then((response) => {
        if (response.status === GET_SUCCESS) {
          dispatch({
            type: UPDATE_ORGANIZATION,
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
  }
};

export const deleteOrganization = organizationId => (dispatch) => {
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
    url: `${END_POINT_ORGANIZATOINS}/${organizationId}`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: DELETE_ORGANIZATION,
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
