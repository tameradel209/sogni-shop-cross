import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {Colors, Sizing, Spacings} from '../../../common/foundation';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SocketIO from '../../../config/socket';
import {getTime} from '../../../config/helpers/date';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {addMessageReceived} from '../../../redux/slices/chatSlice';
import {useIsFocused} from '@react-navigation/native';
const socketServices = new SocketIO();

const TextMessage = ({item, index}) => {
  const {userData} = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const focused = useIsFocused();
  useEffect(() => {
    console.log('is I am focused item?.background', item?.background);
    if (
      !item?.background &&
      focused &&
      item?.senderId != userData?._id &&
      item?.status != 3
    ) {
      socketServices.socket.emit('chat_message', {...item, status: 3});
    }
  }, [focused]);
  const time = getTime(item.dateSent);
  const isMyMessage = item?.senderId == userData._id;

  return (
    <View
      key={index}
      style={{
        backgroundColor: isMyMessage ? Colors.third : Colors.white,
        alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
        padding: Spacings.wSpace9,
        width: Spacings.circleSmallSize * (Spacings.smallCircleCount - 2) * 0.5,
        margin: Spacings.wSpace10,
        borderRadius: Spacings.wSpace9,
      }}>
      <Text style={{color: isMyMessage ? Colors.white : Colors.primary}}>
        {item?.message}
      </Text>
      <View style={styles.row}>
        <Text
          style={{
            color: Colors.primary,
            marginHorizontal: isMyMessage ? Spacings.wSpace10 : 0,
          }}>
          {time}
        </Text>
        {isMyMessage ? (
          <Ionicons
            name={
              item?.status == 0
                ? 'time-outline'
                : item?.status == 1
                ? 'checkmark'
                : 'checkmark-done'
            }
            size={Sizing.smallIcon}
            color={item?.status > 2 ? Colors.primary : Colors.forth}
          />
        ) : null}
      </View>
    </View>
  );
};

export default TextMessage;
