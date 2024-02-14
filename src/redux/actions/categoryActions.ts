import {createAsyncThunk} from '@reduxjs/toolkit';
import {getCategoriesEP} from '../../config/apis/authApi';
import {ERROR} from '../constants';
import {showHintMessage} from '../slices/hintMessage';

export const getCategories = createAsyncThunk(
  'categories/get',
  (data: null, thunkAPI) =>
    getCategoriesEP()
      .then(res => {
        console.log('getting categories', res?.data);
        return thunkAPI.fulfillWithValue(res?.data?.categories);
      })
      .catch(err => {
        thunkAPI.dispatch(
          showHintMessage({
            title: 'getting categories Failed',
            body: err?.response?.data?.name || err.message,
            type: ERROR,
          }),
        );
        return thunkAPI.rejectWithValue(
          err?.response?.data?.name || err.message,
        );
      }),
);
