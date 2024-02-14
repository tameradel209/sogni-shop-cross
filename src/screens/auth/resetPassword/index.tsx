import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import CustomButton from '../../../components/customButton';
import CustomInput from '../../../components/customInput';
import {Colors, Sizing, Spacings, Typography} from '../../../common/foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {toDoAsync} from '../logic';
import AuthView from '../../../common/authView';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../navigation/stack/authStack/types';

const ResetPassword = () => {
  const [eyeShow, setEyeShow] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordA, setPasswordA] = useState('');
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
          {t('resetPassword.header')}
        </Text>
        <View style={styles.centerContainer}>
          <View style={styles.margin}>
            <Text style={Typography.smallText}>
              {t('resetPassword.newPassword')}
            </Text>
            <CustomInput
              circleCount={Spacings.smallCircleCount}
              backgroundColor={Colors.secondary}
              color={Colors.primary}
              placeholder={t('resetPassword.enterPassword')}
              value={password}
              onChangeText={(txt: any) => setPassword(txt)}
              secureTextEntry={eyeShow}
              rightIcon={() => (
                <Entypo
                  name={eyeShow ? 'eye-with-line' : 'eye'}
                  color={Colors.primary}
                  size={Sizing.smallIcon}
                  onPress={() => setEyeShow(!eyeShow)}
                />
              )}
              textContentType="password"
            />
          </View>

          <View style={styles.margin}>
            <Text style={Typography.smallText}>
              {t('resetPassword.newPassword')}
            </Text>
            <CustomInput
              circleCount={Spacings.smallCircleCount}
              backgroundColor={Colors.secondary}
              color={Colors.primary}
              placeholder={t('resetPassword.enterPasswordAgain')}
              value={passwordA}
              onChangeText={(txt: any) => setPasswordA(txt)}
              secureTextEntry={eyeShow}
              rightIcon={() => (
                <Entypo
                  name={eyeShow ? 'eye-with-line' : 'eye'}
                  color={Colors.primary}
                  size={Sizing.smallIcon}
                  onPress={() => setEyeShow(!eyeShow)}
                />
              )}
              textContentType="password"
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.margin}>
            <CustomButton
              onPress={() => toDoAsync('signin', load => setLoading(load))}
              circleCount={Spacings.smallCircleCount}
              loading={loading}
              title={t('resetPassword.confirm')}
              backgroundPressedInColor={Colors.secondary}
              backgroundPressedOutColor={Colors.third}
            />
          </View>

          <View style={styles.margin}>
            <CustomButton
              onPress={() => navigation.navigate('Signin')}
              circleCount={Spacings.smallCircleCount}
              title={t('resetPassword.cancel')}
              backgroundPressedInColor={Colors.third}
              backgroundPressedOutColor={Colors.secondary}
            />
          </View>
        </View>
      </View>
    </AuthView>
  );
};

export default ResetPassword;
