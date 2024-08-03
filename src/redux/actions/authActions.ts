import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  editProfileEP,
  loginEP,
  registrationEP,
  verifyAccountEP,
} from '../../config/apis/authApi';
import {ERROR, SUCCESS} from '../constants';
import {IEditProfile, ISignin, ISignup, IVerifyAccount} from '../models';
import {showHintMessage} from '../slices/hintMessage';
import {store} from '../store';

export const actionForTesting = credentials => {
  return credentials;
};
export const signin = createAsyncThunk(
  'users/signin',
  (userCredintials: ISignin, thunkAPI) => {
    console.log('start login', userCredintials);
    return loginEP(userCredintials.data)
      .then(res => {
        userCredintials?.data?.fcmTokenNew &&
          AsyncStorage.setItem('fcmToken', userCredintials?.data?.fcmTokenNew);
        return thunkAPI.fulfillWithValue({
          data: res.data,
          keepMeSignIn: userCredintials.keepMeSignIn,
        });
      })
      .catch(err => {
        console.log('LOGIN ERR:', err);
        userCredintials.callback();
        thunkAPI.dispatch(
          showHintMessage({
            title: 'Login Failed',
            body: err?.response?.data?.name || err.message,
            type: ERROR,
          }),
        );
        return thunkAPI.rejectWithValue(err.message);
      });
  },
);

export const editProfile = createAsyncThunk(
  'users/editProfile',
  (userCredintials: IEditProfile, thunkAPI) =>
    editProfileEP(userCredintials)
      .then(res => {
        userCredintials?.fcmTokenNew &&
          AsyncStorage.setItem('fcmToken', userCredintials?.fcmTokenNew);
        return thunkAPI.fulfillWithValue(res.data);
      })
      .catch(err => {
        thunkAPI.dispatch(
          showHintMessage({
            title: 'Login Failed',
            body: err?.response?.data?.name || err.message,
            type: ERROR,
          }),
        );
        return thunkAPI.rejectWithValue(err.message);
      }),
);

export const signup = createAsyncThunk(
  'users/signup',
  (userCredintials: ISignup, thunkAPI) =>
    registrationEP(userCredintials.data)
      .then(res => {
        console.log('Result===Signup', res.data);
        thunkAPI.dispatch(
          showHintMessage({
            title: 'code verification',
            body: 'We sent message to your email',
            type: SUCCESS,
          }),
        );
        userCredintials.toVerifyUser();
        return thunkAPI.fulfillWithValue({
          data: userCredintials.data,
        });
      })
      .catch(err => {
        console.log('Registration Failed 1', err?.response?.data);
        userCredintials.callback();
        thunkAPI.dispatch(
          showHintMessage({
            title: 'Registration Failed',
            body: err?.response?.data?.name || err.message,
            type: ERROR,
          }),
        );
        return thunkAPI.rejectWithValue(err.message);
      }),
);

export const verifyAccount = createAsyncThunk(
  'users/verifyAccount',
  (userCredintials: IVerifyAccount, thunkAPI) => {
    console.log('from verify');
    return verifyAccountEP({
      code: userCredintials.code,
      username: store.getState().authReducer?.credintials?.username,
    })
      .then(res => {
        console.log('from the slice', res?.data);
        thunkAPI.dispatch(
          showHintMessage({
            title: 'Registration success',
            body: 'Your account is registered successfully',
            type: SUCCESS,
          }),
        );
        return thunkAPI.fulfillWithValue({
          data: res.data,
        });
      })
      .catch(err => {
        console.log('err==', err?.response?.data, {
          code: userCredintials.code,
          username: store.getState().authReducer?.credintials?.username,
        });
        userCredintials.callback();
        thunkAPI.dispatch(
          showHintMessage({
            title: 'Registration Failed ',
            body: err?.response?.data?.error_message || err.message,
            type: ERROR,
          }),
        );
        return thunkAPI.rejectWithValue(err.message);
      });
  },
);
