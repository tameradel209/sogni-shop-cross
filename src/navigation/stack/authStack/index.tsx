import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signin from '../../../screens/auth/signin';
import Signup from '../../../screens/auth/signup';
import PhoneVerification from '../../../screens/auth/phoneVerification';
import ForgetPassword from '../../../screens/auth/forgetPassword';
import EmailVerification from '../../../screens/auth/emailVerification';
import ResetPassword from '../../../screens/auth/resetPassword';
import {AuthStackParamList} from './types';
import Map from '../../../screens/map';
import BottomTabs from '../../bottom';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="MapForAuth" component={Map} />
      <Stack.Screen name="BottomTabsForAuth" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default AuthStack;
