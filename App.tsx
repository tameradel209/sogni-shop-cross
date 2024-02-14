import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {persistor, socketConnection, store} from './src/redux/store';
import {Provider} from 'react-redux';
import i18next from './i18next';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './src/navigation';
import HintMessage from './src/common/HintMessage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  getFCMToken,
  notificationListner,
  requestUserPermission,
} from './src/config/helpers/notifications';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    notificationListner();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar translucent backgroundColor="transparent" />
        <GestureHandlerRootView style={{flex: 1}}>
          <RootNavigator />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
