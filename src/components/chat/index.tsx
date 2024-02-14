import React, {memo} from 'react';
import TextMessage from './textMessage';

const MessageItem = ({item, index}) => {
  switch (item.type) {
    case 'TEXT':
      return <TextMessage item={item} index={index} />;
    default:
      return <TextMessage item={item} index={index} />;
  }
};

export default MessageItem;
