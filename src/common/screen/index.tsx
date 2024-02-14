import React from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
const Screen = props => {
  const {children} = props;
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default Screen;
