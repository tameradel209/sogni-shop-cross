import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, I18nManager, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import CustomButton from '../../../components/customButton';
import CustomInput from '../../../components/customInput';
import {Colors, Sizing, Spacings, Typography} from '../../../common/foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {setLanguage} from '../../../redux/slices/authSlice';
import AuthView from '../../../common/authView';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../navigation/stack/authStack/types';
import {RootState, store} from '../../../redux/store';
import RNRestart from 'react-native-restart';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  ErrorAnimation,
  passwordValidation,
  testConnection,
  userNameValidation,
} from '../../../common/functions';
import {signin} from '../../../redux/actions/authActions';
import {setIsLoading} from '../../../redux/slices/authSlice'
import {getFCMToken} from '../../../config/helpers/notifications';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo'
import i18next from '../../../../i18next'
const Signin = () => {
  const [keepMeSignIn, setKeepMeSignIn] = useState<boolean>(false);
  const [eyeShow, setEyeShow] = useState<boolean>(true);
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userNameError, setUserNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const {isLoading} = useSelector((state: RootState) => state.authReducer);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch<typeof store.dispatch>();
  const {t} = useTranslation();

  const translateX = useSharedValue(0);

  const onSignIn = () => {
    
    const isUsernameValid = userNameValidation(
      username,
      setUserName,
      setUserNameError,
    );
    const isPasswordValid = passwordValidation(
      password,
      setPassword,
      setPasswordError,
    );
    password ? null : setPasswordError('password is required')
    if (isUsernameValid && password) {
      
      NetInfo.fetch().then(async state =>  {
        
        if(state.isConnected){
          const fcmTokenOld = await AsyncStorage.getItem('fcmToken');
          const fcmTokenNew = await messaging().getToken().then(tok => {
            console.log(`firebase messaging token`, tok)
            return tok
          }).catch(err => {
            console.log(`firebase messaging token failed`, err.message)
            return null
          });
          dispatch(
            signin({
              data: {
                password,
                username: username.toLowerCase(),
                fcmTokenOld,
                fcmTokenNew,
              },
              keepMeSignIn,
              callback: () => {
                const options = {
                  enableVibrateFallback: true,
                  ignoreAndroidSystemSettings: true,
                };
                ReactNativeHapticFeedback.trigger('notificationError', options);
                ErrorAnimation(translateX);
              },
            }),
          );
        }else{
          Alert.alert('Conncetion Error', 'You Are Not Connected To The Internet')
        }
      })
    } else {
      ErrorAnimation(translateX);
      const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
      };
      ReactNativeHapticFeedback.trigger('impactLight', options);
    }
  };

  const errorStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  }, []);

  useEffect(() =>{
    isLoading ? dispatch(setIsLoading(false)):null
  }, [])

  return (
    <AuthView>
      <Text style={[Typography.headerBold, styles.headerText]}>Sogni Shop</Text>
      <Text style={[Typography.header4, styles.subHeaderText]}>
        {t('signin.header')}
      </Text>
      <View style={styles.margin}>
        <Text style={Typography.smallText}>{t('signin.email')}</Text>
        <CustomInput
          circleCount={Spacings.smallCircleCount}
          backgroundColor={Colors.secondary}
          color={Colors.primary}
          placeholder={t('signin.enterEmail')}
          value={username}
          onChangeText={text =>
            userNameError ? userNameValidation(username, setUserName, setUserNameError, text) : setUserName(text)
          }
          textContentType="emailAddress"
          errorMessage={userNameError}
        />
      </View>

      <View style={styles.margin}>
        <Text style={Typography.smallText}>{t('signin.password')}</Text>
        <CustomInput
          circleCount={Spacings.smallCircleCount}
          backgroundColor={Colors.secondary}
          color={Colors.primary}
          placeholder={t('signin.enterPassword')}
          value={password}
          onChangeText={text =>{
            setPassword(text)
            text ? setPasswordError(null):setPasswordError('password is required')
          }}
          textContentType="password"
          secureTextEntry={eyeShow}
          rightIcon={() => (
            <Entypo
              name={eyeShow ? 'eye-with-line' : 'eye'}
              color={Colors.primary}
              size={Sizing.icon}
              onPress={() => setEyeShow(!eyeShow)}
            />
          )}
          errorMessage={passwordError}
        />
      </View>

      <Pressable
        onPress={() => navigation.navigate('ForgetPassword')}
        hitSlop={Spacings.hSpace10}
        style={{
          alignSelf: 'flex-end',
        }}>
        <Text
          style={[Typography.boldTinyText, {textDecorationLine: 'underline'}]}>
          {t('signin.forgetPassword')}
        </Text>
      </Pressable>

      <View
        style={[
          styles.checkContainer,
          {
            flexDirection: 'row',
          },
        ]}>
        <MaterialCommunityIcons
          name={keepMeSignIn ? 'check-decagram' : 'check-decagram-outline'}
          color={keepMeSignIn ? Colors.third : Colors.forth}
          size={Sizing.icon}
          onPress={() => setKeepMeSignIn(!keepMeSignIn)}
        />
        <Text style={Typography.tinyText}>{t('signin.keepSignin')}</Text>
      </View>

      <Animated.View style={[styles.margin, errorStyle]}>
        <CustomButton
          onPress={onSignIn}
          circleCount={Spacings.smallCircleCount}
          loading={isLoading}
          title={t('signin.signin')}
          backgroundPressedInColor={Colors.secondary}
          backgroundPressedOutColor={Colors.third}
        />
      </Animated.View>

      <View
        style={[
          styles.signupContainer,
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>
        <Text style={Typography.tinyText}>{t('signin.haveNoAccount')} </Text>
        <Pressable
          onPress={() => navigation.navigate('Signup')}
          hitSlop={Spacings.hSpace10}>
          <Text
            style={[
              Typography.boldTinyText,
              {textDecorationLine: 'underline'},
            ]}>
            {t('signin.signup')}
          </Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => navigation.navigate('MapForAuth')}
        hitSlop={Spacings.hSpace10}>
        <Text
          style={[
            Typography.boldTinyText,
            {textDecorationLine: 'underline', alignSelf: 'center'},
          ]}>
          {t('signin.doLater')}
        </Text>
      </Pressable>
      <Pressable
        style={{margin: 10}}
        onPress={() => {
          console.log(i18next.language)
          dispatch(setLanguage(i18next.language === 'en' ? 'ar' : 'en'));
          i18next.changeLanguage(i18next.language === 'en' ? 'ar' : 'en');
          I18nManager.forceRTL(i18next.language !== 'en');
          RNRestart.Restart();
        }}>
        <Text style={{alignSelf: 'center'}}>
          {i18next.language === 'ar' ? 'English' : 'Arabic'}
        </Text>
      </Pressable>
    </AuthView>
  );
};

export default Signin;
