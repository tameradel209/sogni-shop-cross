/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {store} from './src/redux/store';
import SocketIO from './src/config/socket';
import {addMessageReceived} from './src/redux/slices/chatSlice';

const socketServices = new SocketIO();
const {userData} = store.getState().authReducer;

messaging().setBackgroundMessageHandler(async remoteMessage => {
  const message = JSON.parse(remoteMessage.data?.res);
  if (message?.status == 1 && message?.senderId != userData?._id) {
    console.log('received from index');
    socketServices.socket.emit('chat_message', {...message, status: 2});
  }
  store.dispatch(addMessageReceived(message));
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
