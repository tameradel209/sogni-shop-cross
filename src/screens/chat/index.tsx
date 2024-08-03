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
import {height} from '../../config/helpers/thresholds';
import messaging from '@react-native-firebase/messaging';
import {showHintMessage} from '../../redux/slices/hintMessage';
import {MESSAGE, GOTOMESSAGES} from '../../redux/constants';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabsParamList} from '../../navigation/bottom/types';
import Back from '../../components/back';
const socketServices = new SocketIO();

const Chat = ({props, route}) => {
  const [text, setText] = useState('');
  const [showGoDown, setShowGoDown] = useState(false);
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigation = useNavigation<BottomTabScreenProps<BottomTabsParamList>>();
  const {t, i18n} = useTranslation();
  const {userData} = useSelector((state: RootState) => state.authReducer);
  const {chat, channelId, isLast, isLoading, size} = useSelector(
    (state: RootState) => state.chatReducer,
  );
  const {storeSelected} = useSelector(
    (state: RootState) => state.storesReducer,
  );
  const {channelSelected} = useSelector(
    (state: RootState) => state.channelsReducer,
  );
  const flatListRef = useRef<FlatList>();
  console.log('here you go', channelId);
  const fetchMessages = () =>
    isLast || chat[channelId]?.length < size
      ? null
      : dispatch(getMessages(null));

  useFocusEffect(
    React.useCallback(() => {
      dispatch(clearChat(null));
      dispatch(getMessages());
      console.log('socket connected from the chat');

      socketServices.socket.on('connect', () => {
        chat[channelId]?.forEach((msg: IMessage) => {
          console.log('id@@@@', msg._id);
          msg?._id ? null : socketServices.socket.emit('chat_message', msg);
        });
      });
      socketServices.socket.on('chat_message', (msg: any) => {
        if (msg?.status == 1 && msg?.senderId != userData?._id) {
          console.log('received');
          socketServices.socket.emit('chat_message', {...msg, status: 2});
        }
        dispatch(addMessageReceived(msg));
      });

      //return () => unsubscribe();
    }, []),
  );

  useEffect(() => {}, [channelId]);

  /*   useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        socketServices.socket.on('connect', () => {
          // socketServices.socket.on('chat_message', (msg: any) => {
          //   if (msg?.status == 1 && msg?.senderId != userData?._id) {
          //     socketServices.socket.emit('chat_message', {
          //       ...msg,
          //       status: 2,
          //     });
          //   }
          //   store.dispatch(addMessageReceived(msg));
          // });
          chat.map(msg =>
            msg.status == 0
              ? socketServices.socket.emit('chat_message', msg)
              : console.log('message sent'),
          );
        });
      }
      console.log(
        'Connection type: ' +
          state.type +
          ', Is connected?: ' +
          state.isConnected,
      );
    });
  }, []); */

  const onSend = () => {
    console.log('selected=-=-=', storeSelected, channelSelected?.user);
    setText('');
    const date = new Date();
    const messageData: IMessage = {
      userId: userData.store ? channelSelected.user._id : userData._id,
      storeId: userData.store ? userData._id : storeSelected._id,
      senderId: userData._id,
      receiverId: userData.store ? channelSelected.user._id : storeSelected._id,
      message: text,
      type: 'TEXT',
      dateSent: date.toISOString(),
      status: 0,
      id: getId(),
    };
    dispatch(addMessage(messageData));
    socketServices.socket.emit('chat_message', messageData);
  };

  const keyExtractor = useCallback((item, index) => item.id, []);
  const renderMessages = useCallback(({item, index}) => {
    return <MessageItem item={item} index={index} />;
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Header
        height={Spacings.hSpace2}
        circleCount={Spacings.bigCircleCount + 2}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Back color={Colors.secondary} />
          <Text style={[Typography.header6, {color: Colors.white}]}>
            {userData.store
              ? channelSelected?.user?.fullname
              : storeSelected?.name}
          </Text>
          <View style={{width: Spacings.wSpace9}} />
        </View>
      </Header>
      <View style={{flex: 1, backgroundColor: Colors.forth}}>
        <FlatList
          ref={flatListRef}
          data={chat[channelId]}
          renderItem={renderMessages}
          keyExtractor={keyExtractor}
          inverted
          onEndReached={fetchMessages}
          onEndReachedThreshold={0.3}
          ListFooterComponent={isLoading ? <CustomActivityIndicator /> : null}
          onScroll={e => {
            !showGoDown && e.nativeEvent.contentOffset.y > height * 0.6
              ? setShowGoDown(true)
              : showGoDown && e.nativeEvent.contentOffset.y < height * 0.6
              ? setShowGoDown(false)
              : null;
            console.log('event==', e.nativeEvent.contentOffset.y, height * 0.6);
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: Spacings.hSpace8,
        }}>
        <CustomInput
          placeholder="Write A Message"
          onChangeText={(txt: string) => setText(txt)}
          value={text}
          circleCount={Spacings.smallCircleCount + 2}
          rightIcon={pressed =>
            text ? (
              <TouchableOpacity onPress={onSend}>
                <Ionicons
                  name="send"
                  color={pressed ? Colors.secondary : Colors.primary}
                  size={Sizing.icon}
                  style={{
                    transform: [{scaleX: i18n.language == 'ar' ? -1 : 1}],
                  }}
                />
              </TouchableOpacity>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={{marginRight: Spacings.wSpace9}}>
                  <Ionicons
                    name="camera"
                    color={pressed ? Colors.secondary : Colors.primary}
                    size={Sizing.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="mic"
                    color={pressed ? Colors.secondary : Colors.primary}
                    size={Sizing.icon}
                  />
                </TouchableOpacity>
              </View>
            )
          }
        />
      </View>
      {showGoDown ? (
        <View style={styles.goBottomView}>
          <Zigzag
            circleCount={4}
            circleSize={Spacings.circleSmallSize}
            color={Colors.primary}
          />
          <AntDesign
            name="downcircleo"
            size={Sizing.icon}
            color={Colors.forth}
            onPress={() => {
              flatListRef?.current?.scrollToIndex({
                animated: true,
                index: 0,
              });
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default Chat;
