import React, {useEffect} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Header from '../../components/header';
import {Spacings} from '../../common/foundation';
import ThirdCard from '../../components/thirdCard';
import styles from './styles';
import {getCategories} from '../../redux/actions/categoryActions';
import {RootState, store} from '../../redux/store';
import CustomActivityIndicator from '../../components/activityIndication';
import i18n from '../../../i18next';
import {useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../navigation/stack/mainStack/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Categories = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const {t} = useTranslation();
  const {categories, isLoadingCategories} = useSelector(
    (state: RootState) => state.categoryReducer,
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <View style={styles.main}>
      <Header circleCount={Spacings.bigCircleCount + 2} />

      {isLoadingCategories ? (
        <View style={styles.body}>
          <CustomActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          renderItem={({item, index}) => (
            <ThirdCard
              name={i18n.language == 'ar' ? item?.name?.ar : item?.name?.en}
              onPress={() => navigation.navigate('CategoryProducts')}
            />
          )}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'space-evenly',
            marginVertical: Spacings.wSpace10,
          }}
        />
      )}
    </View>
  );
};

export default Categories;
