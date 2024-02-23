import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './slices';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import SplashScreen from 'react-native-splash-screen';
import SocketIO from '../config/socket';
import {addMessageReceived} from './slices/chatSlice';
import {IMessage} from '../config/models';
import {getChannels} from './actions/channelsActions';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['chatReducer'],
};

const reducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;

export const socketConnection = () => {
  const {userData} = store.getState().authReducer;
  const {chat, channelId} = store.getState().chatReducer;
  if (userData) {
    const socketServices = new SocketIO();
    socketServices.socket.on('connect', () => {
      channelId &&
        chat[channelId].forEach((msg: IMessage) => {
          msg?._id ? null : socketServices.socket.emit('chat_message', msg);
        });
      console.log(
        'socket connected from store',
        socketServices.socket.connected,
      );
      socketServices.socket.emit('join_room', userData?._id);
    });
    socketServices.socket.on('chat_message', (msg: any) => {
      console.log('msg---- from store', msg);
      userData.store && store.dispatch(getChannels(null));
      if (msg?.status == 1 && msg?.senderId != userData?._id) {
        console.log('received from store');
        socketServices.socket.emit('chat_message', {...msg, status: 2});
      }
      store.dispatch(addMessageReceived(msg));
    });
  }
  SplashScreen.hide();
};

export const persistor = persistStore(store, null, socketConnection);
