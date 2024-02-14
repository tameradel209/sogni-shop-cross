import {ILoginData, IRegistrationData} from '../config/models';

export interface IAuthSlice {
  language: 'en' | 'ar';
  userData: any;
  credintials: IRegistrationData | null;
  isLoading: boolean;
  isLoadingCode: boolean;
  isLoadingUpdate: boolean;
  keepMeSignIn: boolean;
}
export interface IChatSlice {
  chat: any[];
  page: number;
  size: number;
  isLast: boolean;
  isLoading: boolean;
}
export interface IChatTempslice {
  chatTemp: any[];
}
export interface IStoreSlice {
  stores: any[];
  storeSelected: any;
  isLoadingStores: boolean;
  isLoadingStore: boolean;
  error: string | null;
}
export interface ICategorySlice {
  categories: any[];
  category: any;
  isLoadingCategories: boolean;
  isLoadingCategory: boolean;
}

export interface ISignin {
  data: ILoginData;
  keepMeSignIn: boolean;
  callback: () => void;
}
export interface IEditProfile {
  fcmTokenOld?: string | null;
  fcmTokenNew?: string | null;
  fullname?: string | null;
  phone?: string | null;
  image?: string | null;
  location?: {
    longitude: number;
    latitude: number;
  };
  address?: string | null;
  city?: string | null;
  gender?: 'MALE' | 'FEMALE';
}
export interface ISignup {
  data: IRegistrationData;
  callback: () => void;
  toVerifyUser: () => void;
}
export interface IVerifyAccount {
  code: string;
  callback: () => void;
}

export interface IHintMessage {
  showHint: boolean;
  title: any;
  body: any;
  type: 'ERROR' | 'SUCCESS' | 'WARNING' | null;
  onPress: () => void | null;
}
export interface IMessageData {
  page: number;
  size: number;
}