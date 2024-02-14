import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/home';
import Chat from '../../screens/chat';
import Bascket from '../../screens/bascket';
import Categories from '../../screens/categories';
import Profile from '../../screens/profile';
import {useTranslation} from 'react-i18next';
import Zigzag from '../../common/zigzag';
import {Colors, Sizing} from '../../common/foundation';
import {Spacings} from '../../common/foundation';
import {width} from '../../config/helpers/thresholds';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, store} from '../../redux/store';
import {clearChat} from '../../redux/slices/chatSlice';
import {getMessages} from '../../redux/actions/chatActions';
import {BottomTabsParamList} from './types';

const MyTabBar = ({state, descriptors, navigation}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          height: Spacings.circleBigSize * 2 + Spacings.hSpace10,
        }}>
        <Zigzag
          circleCount={Spacings.bigCircleCount + 2}
          color={Colors.primary}
          circleSize={Spacings.circleBigSize}
          shring={-Spacings.hSpace10}
        />
        {state.routes.map(
          (route: {key: number; name: string}, index: number) => {
            const isFocused = state.index === index;
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const icon =
              route.name == 'Bascket' ? (
                <MaterialCommunityIcons
                  name="basket-fill"
                  size={Sizing.icon}
                  color={isFocused ? Colors.secondary : Colors.forth}
                />
              ) : route.name == 'Categories' ? (
                <MaterialCommunityIcons
                  name="format-list-group"
                  size={Sizing.icon}
                  color={isFocused ? Colors.secondary : Colors.forth}
                />
              ) : route.name == 'Home' ? (
                <MaterialCommunityIcons
                  name="home-lightning-bolt-outline"
                  size={Sizing.icon}
                  color={isFocused ? Colors.secondary : Colors.forth}
                />
              ) : route.name == 'Chat' ? (
                <MaterialCommunityIcons
                  name="chat-processing"
                  size={Sizing.icon}
                  color={isFocused ? Colors.secondary : Colors.forth}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account"
                  size={Sizing.icon}
                  color={isFocused ? Colors.secondary : Colors.forth}
                />
              );

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({name: route.name, merge: true});
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {options.tabBarIcon}
                {icon}
                <Text
                  style={{
                    color: isFocused ? Colors.secondary : Colors.forth,
                    fontSize: Spacings.wSpace8,
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          },
        )}
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabs = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const {t} = useTranslation();
  const {userData} = useSelector((state: RootState) => state.authReducer);
  //const {chat} = useSelector((state: RootState) => state.chatReducer);
  //const flatListRef = useRef<FlatList>();
  //const ChatWithRefrence = props => <Chat {...props} ref={flatListRef} />;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={MyTabBar}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}>
      <Tab.Screen name="Bascket" component={Bascket} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="Home" component={Home} />
      {userData ? (
        <Tab.Screen
          // listeners={{
          //   tabPress: e => {
          //     //e.preventDefault();
          //     chat.length > 0
          //       ? flatListRef.current?.scrollToIndex({animated: true, index: 0})
          //       : null;
          //     dispatch(clearChat(null));
          //     dispatch(getMessages(null));
          //   },
          // }}
          name="Chat"
          component={Chat}
        />
      ) : null}
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
