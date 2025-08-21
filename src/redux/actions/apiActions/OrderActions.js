/* eslint-disable no-param-reassign */
import axios from 'axios';
import { END_POINT_ORDERS } from '../../../shared/utils/endPoints';
import {
  GET_SUCCESS,
} from '../../../shared/utils/reponseTypes';
// import {
//   ADD_NEW_ORDER,
// } from './ActionTypes';
// import { JWT } from '../../../shared/utils/constants';
// import { checkJWTExpire, refreshJWTToken } from './AuthActions';
// import history from '../../../shared/utils/history';

const addNewOrder = (data) => {
  console.log(data);
  if (data.certificate) {
    delete data.certificate;
  }

  axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
    withCredentials: false,
    mode: 'no-cors',
    data,
    url: END_POINT_ORDERS,
  })
    .then((response) => {
      if (response.status === GET_SUCCESS) {
        console.log(response.data);
        // window.alert(response.data.message);
        // dispatch({
        //   type: ADD_NEW_ORDER,
        //   payload: response.data.message,
        // });
        // window.location.reload();
      } else {
        window.alert('SERVER ERROR FOUND');
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};

export default addNewOrder;
