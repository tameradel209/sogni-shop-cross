import axios, {Method} from 'axios';
import {store} from '../../redux/store';
import {TMethod, TContentType, TData, TParams, TUrl} from '../models';
import {Platform} from 'react-native';

//export const baseUrl = 'http://10.0.2.2:3000';
export const baseUrl =
  Platform.OS == 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
//export const baseUrl = 'https://sogni-shop.herokuapp.com';
//export const baseUrl = 'https://sogni-shop-backend.onrender.com';
export const version = '/api/v1';
const axiosInstance = axios.create({
  baseURL: baseUrl + version,
  timeout: 9000,
});

const Axios = (
  method: TMethod,
  url: TUrl,
  data?: TData,
  params?: TParams,
  contentType?: TContentType,
) => {
  console.log(
    'AXIOS: ',
    'method ',
    method,
    'url ',
    url,
    'data ',
    data,
    'params ',
    params,
  );
  const userToken =
    url === '/users/signin' ||
    url === '/users/signup' ||
    url == '/users/verifyAccount'
      ? undefined
      : store.getState().authReducer?.userData.token; //from the store
  return axiosInstance({
    method,
    url,
    params,
    data,
    headers: {
      'Content-Type': contentType ?? 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  });
};

export default Axios;
