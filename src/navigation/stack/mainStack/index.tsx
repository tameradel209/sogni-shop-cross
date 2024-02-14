import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamList} from './types';
import Map from '../../../screens/map';
import BottomTabs from '../../bottom';
import CategoryProducts from '../../../screens/categoryProducts';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
    </Stack.Navigator>
  );
};

export default MainStack;
