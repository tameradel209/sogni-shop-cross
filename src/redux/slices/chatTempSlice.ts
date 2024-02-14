import {createSlice} from '@reduxjs/toolkit';
import {IChatTempslice} from '../models';

const initialState: IChatTempslice = {
  chatTemp: [],
};

export const chatTempSlice = createSlice({
  name: 'chatTemp',
  initialState,
  reducers: {
    addMessageTemp: (state, action) => {
      console.log('add temp message', action.payload);
      state.chatTemp = [action.payload, ...state.chatTemp];
    },
    removeMessageTemp: (state, action) => {
      console.log('remove temp message', action.payload);
      const index = state.chatTemp.findIndex(
        msg => msg?._id == action.payload?._id,
      );
      state.chatTemp.splice(index, 1);
    },
    clearChatTemp: (state, action) => {
      console.log('clear temp chat', action.payload);
      state.chatTemp = [];
    },
  },
});

export const {addMessageTemp, removeMessageTemp, clearChatTemp} =
  chatTempSlice.actions;

export default chatTempSlice.reducer;
