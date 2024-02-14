import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, Pressable, TouchableOpacity, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, Sizing, Spacings, Typography} from '../../common/foundation';
import Zigzag from '../../common/zigzag';
import Back from '../back';
import CustomInput from '../customInput';
import {ICustomInputProps} from '../models';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = (props: ICustomInputProps) => {
  const {circleCount, children, isBack} = props;
  const {t} = useTranslation();
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.primary,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 4,
          paddingVertical: Spacings.hSpace10,
          paddingHorizontal: Spacings.wSpace8,
          flexDirection: 'row',
        }}>
        {children ? (
          children
        ) : (
          <>
            {isBack ? (
              <>
                <Back color={Colors.secondary} />
                <View style={{width: Spacings.wSpace9}} />
              </>
            ) : null}

            <CustomInput
              circleCount={
                isBack
                  ? Spacings.smallCircleCount
                  : Spacings.smallCircleCount + 2
              }
              backgroundColor={Colors.secondary}
              color={Colors.primary}
              placeholder={t('common.search')}
              circleSize={
                isBack
                  ? Spacings.circleTinySize
                  : Spacings.circleTinySize * 1.04
              }
              //value={email}
              //onChangeText={(txt: any) => setEmail(txt)}
              textContentType="name"
              leftIcon={focused => (
                <AntDesign
                  name={'search1'}
                  color={Colors.primary}
                  size={Sizing.icon}
                />
              )}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
