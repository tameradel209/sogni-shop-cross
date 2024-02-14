import {createSlice} from '@reduxjs/toolkit';
import {getMessages} from '../actions/chatActions';
import {IChatSlice} from '../models';

const initialState: IChatSlice = {
  chat: [],
  page: 0,
  size: 20,
  isLast: false,
  isLoading: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      console.log('add message', action.payload);
      state.chat = [action.payload, ...state.chat];
    },
    addMessageReceived: (state, action) => {
      const index = state.chat.findIndex(msg => msg?.id == action.payload?.id);
      console.log('add message received index', index);
      if (index != -1) {
        state.chat.splice(index, 1, action.payload);
      } else {
        state.chat = [action.payload, ...state.chat];
      }
    },
    clearChat: (state, action) => {
      console.log('clear chat', action.payload);
      state.chat = [];
      state.page = 0;
      state.size = 20;
      state.isLast = false;
      state.isLoading = false;
    },
  },
  extraReducers: {
    [getMessages.pending]: (state: IChatSlice) => {
      state.isLoading = true;
    },
    [getMessages.fulfilled]: (state: IChatSlice, action) => {
      state.chat = [...state.chat, ...action.payload?.messages];
      state.page = action.payload?.pageNumber;
      state.isLast = action.payload?.isLast;
      state.isLoading = false;
    },
    [getMessages.rejected]: (state: IChatSlice) => {
      state.isLoading = false;
    },
  },
});

export const {addMessage, addMessageReceived, clearChat} = chatSlice.actions;

export default chatSlice.reducer;
