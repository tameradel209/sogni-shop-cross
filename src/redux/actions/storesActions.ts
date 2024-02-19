import {createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {getStoresEP} from '../../config/apis/authApi';
import {IStoresParams} from '../../config/models';
import {ERROR} from '../constants';
import {showHintMessage} from '../slices/hintMessage';

export const getStores = createAsyncThunk(
  'stores/get',
  (params: IStoresParams, thunkAPI) =>
    getStoresEP(params)
      .then(res => {
        console.log('getting stores', res?.data);
        return thunkAPI.fulfillWithValue(res?.data?.stores);
      })
      .catch(err => {
        thunkAPI.dispatch(
          showHintMessage({
            title: 'getting stores Failed',
            body: err?.response?.data?.name || err.message,
            type: ERROR,
          }),
        );
        console.log("err", err)
        Alert.alert(
          'We found a problem while getting stores',
          err?.response?.data?.name || err.message,
          [
            {
              text: 'find stores',
              onPress: () => thunkAPI.dispatch(getStores(params)),
            },
            {
              text: 'Cancel',
              onPress: () => null,
            },
          ],
        );
        return thunkAPI.rejectWithValue(
          err?.response?.data?.name || err.message,
        );
      }),
);
