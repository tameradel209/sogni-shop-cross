import {createSlice} from '@reduxjs/toolkit';
import {getMessages} from '../actions/chatActions';
import {IChatSlice} from '../models';

const initialState: IChatSlice = {
  chat: {},
  channelId: null,
  page: 0,
  size: 20,
  isLast: false,
  isLoading: false,
};
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChannelToChat: (state, action) => {
      console.log('add channel to chat', action.payload);
      state.channelId = action.payload;
      state.chat[action.payload] = [];
      console.log('there is an id', state.chat[action.payload]);
    },
    addMessage: (state, action) => {
      console.log('add message', action.payload);
      state.chat[state.channelId]?.unshift(action.payload);
    },
    addMessageReceived: (state, action) => {
      console.log('message from background', action.payload);
      if (!state.channelId) {
        state.channelId = action.payload?.userId;
        state.chat[state.channelId] = [];
      }
      const index = state.chat[state.channelId].findIndex(
        msg => msg?.id == action.payload?.id,
      );
      console.log('add message received index', index);
      if (index != -1) {
        state.chat[state.channelId]?.splice(index, 1, action.payload);
      } else {
        state.chat[state.channelId]?.unshift(action.payload);
      }
    },
    clearChat: (state, action) => {
      console.log('clear chat', action.payload);
      state.chat[state.channelId] = [];
      state.page = 0;
      state.size = 20;
      state.isLast = false;
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMessages.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        console.log('fulfilled:', state.chat[state.channelId], state.channelId);
        state.channelId
          ? (state.chat[state.channelId] = [
              ...state.chat[state.channelId],
              ...action.payload?.messages,
            ])
          : null;
        state.page = action.payload?.pageNumber;
        state.isLast = action.payload?.isLast;
        state.isLoading = false;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {addChannelToChat, addMessage, addMessageReceived, clearChat} =
  chatSlice.actions;

export default chatSlice.reducer;
