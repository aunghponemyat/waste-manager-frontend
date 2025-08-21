/* eslint-disable no-use-before-define */
import axios from 'axios';
import {
  INSERT_SUCCESS,
} from '../../../shared/utils/reponseTypes';
import { END_POINT_REPORTS } from '../../../shared/utils/endPoints';

export const downloadPdf = (reportId) => {
  axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Authorization: sessionStorage.getItem('jwt'),
    },
    withCredentials: false,
    mode: 'no-cors',
    url: `${END_POINT_REPORTS}/download_pdf/${reportId}`,
  })
    .then((response) => {
      if (response.status === INSERT_SUCCESS) {
        console.log(response);
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};

export default downloadPdf;
