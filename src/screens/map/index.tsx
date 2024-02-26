import React, {useState, useEffect, useRef} from 'react';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import {
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
  TextInputProps,
  Alert,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import {height, width} from '../../config/helpers/thresholds';
import axios from 'axios';
import MapSearch from '../../components/MapSearch';
import {Colors, Typography} from '../../common/foundation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/stack/authStack/types';
import {useDispatch, useSelector} from 'react-redux';
import {getStores} from '../../redux/actions/storesActions';
import {RootState, store} from '../../redux/store';
import {chooseStore} from '../../redux/slices/storesSlice';
import styles from './styles';
import CustomActivityIndicator from '../../components/activityIndication';
import {addChannelToChat} from '../../redux/slices/chatSlice';

const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.155 * ASPECT_RATIO;
const LON_DELTA = 0.155 * ASPECT_RATIO;

const Map = () => {
  console.log('rendering from Map');
  const {userData} = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch<typeof store.dispatch>();
  const ref = useRef<TextInputProps>(null);
  const map = useRef(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {stores, isLoadingStores} = useSelector(
    (state: RootState) => state.storesReducer,
  );
  const [isSelectedNewLocation, setIsSelectedNewLocation] = useState(false);
  const [region, setRegion] = useState({
    latitude: 24.77154271444637,
    longitude: 46.67404890403617,
    latitudeDelta: LAT_DELTA,
    longitudeDelta: LON_DELTA,
  });
  const [locationUser, setLocationUser] = useState({});

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      async info => {
        dispatch(
          getStores({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          }),
        );
        console.log('location', info);
        Geocoder.init(process.env.GOOGLE_MAPS_APIKEY);
        let json = await Geocoder.from(
          info.coords.latitude,
          info.coords.longitude,
        );
        setLocationUser({
          latitude: Math.round(info.coords.latitude * 100) / 100,
          longitude: Math.round(info.coords.longitude * 100) / 100,
          address: json.results[0].formatted_address,
        });

        setRegion({
          latitude: parseFloat(Math.round(info.coords.latitude * 100) / 100),
          longitude: parseFloat(Math.round(info.coords.longitude * 100) / 100),
          latitudeDelta: LAT_DELTA,
          longitudeDelta: LON_DELTA,
        });
      },
      error => {
        Alert.alert('Location is required', error?.message, [
          {
            text: 'allow',
            onPress: () => getLocation(),
          },
        ]);
        console.log(JSON.stringify(error));
      },
    );
  };

  const search = (location, details = null) => {
    console.log('searching map', location);
    axios
      .get(
        'https://maps.googleapis.com/maps/api/place/details/json?placeid=' +
          location.place_id +
          '&key=' +
          process.env.GOOGLE_MAPS_APIKEY,
      )
      .then(data => {
        setLocationUser({
          address: data.data.result.formatted_address,
          latitude: data.data.result.geometry.location.lat,
          longitude: data.data.result.geometry.location.lng,
        });

        setRegion({
          latitude: data.data.result.geometry.location.lat,
          longitude: data.data.result.geometry.location.lng,
          latitudeDelta: LAT_DELTA,
          longitudeDelta: LON_DELTA,
        });
        //sheetRef.current.close();
      });
  };

  const onRegionChangeComplete = (e: any) => {
    setRegion({
      latitude: e.latitude,
      longitude: e.longitude,
      latitudeDelta: e.latitudeDelta,
      longitudeDelta: e.longitudeDelta,
    });
    if (e.latitude != region.latitude && e.longitude != region.longitude) {
      setIsSelectedNewLocation(true);
    }
  };
  return (
    <TouchableWithoutFeedback
      disabled={!ref.current?.isFocused()}
      onPress={() => {
        ref.current?.blur();
      }}>
      <View style={{flex: 1}}>
        <MapView
          ref={map}
          provider={
            Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          scrollEnabled
          style={{flex: 1}}
          region={region}
          onRegionChangeComplete={onRegionChangeComplete}
          showsUserLocation={true}>
          {stores.length > 0
            ? stores.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={marker?.location}
                  title={marker?.title}
                  description={marker?.description}
                  onPress={() => {
                    console.log('store in the map', marker);
                    dispatch(chooseStore(marker));
                    dispatch(addChannelToChat(marker._id));
                    navigation.navigate(
                      userData ? 'BottomTabs' : 'BottomTabsForAuth',
                    );
                  }}
                  pinColor={Colors.white}
                  // image={IMAGES.twitter}
                >
                  <Text style={{backgroundColor: 'red'}}>{marker?.name}</Text>
                </Marker>
              ))
            : null}
        </MapView>
        <View style={styles.searchView}>
          <MapSearch ref={ref} searchHandler={search} />
        </View>
        {isLoadingStores ? (
          <View style={styles.loadingView}>
            <CustomActivityIndicator />
            <Text style={Typography.header8}>Loaging...</Text>
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Map;
