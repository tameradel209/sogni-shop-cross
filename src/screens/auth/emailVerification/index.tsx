import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {toDoAsync} from '../logic';
import CodeVerification from '../../../components/codeVerification';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../navigation/stack/authStack/types';
import {RootState} from '../../../redux/store';
import {signup, verifyAccount} from '../../../redux/actions/authActions';
import {ErrorAnimation} from '../../../common/functions';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {Colors} from '../../../common/foundation';
const EmailVerification = () => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [timerCount, setTimer] = useState(59);
  const [loading, setLoading] = useState(false);
  const {credintials, isLoadingCode} = useSelector(
    (state: RootState) => state.authReducer,
  );
  const codeRef = useRef<TextInput[]>([]);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const translateX = useSharedValue(0);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  useEffect(() => {
    codeRef.current[0].focus();
  }, []);

  useEffect(() => {
    if (code.indexOf('') == -1 && code.length != 0) {
      Keyboard.dismiss();
      onVerify();
    }
  }, [code]);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const onChange = (txt: never, i: number) => {
    let location = i;
    let temp = [...code];
    if (txt != '' && i < 5) {
      location = i + 1;
      temp[location] = '';
    } else if (txt == '' && i > 0) {
      location = i - 1;
    }
    codeRef.current[location].focus();
    temp[i] = txt;
    setCode(temp);
  };

  const onVerify = () => {
    dispatch(
      verifyAccount({
        code: code.join(''),
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
  };

  const resend = () => {
    timerCount <= 0
      ? dispatch(
          signup({
            data: credintials,
            callback: () => ErrorAnimation(translateX),
            toVerifyUser: () => null,
          }),
        )
      : null;
  };

  const errorStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  }, []);

  return (
    <CodeVerification
      ref={codeRef}
      onChange={onChange}
      header="Sogni Shop"
      subHeader={t('emailCode.header')}
      title={t('emailCode.title')}
      titleValue={credintials?.username}
      timerTitle={t('emailCode.timerTitle')}
      loading={isLoadingCode}
      onResendCode={resend}
      verifyTitle={t('emailCode.verify')}
      onVerify={onVerify}
      goBackTitle={t('emailCode.anotherEmail')}
      onGoBack={() => navigation.goBack()}
      code={code}
      timerCount={timerCount}
      goBackButtonTitle={t('emailCode.goBack')}
      errorStyle={errorStyle}
      timerCountStyle={timerCount > 0 ? {color: Colors.grey} : null}
    />
  );
};

export default EmailVerification;
