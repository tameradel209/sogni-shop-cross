import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {toDoAsync} from '../logic';
import CodeVerification from '../../../components/codeVerification';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../navigation/stack/authStack/types';

const PhoneVerification = () => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [timerCount, setTimer] = useState(59);
  const [loading, setLoading] = useState(false);
  const codeRef = useRef<TextInput[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    codeRef.current[0].focus();
  }, []);

  useEffect(() => {
    if (code.indexOf('') == -1 && code.length != 0) {
      Keyboard.dismiss();
      toDoAsync('Your Phone Number Verified', load => setLoading(load));
    }
    console.log(code);
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
    console.log(code.indexOf(''));
    console.log(i);
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

  return (
    <CodeVerification
      ref={codeRef}
      onChange={onChange}
      header="Sogni Shop"
      subHeader={t('phoneCode.header')}
      title={t('phoneCode.title')}
      titleValue={'0123456789'}
      timerTitle={t('phoneCode.timerTitle')}
      loading={loading}
      onResendCode={() => console.log('resend the code')}
      verifyTitle={t('phoneCode.verify')}
      onVerify={() =>
        toDoAsync('Verify Your Phone Number', load => setLoading(load))
      }
      goBackTitle={t('phoneCode.anotherPhone')}
      onGoBack={() => navigation.goBack()}
      code={code}
      timerCount={timerCount}
      goBackButtonTitle={t('phoneCode.goBack')}
    />
  );
};

export default PhoneVerification;
