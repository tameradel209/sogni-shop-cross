import {createAsyncThunk} from '@reduxjs/toolkit';
import {getMessagesEP} from '../../config/apis/authApi';
import {ERROR} from '../constants';
import {showHintMessage} from '../slices/hintMessage';
import {store} from '../store';

export const getMessages = createAsyncThunk(
  'messages/get',
  (data: null, thunkAPI) => {
    const {page, size, isLast} = store.getState().chatReducer;
    const {storeSelected} = store.getState().storesReducer;
    const {channelSelected} = store.getState().channelsReducer;
    const {userData} = store.getState().authReducer;

    console.log('getting messages', isLast, storeSelected._id);
    return !isLast
      ? getMessagesEP(
          userData.store ? channelSelected?.user?._id : storeSelected._id,
          page,
          size,
        )
          .then(res => {
            console.log('getting messages', res?.data);
            return thunkAPI.fulfillWithValue(res?.data);
          })
          .catch(err => {
            thunkAPI.dispatch(
              showHintMessage({
                title: 'getting messages Failed',
                body: err?.response?.data?.name || err.message,
                type: ERROR,
              }),
            );
            return thunkAPI.rejectWithValue(
              err?.response?.data?.name || err.message,
            );
          })
      : thunkAPI.rejectWithValue('list is reached to end in chat');
  },
);
