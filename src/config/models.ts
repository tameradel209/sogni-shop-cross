export type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type TUrl = string;
export type TData = object| null;
export type TParams = object;
export type TContentType = 'application/json' | 'multipart/form-data';

export interface ILoginData {
  username: string;
  password: string;
  fcmTokenOld: string | null;
  fcmTokenNew: string | null;
}
export interface IRegistrationData {
  fullName: string;
  address: string;
  username: string;
  password: string;
  fcmToken: string;
}
export interface IStoresParams {
  latitude: number;
  longitude: number;
}
export interface IVerifyAccountData {
  code: string;
  username: string;
}

export type TMessage = 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO' | 'FILE';
export interface IMessage {
  id: string;
  receiverId: string;
  senderId: string;
  message: string;
  type: TMessage;
  status: number;
  duration?: number;
  _id?: string | null;
  url?: string;
  dateSent: string;
  dateReceived?: String | null;
  dateSeen?: string | null;
}
