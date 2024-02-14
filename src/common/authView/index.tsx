import React from 'react';
import {
  View,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import IMAGES from '../images';
import {styles} from './styles';
const AuthView = (props: any) => {
  const {children} = props;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.authContainer}>
      <Image
        source={IMAGES.signinBg}
        resizeMode="stretch"
        style={styles.overlay}
      />
      <View style={styles.innerContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthView;
