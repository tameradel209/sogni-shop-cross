import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useRef,
} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import CustomInput from '../../components/customInput';
import {Spacings, Colors, Sizing, Typography} from '../../common/foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RootState, store} from '../../redux/store';
import {IMessage} from '../../config/models';
import SocketIO from '../../config/socket';
import {getMessages} from '../../redux/actions/chatActions';
import Header from '../../components/header';
import {
  addChannelToChat,
  addMessage,
  addMessageReceived,
  clearChat,
} from '../../redux/slices/chatSlice';
import CustomActivityIndicator from '../../components/activityIndication';
import styles from './styles';
import NetInfo from '@react-native-community/netinfo';
import {getId, getTime} from '../../config/helpers/date';
import MessageItem from '../../components/chat';
import Zigzag from '../../common/zigzag';
import {height, width} from '../../config/helpers/thresholds';
import messaging from '@react-native-firebase/messaging';
import {showHintMessage} from '../../redux/slices/hintMessage';
import {MESSAGE, GOTOMESSAGES} from '../../redux/constants';
import {useNavigation} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabsParamList} from '../../navigation/bottom/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../navigation/stack/mainStack/types';
import {getChannels} from '../../redux/actions/channelsActions';
import {chooseChannel} from '../../redux/slices/channelsSlice';

const Channels = props => {
  const [text, setText] = useState('');
  const dispatch = useDispatch<typeof store.dispatch>();
  const {userData} = useSelector((state: RootState) => state.authReducer);
  const {channels, isLoadingChannels} = useSelector(
    (state: RootState) => state.channelsReducer,
  );
  const {channelId} = useSelector((state: RootState) => state.chatReducer);
  const flatListRef = useRef<FlatList>();
  /*   const channels = [
    {
      id: '12345678',
      messages: ['12345', '12345', '12345', '12345'],
      user: '12345',
      store: '1234',
    },
    {
      id: '12355678',
      messages: ['12345', '12345', '12345', '12345'],
      user: '12345',
      store: '1234',
    },
  ]; */
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  useEffect(() => {
    dispatch(getChannels(null));
  }, []);

  const keyExtractor = useCallback((item, index) => item.id, []);
  const renderMessages = useCallback(({item, index}) => {
    //return <MessageItem item={item} index={index} />;
    return (
      <TouchableOpacity
        onPress={() => {
          if (channelId != item._id) {
            console.log('we entered channelId', channelId, ' ', item._id);
            dispatch(chooseChannel(item));
            dispatch(addChannelToChat(item._id));
            return navigation.navigate('Chat', {fire: true});
          }
          navigation.navigate('Chat');
        }}>
        <View style={styles.main}>
          <Zigzag
            circleCount={Spacings.bigCircleCount + 2}
            color={Colors.secondary}
            circleSize={Spacings.circleBigSize}
            shring={-Spacings.hSpace8}
          />

          <View style={styles.inner}>
            <View>
              <Text style={Typography.header6}>{item?.user?.fullname}</Text>
              <Text style={Typography.header7}>{item.store}</Text>
            </View>
            <View style={styles.unread}>
              <Text style={{color: Colors.secondary}}>{'3'}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.forth}}>
      <Header
        height={Spacings.hSpace2}
        circleCount={Spacings.bigCircleCount + 2}>
        <Text style={[Typography.header6, {color: Colors.white}]}>
          {'Chats'}
        </Text>
      </Header>
      <FlatList
        ref={flatListRef}
        data={channels}
        renderItem={renderMessages}
        keyExtractor={keyExtractor}
        //inverted
        //onEndReached={fetchMessages}
        //onEndReachedThreshold={0.3}
        ListHeaderComponent={
          isLoadingChannels ? <CustomActivityIndicator /> : null
        }
        // onScroll={e => {
        //   !showGoDown && e.nativeEvent.contentOffset.y > height * 0.6
        //     ? setShowGoDown(true)
        //     : showGoDown && e.nativeEvent.contentOffset.y < height * 0.6
        //     ? setShowGoDown(false)
        //     : null;
        //   console.log('event==', e.nativeEvent.contentOffset.y, height * 0.6);
        // }}
      />
    </View>
  );
};

export default Channels;
