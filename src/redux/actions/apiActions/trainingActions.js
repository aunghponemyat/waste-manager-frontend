/* eslint-disable no-param-reassign */
import axios from 'axios';
import { END_POINT_TRAININGS } from '../../../shared/utils/endPoints';
import {
  GET_SUCCESS,
  UNAUTHORIZED,
  // INSERT_SUCCESS,
} from '../../../shared/utils/reponseTypes';
import {
  GET_TRAINING_LIST,
  GET_TRAINING_DETAIL,
  CHANGE_TRAINING_DATE,
  UPDATE_TRAINING,
} from './ActionTypes';
import { JWT } from '../../../shared/utils/constants';
import { checkJWTExpire, refreshJWTToken } from './AuthActions';
// import history from '../../../shared/utils/history';

export const getTrainingList = () => (dispatch) => {
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
    url: END_POINT_TRAININGS,
    params: { timestamp: new Date().getTime() },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_TRAINING_LIST,
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

export const getTrainingListByOrganization = organizationId => (dispatch) => {
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
    url: END_POINT_TRAININGS,
    params: {
      where: { organizationId },
    },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_TRAINING_LIST,
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


export const getTrainingDetail = trainingId => (dispatch) => {
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
    url: `${END_POINT_TRAININGS}/${trainingId}`,
    params: { timestamp: new Date().getTime() },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_TRAINING_DETAIL,
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


export const updateTraining = (data, trainingId) => (dispatch) => {
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
    url: `${END_POINT_TRAININGS}/${trainingId}`,
    data,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: UPDATE_TRAINING,
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

export const addNewTraining = (data, trainingDate) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  data.organizationId = data.organizationId.value;
  data.trainingDate = trainingDate;

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
    url: END_POINT_TRAININGS,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        // console.log(response.data);
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


export const changeTrainingDate = (trainingId, trainingDate) => (dispatch) => {
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
    url: `${END_POINT_TRAININGS}/${trainingId}`,
    data: {
      trainingDate,
    },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: CHANGE_TRAINING_DATE,
          payload: trainingDate,
        });
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};

export const changeTrainingDateWithPromise = (trainingId, trainingDate) => {
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
    url: `${END_POINT_TRAININGS}/${trainingId}`,
    data: {
      trainingDate,
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

export const deleteTrainingWithPromise = (trainingId) => {
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
    url: `${END_POINT_TRAININGS}/${trainingId}`,
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
