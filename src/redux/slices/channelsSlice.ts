import {createSlice} from '@reduxjs/toolkit';
import {getChannels} from '../actions/channelsActions';
import {IChannelSlice} from '../models';

const initialState: IChannelSlice = {
  channels: [],
  channelSelected: null,
  isLoadingChannels: false,
  isLoadingChannel: false,
  error: null,
};

export const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    chooseChannel: (state: IChannelSlice, action) => {
      console.log('channel selected', action.payload);
      state.channelSelected = action.payload;
    },
  },
  extraReducers: {
    [getChannels.pending]: (state: IChannelSlice) => {
      state.error = null;
      state.isLoadingChannels = true;
    },
    [getChannels.fulfilled]: (state: IChannelSlice, action) => {
      console.log('slice of channel', action.payload);
      state.channels = action.payload;
      state.isLoadingChannels = false;
    },
    [getChannels.rejected]: (state: IChannelSlice, action) => {
      state.error = action.payload;
      state.isLoadingChannels = false;
    },
  },
});

export const {chooseChannel} = channelSlice.actions;
export default channelSlice.reducer;
