import React, {useEffect} from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import AuthStack from './stack/authStack';
import {RootState} from '../redux/store';
import {useSelector} from 'react-redux';
import MainStack from './stack/mainStack';
import HintMessage from '../common/HintMessage';

const navigationRef = createNavigationContainerRef();

const RootNavigator = () => {
  const {userData} = useSelector((state: RootState) => state.authReducer);

  return (
    <NavigationContainer ref={navigationRef}>
      {userData ? <MainStack /> : <AuthStack />}
      <HintMessage />
    </NavigationContainer>
  );
};

export default RootNavigator;
