/* eslint-disable no-param-reassign */
import axios from 'axios';
import { END_POINT_BINS, END_POINT_UPLOAD } from '../../../shared/utils/endPoints';
import {
  GET_SUCCESS,
  UNAUTHORIZED,
  INSERT_SUCCESS,
} from '../../../shared/utils/reponseTypes';
import {
  GET_BINS_LIST,
  GET_BIN_DETAIL,
  ADD_NEW_BIN,
  UPDATE_BIN,
  DELETE_BIN,
} from './ActionTypes';
import { JWT } from '../../../shared/utils/constants';
import { checkJWTExpire, refreshJWTToken, logOut } from './AuthActions';
import history from '../../../shared/utils/history';

export const getBinList = () => (dispatch) => {
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
    url: END_POINT_BINS,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_BINS_LIST,
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

export const getBinDetail = binId => (dispatch) => {
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
    url: `${END_POINT_BINS}/${binId}`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_BIN_DETAIL,
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

export const addNewBin = data => (dispatch) => {
  if (data.image) {
    const formData = new FormData();
    formData.append('files', data.image[0]);
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
          data.image = response.data.file;
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
            url: END_POINT_BINS,
          })
            .then((res) => {
              if (res.status === GET_SUCCESS) {
                // console.log(response.data);
                window.alert(response.data.message);
                dispatch({
                  type: ADD_NEW_BIN,
                  payload: response.data.message,
                });
                history.push('/bin/available-bins');
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
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        Authorization: `Bearer ${JWT}`,
      },
      withCredentials: false,
      mode: 'no-cors',
      data,
      url: END_POINT_BINS,
    })
      .then((response) => {
        if (response.status === INSERT_SUCCESS) {
          // console.log(response.data);
          window.alert(response.data.message);
          dispatch({
            type: ADD_NEW_BIN,
            payload: response.data.message,
          });

          history.push('/bins');
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

export const updateBin = (data, binId) => (dispatch) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }

  if (data.image && typeof data.image !== 'string') {
    const formData = new FormData();
    formData.append('files', data.image[0]);
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
          data.image = response.data.file;
          axios({
            method: 'patch',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': true,
              Authorization: `Bearer ${JWT}`,
            },
            withCredentials: false,
            mode: 'no-cors',
            url: `${END_POINT_BINS}/${binId}`,
            data,
          })
            .then((res) => {
              if (res.status === GET_SUCCESS) {
                dispatch({
                  type: UPDATE_BIN,
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
      url: `${END_POINT_BINS}/${binId}`,
      data,
    })
      .then((response) => {
        if (response.status === GET_SUCCESS) {
          dispatch({
            type: UPDATE_BIN,
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

export const deleteBin = binId => (dispatch) => {
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
    url: `${END_POINT_BINS}/${binId}`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: DELETE_BIN,
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
