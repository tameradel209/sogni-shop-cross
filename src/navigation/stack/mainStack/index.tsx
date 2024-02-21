import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamList} from './types';
import Map from '../../../screens/map';
import BottomTabs from '../../bottom';
import CategoryProducts from '../../../screens/categoryProducts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Channels from '../../../screens/channels';
import Chat from '../../../screens/chat';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  const {userData} = useSelector((state:RootState) => state.authReducer)
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Map" component={userData.store ?BottomTabs: Map} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
    </Stack.Navigator>
  );
};

export default MainStack;
