import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import CustomButton from '../../../components/customButton';
import CustomInput from '../../../components/customInput';
import {Colors, Sizing, Spacings, Typography} from '../../../common/foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {styles} from './styles';
import IMAGES from '../../../common/images';
import {toDoAsync} from '../logic';
import {useNavigation} from '@react-navigation/native';
import i18n from 'i18next';
import AuthView from '../../../common/authView';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../navigation/stack/authStack/types';
import {RootState, store} from '../../../redux/store';
import {
  ErrorAnimation,
  existValidation,
  passwordValidation,
  userNameValidation,
} from '../../../common/functions';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {signup} from '../../../redux/actions/authActions';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {getFCMToken} from '../../../config/helpers/notifications';
import NetInfo from '@react-native-community/netinfo';
import {setIsLoading} from '../../../redux/slices/authSlice';

const Signup = () => {
  const [eyeShow, setEyeShow] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [gender, setGender] = useState<0 | 1>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [termsConditions, setTermsConditions] = useState<boolean>(false);
  const {isLoading} = useSelector((state: RootState) => state.authReducer);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch<typeof store.dispatch>();
  const {t} = useTranslation();
  const translateX = useSharedValue(0);

  const onSignUp = async () => {
    const isUsernameValid = userNameValidation(email, setEmail, setEmailError);
    const isPasswordValid = passwordValidation(
      password,
      setPassword,
      setPasswordError,
    );
    const isFullName = existValidation(
      fullName,
      setFullName,
      setFullNameError,
      'full name',
    );
    const isAddress = existValidation(
      address,
      setAddress,
      setAddressError,
      'Address',
    );
    if (
      isUsernameValid &&
      isPasswordValid &&
      isFullName &&
      isAddress &&
      termsConditions
    ) {
      NetInfo.fetch().then(async state => {
        console.log('entered signup', state.isConnected);
        if (state.isConnected) {
          const fcmToken = await getFCMToken();
          dispatch(
            signup({
              data: {
                password,
                username: email.toLowerCase(),
                address,
                fullName,
                fcmToken,
              },
              callback: () => {
                const options = {
                  enableVibrateFallback: true,
                  ignoreAndroidSystemSettings: true,
                };
                ReactNativeHapticFeedback.trigger('notificationError', options);
                ErrorAnimation(translateX);
              },
              toVerifyUser: () => navigation.navigate('EmailVerification'),
            }),
          );
        } else {
          Alert.alert(
            'Conncetion Error',
            'You Are Not Connected To The Internet',
          );
        }
      });
    } else {
      console.log(
        'there is error sign up',
        isUsernameValid,
        isPasswordValid,
        isFullName,
        isAddress,
        termsConditions,
      );
      ErrorAnimation(translateX);
      const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      };
      ReactNativeHapticFeedback.trigger('impactLight', options);
    }
  };

  const errorStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  }, []);

  useEffect(() => {
    isLoading ? dispatch(setIsLoading(false)) : null;
  }, []);

  return (
    <AuthView>
      <Text style={[Typography.headerBold, styles.headerText]}>Sogni Shop</Text>
      <Text style={[Typography.header4, styles.subHeaderText]}>
        {t('signup.header')}
      </Text>

      <View style={styles.margin}>
        <Text style={Typography.smallText}>{t('signup.fullName')}</Text>
        <CustomInput
          circleCount={Spacings.smallCircleCount}
          backgroundColor={Colors.secondary}
          color={Colors.primary}
          placeholder={t('signup.enterFullName')}
          value={fullName}
          onChangeText={text =>
            existValidation(
              fullName,
              setFullName,
              setFullNameError,
              'full name',
              text,
            )
          }
          errorMessage={fullNameError}
        />
      </View>

      <View style={styles.margin}>
        <Text style={Typography.smallText}>{t('signup.address')}</Text>
        <CustomInput
          circleCount={Spacings.smallCircleCount}
          backgroundColor={Colors.secondary}
          color={Colors.primary}
          placeholder={t('signup.enterAddress')}
          value={address}
          onChangeText={text =>
            existValidation(
              address,
              setAddress,
              setAddressError,
              'address',
              text,
            )
          }
          errorMessage={addressError}
        />
      </View>

      <View style={styles.margin}>
        <Text style={Typography.smallText}>{t('signup.email')}</Text>
        <CustomInput
          circleCount={Spacings.smallCircleCount}
          backgroundColor={Colors.secondary}
          color={Colors.primary}
          placeholder={t('signup.email')}
          value={email}
          onChangeText={text =>
            userNameValidation(email, setEmail, setEmailError, text)
          }
          errorMessage={emailError}
        />
      </View>

      <View style={styles.margin}>
        <Text style={Typography.smallText}>{t('signup.password')}</Text>
        <CustomInput
          circleCount={Spacings.smallCircleCount}
          backgroundColor={Colors.secondary}
          color={Colors.primary}
          placeholder={t('signup.enterPassword')}
          value={password}
          onChangeText={text =>
            passwordValidation(password, setPassword, setPasswordError, text)
          }
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

      <View
        style={{
          flexDirection: 'row',
        }}>
        <Pressable
          style={[styles.checkContainer, {flexDirection: 'row'}]}
          onPress={() => setGender(0)}
          hitSlop={Spacings.hSpace10}>
          <MaterialCommunityIcons
            name={!gender ? 'check-decagram' : 'check-decagram-outline'}
            color={!gender ? Colors.third : Colors.forth}
            size={Sizing.icon}
          />
          <Text style={Typography.smallText}>{t('signup.male')}</Text>
        </Pressable>
        <Pressable
          style={[styles.checkContainer1, {flexDirection: 'row'}]}
          onPress={() => setGender(1)}
          hitSlop={Spacings.hSpace10}>
          <MaterialCommunityIcons
            name={gender ? 'check-decagram' : 'check-decagram-outline'}
            color={gender ? Colors.third : Colors.forth}
            size={Sizing.icon}
          />
          <Text style={Typography.smallText}>{t('signup.female')}</Text>
        </Pressable>
      </View>

      <Animated.View
        style={[
          styles.checkContainer,
          {flexDirection: 'row'},
          termsConditions ? null : errorStyle,
        ]}>
        <MaterialCommunityIcons
          name={termsConditions ? 'check-decagram' : 'check-decagram-outline'}
          color={termsConditions ? Colors.third : Colors.forth}
          size={Sizing.icon}
          onPress={() => setTermsConditions(!termsConditions)}
        />
        <Text style={Typography.tinyText}>{t('signup.accept')} </Text>
        <Pressable>
          <Text
            style={[
              Typography.boldTinyText,
              {textDecorationLine: 'underline'},
            ]}>
            {t('signup.termsConditions')}
          </Text>
        </Pressable>
      </Animated.View>

      <Animated.View
        style={[styles.margin, termsConditions ? errorStyle : null]}>
        <CustomButton
          onPress={onSignUp}
          circleCount={Spacings.smallCircleCount}
          title={t('signup.signup')}
          loading={isLoading}
          backgroundPressedInColor={Colors.secondary}
          backgroundPressedOutColor={Colors.third}
        />
      </Animated.View>

      <View style={[styles.signupContainer, {flexDirection: 'row'}]}>
        <Text style={Typography.tinyText}>{t('signup.haveAccount')} </Text>
        <Pressable
          disabled={isLoading}
          onPress={() => navigation.goBack()}
          hitSlop={Spacings.hSpace10}>
          <Text
            style={[
              Typography.boldTinyText,
              {textDecorationLine: 'underline'},
            ]}>
            {t('signup.signin')}
          </Text>
        </Pressable>
      </View>

      <ThirdPartySignup />
    </AuthView>
  );
};

const ThirdPartySignup = () => {
  return (
    <View
      style={[
        styles.thirdPartyContainer,
        {
          flexDirection: 'row',
        },
      ]}>
      <TouchableOpacity
        onPress={() => console.log('login with twitter')}
        style={styles.thirdParty}>
        <Image
          source={IMAGES.twitter}
          resizeMode="contain"
          style={styles.thirdPartyImage}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log('login with facebook')}
        style={styles.thirdParty}>
        <Image
          source={IMAGES.facebook}
          resizeMode="contain"
          style={styles.thirdPartyImage}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log('login with google')}
        style={styles.thirdParty}>
        <Image
          source={IMAGES.google}
          resizeMode="contain"
          style={styles.thirdPartyImage}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
