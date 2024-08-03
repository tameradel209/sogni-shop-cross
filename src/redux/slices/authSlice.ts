import {createSlice, isPending} from '@reduxjs/toolkit';
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
  extraReducers: builder => {
    builder
      .addCase(signin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
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
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(editProfile.pending, (state, action) => {
        state.isLoadingUpdate = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        console.log('update profile success', JSON.stringify(action.payload));
        state.userData = {...state.userData, ...action.payload};
        state.isLoadingUpdate = false;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoadingUpdate = false;
      })
      .addCase(signup.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        console.log(
          'registration success',
          JSON.stringify(action.payload.data),
        );
        state.credintials = action.payload.data;
        state.isLoading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(verifyAccount.pending, (state, action) => {
        state.isLoadingCode = true;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
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
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.isLoadingCode = false;
      });
  },
});

export const {signout, setLanguage, setIsLoading} = authSlice.actions;

export default authSlice.reducer;
