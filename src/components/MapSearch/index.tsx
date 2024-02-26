import React, {useState, forwardRef} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Colors, Spacings} from '../../common/foundation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Zigzag from '../../common/zigzag';
import {TextInput} from 'react-native-gesture-handler';
import i18n from '../../../i18next';

const MapSearch = (
  {searchHandler}: {searchHandler: (location: any, details: any) => void},
  ref: TextInput,
) => {
  const [focused, setFocused] = useState(false);
  const {
    container,
    description,
    listView,
    row,
    poweredContainer,
    predefinedPlacesDescription,
    textInputContainer,
    separator,
    textInput,
  } = styles;
  const searchInputStyle = {
    container,
    description,
    listView,
    row,
    poweredContainer,
    predefinedPlacesDescription,
    textInputContainer,
    separator,
    textInput: {
      ...textInput,
      color: focused ? Colors.primary : Colors.forth,
    },
  };

  return (
    <View style={styles.main}>
      <Zigzag
        circleCount={Spacings.smallCircleCount}
        circleSize={Spacings.circleSmallSize}
        color={focused ? Colors.forth : Colors.primary}
      />
      <GooglePlacesAutocomplete
        textInputProps={{
          placeholderTextColor: focused ? Colors.primary : Colors.forth,
          onFocus: () => setFocused(true),
          onBlur: () => setFocused(false),
          ref,
        }}
        enableHighAccuracyLocation={true}
        styles={searchInputStyle}
        onPress={searchHandler}
        query={{
          key: process.env.GOOGLE_MAPS_APIKEY,
          language: i18n.language,
        }}
        placeholder={'Search places'}
      />
    </View>
  );
};

export default forwardRef(MapSearch);
