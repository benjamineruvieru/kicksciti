import axios from 'axios';
import {getItem} from '../utilis/storage';

export const BASEURL =
  'https://dul9z0axu0.execute-api.us-east-1.amazonaws.com/v1';

export const axiosBase = () => {
  const token = getItem('token');
  if (!token) {
    setTimeout(axiosBase, 2000);
    return;
  }
  const axiosinstance = axios.create({
    baseURL: BASEURL,
    headers: {Authorization: `Bearer ${token}`},
  });

  // axiosinstance.interceptors.response.use(
  //   response => response,
  //   async error => {
  //     if (error.response && error.response.status === 401) {
  //       console.log(
  //         'Unauthorized error, refresh the token and retry the request',
  //       );
  //       // Unauthorized error, refresh the token and retry the request
  //       const token = await refreshToken();
  //       axiosinstance.defaults.headers.common[
  //         'Authorization'
  //       ] = `Bearer ${token}`;
  //       return axiosinstance(error.config);
  //     }
  //     return Promise.reject(error);
  //   },
  // );

  return axiosinstance;
};
