import {createSlice} from '@reduxjs/toolkit';
import SocketIO from '../../config/socket';
import {
  editProfile,
  signin,
  signup,
  verifyAccount,
} from '../actions/authActions';
import {IAuthSlice} from '../models';
import {store} from '../store';
import {addMessageReceived} from './chatSlice';

const initialState: IAuthSlice = {
  language: 'en',
  credintials: null,
  userData: null,
  isLoading: false,
  isLoadingUpdate: false,
  isLoadingCode: false,
  keepMeSignIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      console.log(action.payload);
      state.language = action.payload;
    },
    signout: state => {
      console.log('hi there');
      state.userData = null;
      state.credintials = null;
      state.keepMeSignIn = false;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [signin.pending]: (state: IAuthSlice) => {
      state.isLoading = true;
    },
    [signin.fulfilled]: (state: IAuthSlice, action) => {
      state.userData = action.payload.data;
      state.keepMeSignIn = action.payload.keepMeSignIn;
      state.isLoading = false;

      const socketServices = new SocketIO();
      socketServices.socket.on('connect', () => {
        console.log(
          'socket connected ---- from auth slice',
          socketServices.socket.connected,
        );
        socketServices.socket.emit('join_room', action.payload.data?._id);
      });
      socketServices.socket.on('chat_message', (msg: any) => {
        console.log('msg----auth slice', msg);
        if (msg?.status == 1 && msg?.senderId != action.payload.data?._id) {
          console.log('received auth slice');
          socketServices.socket.emit('chat_message', {...msg, status: 2});
        }
        store.dispatch(addMessageReceived(msg));
      });
    },
    [signin.rejected]: (state: IAuthSlice) => {
      state.isLoading = false;
    },
    [editProfile.pending]: (state: IAuthSlice) => {
      state.isLoadingUpdate = true;
    },
    [editProfile.fulfilled]: (state: IAuthSlice, action) => {
      console.log('update profile success', JSON.stringify(action.payload));
      state.userData = {...state.userData, ...action.payload};
      state.isLoadingUpdate = false;
    },
    [editProfile.rejected]: (state: IAuthSlice) => {
      console.log('update profile failed');
      state.isLoadingUpdate = false;
    },
    [signup.pending]: (state: IAuthSlice) => {
      state.isLoading = true;
    },
    [signup.fulfilled]: (state: IAuthSlice, action) => {
      console.log('registration success', JSON.stringify(action.payload.data));
      state.credintials = action.payload.data;
      state.isLoading = false;
    },
    [signup.rejected]: (state: IAuthSlice) => {
      console.log('registration failed');
      state.isLoading = false;
    },
    [verifyAccount.pending]: (state: IAuthSlice) => {
      state.isLoadingCode = true;
    },
    [verifyAccount.fulfilled]: (state: IAuthSlice, action) => {
      console.log('registration success', action.payload.data);
      state.userData = action.payload.data;
      state.isLoadingCode = false;

      const socketServices = new SocketIO();
      socketServices.socket.on('connect', () => {
        console.log(
          'socket connected ---- auth slice',
          socketServices.socket.connected,
        );
        socketServices.socket.emit('join_room', action.payload.data?._id);
      });
      socketServices.socket.on('chat_message', (msg: any) => {
        console.log('msg---- auth slice', msg);
        if (msg?.status == 1 && msg?.senderId != action.payload.data?._id) {
          console.log('received auth slice');
          socketServices.socket.emit('chat_message', {
            ...msg,
            status: 2,
          });
        }
        store.dispatch(addMessageReceived(msg));
      });
    },
    [verifyAccount.rejected]: (state: IAuthSlice) => {
      console.log('registration failed from verifyAccount.rejected');
      state.isLoadingCode = false;
    },
  },
});

export const {signout, setLanguage, setIsLoading} = authSlice.actions;

export default authSlice.reducer;
