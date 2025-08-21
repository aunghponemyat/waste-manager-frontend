import axios from 'axios';
import { END_POINT_REPORTS } from '../../../shared/utils/endPoints';
import {
  GET_SUCCESS,
  UNAUTHORIZED,
  INSERT_SUCCESS,
} from '../../../shared/utils/reponseTypes';
import { JWT } from '../../../shared/utils/constants';
import { REPORT_LIST } from './ActionTypes';

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
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};


export const getReportDetail = reportId => axios({
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
    Authorization: `Bearer ${JWT}`,
  },
  withCredentials: false,
  mode: 'no-cors',
  url: `${END_POINT_REPORTS}/${reportId}`,
  params: { timestamp: new Date().getTime() },
})
  // eslint-disable-next-line consistent-return
  .then((response) => {
    console.log("Report data:", response.data);
    if (response.status === GET_SUCCESS) {
      return response.data;
    } else if (response.status === UNAUTHORIZED) {
      window.alert('UNAUTHORIZED');
    } else {
      window.alert('SERVER ERROR FOUND');
    }
  })
  .catch((error) => {
    window.alert(error);
  });

export const addNewReport = data => axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
    Authorization: `Bearer ${JWT}`,
  },
  withCredentials: false,
  mode: 'no-cors',
  data,
  url: END_POINT_REPORTS,
})
  .then((response) => {
    if (response.status === INSERT_SUCCESS) {
      // console.log(response.data);
      return response.data;
    }
    window.alert('SERVER ERROR FOUND');
    return false;
  })
  .catch((error) => {
    window.alert(error);
  });
