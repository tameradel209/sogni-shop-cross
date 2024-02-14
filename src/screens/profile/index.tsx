import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Header from '../../components/header';
import {Spacings} from '../../common/foundation';
import HalfCard from '../../components/halfCard';
import styles from './styles';
import {getCategories} from '../../redux/actions/categoryActions';
import {store} from '../../redux/store';

const Profile = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const {t} = useTranslation();

  return (
    <View style={styles.main}>
      <Header circleCount={Spacings.bigCircleCount + 2} />
      <FlatList
        data={Array.from([...Array(10).keys()])}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({item, index}) => <HalfCard />}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'space-around',
          marginHorizontal: Spacings.wSpace9,
          marginVertical: Spacings.wSpace10,
        }}
      />
    </View>
  );
};

export default Profile;
