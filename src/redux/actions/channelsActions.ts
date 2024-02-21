import {createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {getChannelsEP} from '../../config/apis/authApi';
import {ERROR} from '../constants';
import {showHintMessage} from '../slices/hintMessage';

export const getChannels = createAsyncThunk(
  'channels/get',
  (data: null, thunkAPI) =>
    getChannelsEP()
      .then(res => {
        console.log('getting channels', res?.data);
        return thunkAPI.fulfillWithValue(res?.data);
      })
      .catch(err => {
        thunkAPI.dispatch(
          showHintMessage({
            title: 'getting channels Failed',
            body: err?.response?.data?.name || err.message,
            type: ERROR,
          }),
        );
        console.log('err', err);
        Alert.alert(
          'We found a problem while getting channels',
          err?.response?.data?.name || err.message,
          [
            {
              text: 'find channels',
              onPress: () => thunkAPI.dispatch(getChannels(data)),
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
