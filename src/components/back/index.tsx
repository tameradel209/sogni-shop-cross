import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable} from 'react-native';
import {Colors, Sizing} from '../../common/foundation';
import {ICustomInputProps} from '../models';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import i18n from '../../../i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../navigation/stack/mainStack/types';

const Back = (props: ICustomInputProps) => {
  const {color} = props;
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <AntDesign
        name={i18n.language == 'ar' ? 'arrowright' : 'arrowleft'}
        color={color ?? Colors.black}
        size={Sizing.icon}
      />
    </Pressable>
  );
};

export default Back;
