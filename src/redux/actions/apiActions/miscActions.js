import axios from 'axios';
import { BASE_URL, END_POINT_UPLOAD } from '../../../shared/utils/endPoints';
import {
  GET_SUCCESS,
  UNAUTHORIZED,
  NOT_FOUND,
  FILE_TOO_LARGE,
} from '../../../shared/utils/reponseTypes';
import {
  GET_DASHBOARD_DATA,
  GET_GROWTH_RATE,
  GET_TREND,
  GET_TOTAL_WASTE_DATA,
  GET_TOTAL_WASTE_BY_ORGANIZATION,
  GET_TOTAL_PICKUPS_BY_ORGANIZATION,
  GET_CONTRACT_DURATION_FOR_EACH_ORGANIZATION,
  GET_MONTHLY_WASTE_DATA,
  GET_CONTRACT_EXPRIES,
  GET_TRENDLINE_WASTE_DATA,
  CHANGE_FILTER_ORGANIZATION,
} from './ActionTypes';
import { JWT } from '../../../shared/utils/constants';
import { checkJWTExpire, refreshJWTToken, logOut } from './AuthActions';

export const getDashboardData = () => (dispatch) => {
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
    url: `${BASE_URL}/dashboard`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_DASHBOARD_DATA,
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

export const getGrowthRate = () => (dispatch) => {
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
    url: `${BASE_URL}/dashboard/growth_rate`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_GROWTH_RATE,
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

export const getTrend = () => (dispatch) => {
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
    url: `${BASE_URL}/dashboard/trend`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_TREND,
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


export const getTotalWasteData = organization => (dispatch) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  let url = `${BASE_URL}/wastes`;
  if (organization) {
    url = `${BASE_URL}/wastes/organizations/${organization}`;
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
    url,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_TOTAL_WASTE_DATA,
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

export const getTotalWasteByOrganization = (organizationId, duration) => (dispatch) => {
  console.log(duration);
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
    url: `${BASE_URL}/wastes/organizations/${organizationId}`,
    params: {
      duration,
    },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_TOTAL_WASTE_BY_ORGANIZATION,
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

export const getTotalPickupsForEachOrganization = (organizationId, duration) => (dispatch) => {
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
    url: `${BASE_URL}/pickups/organizations/${organizationId}`,
    params: {
      duration,
    },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_TOTAL_PICKUPS_BY_ORGANIZATION,
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

export const getContractDurationForEachOrganization = organizationId => (dispatch) => {
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
    url: `${BASE_URL}/contracts/organizations/${organizationId}`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_CONTRACT_DURATION_FOR_EACH_ORGANIZATION,
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

export const getMonthlyCollectedWaste = (organizationId, duration) => (dispatch) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  let url = '';
  if (organizationId) {
    url = `${BASE_URL}/wastes/monthly/${organizationId}`;
  } else {
    url = `${BASE_URL}/wastes/monthly`;
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
    url: `${url}`,
    params: {
      duration,
    },
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_MONTHLY_WASTE_DATA,
          payload: response.data.data,
        });
      } else if (response.status === UNAUTHORIZED) {
        dispatch(logOut());
      } else if (response.status === NOT_FOUND) {
        dispatch({
          type: GET_MONTHLY_WASTE_DATA,
          payload: [],
        });
      } else {
        window.alert('Server Error');
      }
    })
    .catch((error) => {
      if (error.message && error.message === 'Request failed with status code 401') {
        dispatch(logOut());
      } else if (error.message === 'This organization has no data.') {
        dispatch({
          type: GET_MONTHLY_WASTE_DATA,
          payload: [],
        });
      } else {
        window.alert(error);
      }
    });
};

export const getTrendlineWaste = organizationId => (dispatch) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  let url = '';
  if (organizationId) {
    url = `${BASE_URL}/wastes/monthly/${organizationId}`;
  } else {
    url = `${BASE_URL}/wastes/monthly`;
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
    url: `${url}`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_TRENDLINE_WASTE_DATA,
          payload: response.data.data,
        });
      } else if (response.status === UNAUTHORIZED) {
        dispatch(logOut());
      } else if (response.status === NOT_FOUND) {
        dispatch({
          type: GET_TRENDLINE_WASTE_DATA,
          payload: [],
        });
      } else {
        window.alert('Server Error');
      }
    })
    .catch((error) => {
      if (error.message && error.message === 'Request failed with status code 401') {
        dispatch(logOut());
      } else if (error.message === 'This organization has no data.') {
        dispatch({
          type: GET_TRENDLINE_WASTE_DATA,
          payload: [],
        });
      } else {
        window.alert(error);
      }
    });
};

export const getContractExpries = () => (dispatch) => {
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
    url: `${BASE_URL}/contract_expries`,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_CONTRACT_EXPRIES,
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

export const greet = () => (dispatch) => {
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
    url: BASE_URL,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        dispatch({
          type: GET_DASHBOARD_DATA,
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

export const UPLOAD_IMAGE = (data) => {
  if (checkJWTExpire()) {
    refreshJWTToken();
  }
  const formData = new FormData();
  formData.append('files', data[0]);
  return axios({
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
      if (response.status === FILE_TOO_LARGE) {
        alert('File Too Large to upload');
      }
      if (response.status === GET_SUCCESS) {
        console.log(response.data.file);
        return response.data.file;
      }
      return null;
    })
    .catch((error) => {
      console.log(error);
      window.alert('File Too Large To Uplaod');
    });
};

export const changeFilter = value => (dispatch) => {
  dispatch({
    type: CHANGE_FILTER_ORGANIZATION,
    payload: value,
  });
};
