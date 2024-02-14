import React, {useState} from 'react';
import {
  useColorScheme,
  View,
  NativeModules,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {width} from '../../config/helpers/thresholds';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {signin} from '../../redux/slices/authSlice';
import CustomButton from '../../components/customButton';
import CustomInput from '../../components/customInput';
import {Spacings} from '../../common/foundation';
const Bascket = () => {
  const [text, setText] = useState('');

  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const {userData, keepMeSignIn, isLoading} = useSelector(
    state => state.authReducer,
  );

  const locale =
    Platform.OS == 'android'
      ? NativeModules.I18nManager.localeIdentifier
      : NativeModules.SettingsManager.settings.AppleLocale;

  const onPress = () => {
    dispatch(
      signin({
        data: {username: 'admin', password: 'password'},
        keepMeSignIn: true,
      }),
    );
    console.log(userData);
  };
  return (
    <View
      style={{
        flex: 1,
        padding: Math.ceil(width * 0.04),
      }}>
      {isLoading ? <ActivityIndicator size={'large'} /> : null}
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          padding: Math.ceil(width * 0.04),
        }}>
        <CustomInput
          placeholder="Enter Text"
          onChangeText={(txt: string) => setText(txt)}
          value={text}
          circleCount={Spacings.smallCircleCount}
        />
      </View>
    </View>
  );
};

export default Bascket;
