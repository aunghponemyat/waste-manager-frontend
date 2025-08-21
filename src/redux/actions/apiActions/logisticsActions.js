/* eslint-disable no-param-reassign */
import axios from 'axios';
import { END_POINT_LOGISTICS } from '../../../shared/utils/endPoints';
import {
  GET_SUCCESS,
  UNAUTHORIZED,
  // INSERT_SUCCESS,
} from '../../../shared/utils/reponseTypes';
import {
  GET_LOGISTICS_SCHEDULE_LIST,
  CHANGE_PICKUP_TIME,
  GET_LOGISTICS_SCHEDULE_DETAIL,
  UPDATE_LOGISTICS,
  GET_TODAY_LOGISTICS_SCHEDULE,
} from './ActionTypes';
import { JWT } from '../../../shared/utils/constants';
import { checkJWTExpire, refreshJWTToken } from './AuthActions';
// import history from '../../../shared/utils/history';

export const getLogisticsScheduleList = () => (dispatch) => {
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
    url: `${END_POINT_LOGISTICS}`,
    params: { timestamp: new Date().getTime() },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        return dispatch({
          type: GET_LOGISTICS_SCHEDULE_LIST,
          payload: response.data.data,
        });
      } if (response.status === UNAUTHORIZED) {
        return window.alert('UNAUTHORIZED');
      }
      return window.alert('SERVER ERROR FOUND');
    })
    .catch((error) => {
      window.alert(error);
    });
};

export const getLogisticsByOrganization = organizationId => (dispatch) => {
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
    url: `${END_POINT_LOGISTICS}/organizations/${organizationId}`,
    params: { timestamp: new Date().getTime() },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_LOGISTICS_SCHEDULE_LIST,
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

export const getLogisticsByOrganizationWithPromise = (organizationId) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  return axios({
    method: 'get',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${JWT}`,
    },
    mode: 'no-cors',
    url: `${END_POINT_LOGISTICS}/reports/organizations/${organizationId}`,
    params: { timestamp: new Date().getTime() },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        // dispatch({
        //   type: GET_LOGISTICS_SCHEDULE_LIST,
        //   payload: response.data.data,
        // });
        console.log("Response:", response);
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

export const getTodayLogisticsSchedule = () => (dispatch) => {
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
    url: `${END_POINT_LOGISTICS}/today`,
    params: { timestamp: new Date().getTime() },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_TODAY_LOGISTICS_SCHEDULE,
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

export const getLogisticsScheduleDetail = logisticsId => (dispatch) => {
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
    url: `${END_POINT_LOGISTICS}/${logisticsId}`,
    params: { timestamp: new Date().getTime() },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_LOGISTICS_SCHEDULE_DETAIL,
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

export const addNewLogistics = (data) => {
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
    url: END_POINT_LOGISTICS,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        console.log(response.data);
        return response.data.data;
        // dispatch({
        //   type: ADD_NEW_LOGISTICS,
        //   payload: response.data.data,
        // });
      // } else {
      //   window.alert('SERVER ERROR FOUND');
      // }
      // } else {
      //   reject();
      // }
      }
      return null;
    })
    .catch((error) => {
      window.alert(error);
    });
};

// export const addNewLogistics = async (data, pickUpTime) => {
//   if (checkJWTExpire()) {
//     refreshJWTToken();
//   }
//   data.organizationId = data.organizationId.value;
//   data.pickUpTime = pickUpTime;

//   if (data.plate_number && data.driver) {
//     data.vehicle = {
//       plate_number: data.plate_number,
//       driver: data.driver.value,
//     };
//     delete data.driver;
//     delete data.plate_number;
//   }
//   try {
//     const response = await axios({
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Credentials': true,
//         Authorization: `Bearer ${JWT}`,
//       },
//       withCredentials: false,
//       mode: 'no-cors',
//       data,
//       url: END_POINT_LOGISTICS,
//     });
//     if (response.status === INSERT_SUCCESS) {
//       return response.data.data;
//     }
//     return response;
//   } catch (err) {
//     console.error(err);
//     return err;
//   }
// };


export const changePickUpTime = (logisticsId, pickUpTime) => (dispatch) => {
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
    url: `${END_POINT_LOGISTICS}/${logisticsId}`,
    data: {
      pickUpTime,
    },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: CHANGE_PICKUP_TIME,
          payload: pickUpTime,
        });
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};

export const updateLogistics = (data, logisticsId) => (dispatch) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  if (data.wayType) {
    data.wayType = data.wayType.value;
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
    url: `${END_POINT_LOGISTICS}/${logisticsId}`,
    data,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: UPDATE_LOGISTICS,
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

export const changePickUpTimeWithPromise = (logisticsId, pickUpTime) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  return axios({
    method: 'patch',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${JWT}`,
    },
    withCredentials: false,
    mode: 'no-cors',
    url: `${END_POINT_LOGISTICS}/${logisticsId}`,
    data: {
      pickUpTime,
    },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        return response.data.data;
      }
      window.alert('SERVER ERROR FOUND');
      return null;
    })
    .catch((error) => {
      window.alert(error);
    });
};

export const deleteScheduleWithPromise = (logisticsId) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  return axios({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${JWT}`,
    },
    withCredentials: false,
    mode: 'no-cors',
    url: `${END_POINT_LOGISTICS}/${logisticsId}`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        return response;
      }
      window.alert('SERVER ERROR FOUND');
      return null;
    })
    .catch((error) => {
      window.alert(error);
    });
};


export const getWayDetail = (logisticsId) => {
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
    url: `${END_POINT_LOGISTICS}/${logisticsId}`,
    params: { timestamp: new Date().getTime() },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        return response.data.data;
      }
      window.alert('SERVER ERROR FOUND');
      return null;
    })
    .catch((error) => {
      window.alert(error);
    });
};


export const getCommonItemsFound = (organizationId) => {
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
    url: `${END_POINT_LOGISTICS}/organizations/items_found/${organizationId}`,
    params: { timestamp: new Date().getTime() },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        return response.data.data;
      }
      window.alert('SERVER ERROR FOUND');
      return null;
    })
    .catch((error) => {
      window.alert(error);
    });
};
