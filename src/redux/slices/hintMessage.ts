import {createSlice} from '@reduxjs/toolkit';
import {IHintMessage} from '../models';

const initialState: IHintMessage = {
  showHint: false,
  title: null,
  body: null,
  type: null,
  onPress: null,
};

export const hintSlice = createSlice({
  name: 'hintMessage',
  initialState,
  reducers: {
    showHintMessage: (state, action) => {
      state.showHint = true;
      state.title = action.payload.title;
      state.body = action.payload.body;
      state.type = action.payload.type;
      state.onPress = action.payload?.onPress;
    },
    hideHintMessage: state => {
      state.showHint = false;
    },
  },
});

export const {showHintMessage, hideHintMessage} = hintSlice.actions;

export default hintSlice.reducer;
