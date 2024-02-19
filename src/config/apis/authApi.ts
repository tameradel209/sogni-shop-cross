import Axios from './axios';
import {
  ILoginData,
  IRegistrationData,
  IStoresParams,
  IVerifyAccountData,
} from '../models';
import {IEditProfile} from '../../redux/models';

export const loginEP = (data: ILoginData): any =>
  Axios('POST', '/users/signin', data);

export const editProfileEP = (data: IEditProfile): any =>
  Axios('PUT', '/users/user', data);

export const registrationEP = (data: IRegistrationData): any =>
  Axios('POST', '/users/signup', data);

export const verifyAccountEP = (data: IVerifyAccountData) =>
  Axios('POST', '/users/verifyAccount', data);

export const getStoresEP = (params: IStoresParams) =>
  Axios('GET', '/stores/user', null, params);

export const getMessagesEP = (store: string, page: number, size: number) =>
  Axios('GET', `/messages/${store}/page?page=${page}&size=${size}`);

export const getCategoriesEP = () => Axios('GET', '/categories');
