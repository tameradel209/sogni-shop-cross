import React, {useState, useEffect} from 'react';
import {
  useColorScheme,
  View,
  NativeModules,
  Platform,
  ActivityIndicator,
  ScrollView,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {width} from '../../config/helpers/thresholds';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {setIsLoading, signout} from '../../redux/slices/authSlice';
import Screen from '../../common/screen';
import CustomButton from '../../components/customButton';
import {Spacings, Colors, Typography} from '../../common/foundation';
import ZigzagSquareShape from '../../common/zigzagSquareShape';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {showHintMessage} from '../../redux/slices/hintMessage';
import {SUCCESS} from '../../redux/constants';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/stack/authStack/types';
import {RootState} from '../../redux/store';
import { testConnection } from '../../common/functions';
const Home = () => {
  const opacity = useSharedValue(0);
  const [text, setText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {userData, keepMeSignIn, isLoading} = useSelector(
    (state: RootState) => state.authReducer,
  );
  const {widthThreshold} = useSelector(state => state.imediateReducer);
  const locale =
    Platform.OS == 'android'
      ? NativeModules.I18nManager.localeIdentifier
      : NativeModules.SettingsManager.settings.AppleLocale;

  const onSignOut = () => {
    dispatch(signout());
    dispatch(
      showHintMessage({
        title: 'Log out success',
        body: 'Success Log out',
        type: SUCCESS,
      }),
    );
  };

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: opacity.value}],
    };
  }, []);

  type contextType = {
    translateY: number;
  };
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    contextType
  >({
    onStart: (event, context) => {
      console.log(event.translationY);
      context.translateY = opacity.value;
    },
    onActive: (event, context) => {
      console.log(event.translationY);
      opacity.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      console.log('kjhg');
    },
  });

  useEffect(() => {
    testConnection()
    isLoading ? dispatch(setIsLoading(false)):null
  }, [])
  
  return (
    <Screen>
      <View
        style={{
          flex: 1,
          padding: Math.ceil(width * 0.04),
        }}>
        <Text>{t('common.welcome')}</Text>
        {userData ? (
          <CustomButton
            onPress={onSignOut}
            circleCount={Spacings.smallCircleCount}
            loading={isLoading}
            title={t('common.signout')}
            backgroundPressedInColor={Colors.secondary}
            backgroundPressedOutColor={Colors.third}
          />
        ) : null}
        <GestureHandlerRootView style={{flex: 1}}>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View
              style={[
                {width: 100, height: 100, backgroundColor: '#fff'},
                reanimatedStyle,
              ]}
            />
          </PanGestureHandler>
        </GestureHandlerRootView>
      </View>
    </Screen>
  );
};

export default Home;
