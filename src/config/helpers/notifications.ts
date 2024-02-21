import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../redux/store';
import {showHintMessage} from '../../redux/slices/hintMessage';
import {GOTOMESSAGES, MESSAGE} from '../../redux/constants';
import {editProfile} from '../../redux/actions/authActions';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  console.log(`+++++++++++++`, authStatus);
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const fcmTokenOld = await AsyncStorage.getItem('fcmToken');
    console.log(`eeeeeeeee`, messaging.AuthorizationStatus.AUTHORIZED);
    const fcmTokenNew = await messaging()
      .getToken()
      .then(tok => {
        console.log(`firebase messaging token`, tok);
        return tok;
      })
      .catch(err => {
        console.log(`firebase messaging token failed`, err.message);
        return null;
      });
    if (fcmTokenOld != fcmTokenNew) {
      store.dispatch(
        editProfile({
          fcmTokenOld,
          fcmTokenNew,
        }),
      );
    }
    console.log(
      'Authorization status:',
      authStatus,
      messaging.AuthorizationStatus.AUTHORIZED,
    );
  }
};

export const getFCMToken = () => {
  return AsyncStorage.getItem('fcmToken').then(fcmToken => {
    if (!fcmToken) {
      console.log('fcm from async storage');
      return messaging().getToken();
    } else {
      return fcmToken;
    }
  });
};

export const notificationListner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(remoteMessage => {
    store.dispatch(
      showHintMessage({
        title: remoteMessage?.data?.sender,
        body: remoteMessage?.data?.message,
        type: MESSAGE,
        onPress: GOTOMESSAGES, //navigation.navigate('Chat'),
      }),
    );
    console.log('notification in foreground state', remoteMessage);
  });
};
