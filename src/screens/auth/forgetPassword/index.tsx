import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import CustomButton from '../../../components/customButton';
import CustomInput from '../../../components/customInput';
import {Colors, Spacings, Typography} from '../../../common/foundation';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {toDoAsync} from '../logic';
import i18n from 'i18next';
import AuthView from '../../../common/authView';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../navigation/stack/authStack/types';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  return (
    <AuthView>
      <View style={styles.container}>
        <Text style={[Typography.headerBold, styles.headerText]}>
          Sogni Shop
        </Text>
        <Text style={[Typography.header4, styles.subHeaderText]}>
          {t('forgetPassword.header')}
        </Text>
        <View style={styles.centerContainer}>
          <Text style={Typography.smallText}>{t('forgetPassword.email')}</Text>
          <CustomInput
            circleCount={Spacings.smallCircleCount}
            backgroundColor={Colors.secondary}
            color={Colors.primary}
            placeholder={t('forgetPassword.enterEmail')}
            value={email}
            onChangeText={(txt: any) => setEmail(txt)}
            textContentType="emailAddress"
          />
        </View>

        <View style={styles.bottomContainer}>
          <CustomButton
            onPress={() =>
              toDoAsync('SendEmailCode', load => {
                setLoading(load);
              }).then(() => navigation.navigate('EmailVerification'))
            }
            circleCount={Spacings.smallCircleCount}
            loading={loading}
            title={t('forgetPassword.sendCode')}
            backgroundPressedInColor={Colors.secondary}
            backgroundPressedOutColor={Colors.third}
          />
          <View style={[styles.signupContainer, {flexDirection: 'row'}]}>
            <Text style={Typography.tinyText}>
              {t('forgetPassword.rememberPassword')}{' '}
            </Text>
            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={Spacings.hSpace10}>
              <Text
                style={[
                  Typography.boldTinyText,
                  {textDecorationLine: 'underline'},
                ]}>
                {t('forgetPassword.signin')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </AuthView>
  );
};

export default ForgetPassword;
