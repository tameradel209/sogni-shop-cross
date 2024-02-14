import io from 'socket.io-client';
import {baseUrl} from './apis/axios';

// const {userData} = store.getState().authReducer;
// const {chat} = store.getState().chatReducer;
class SocketIO {
  socket = io(baseUrl);
  // constructor() {
  //   this.socket = io(baseUrl);
  // }

  // initialization() {
  //   this.onConnect();
  //   this.onDisconnect();
  //   this.onError();
  // }

  // onConnect() {
  //   this.socket.on('connect', () => {
  //     console.log('socket connected+++++++');

  //     chat.forEach((msg: IMessage) => {
  //       console.log('unsent message is sending now++++++++++', msg.message);
  //       msg?._id ? null : this.sendMessage(msg);
  //     });

  //     console.log('joining room++++++');

  //     this.joinRoom(userData?._id);

  //     this.onMessageReceived();
  //   });
  // }

  // joinRoom(room: string) {
  //   this.socket.emit('join_room', room);
  // }

  // onMessageReceived() {
  //   this.socket.on('chat_message', (msg: any) => {
  //     console.log('message received', msg.message);

  //     if (msg?.status == 1 && msg?.senderId != userData?._id) {
  //       console.log('change status from sent to received');
  //       this.sendMessage({...msg, status: 2});
  //     }

  //     store.dispatch(addMessageReceived(msg));
  //   });
  // }

  // sendMessage(data: IMessage) {
  //   this.socket.emit('chat_message', data);
  // }

  // onDisconnect() {
  //   this.socket.on('disconnect', (data: any) =>
  //     console.log('socket disconnected+++++++', data),
  //   );
  // }

  // onError() {
  //   this.socket.on('error', (data: any) =>
  //     console.log('==socket disconnected==', data),
  //   );
  // }
}

export default SocketIO;
