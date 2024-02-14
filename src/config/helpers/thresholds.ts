import {Dimensions} from 'react-native';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export {width, height};
export const GOOGLE_MAPS_APIKEY = 'AIzaSyCh972dP0Wjvcw5iSjusFecbD8KkqKxJdA';

export const getWidthThreshold = (value: number) => {
  const circleSize = Math.floor(width / value);
  const remainingWidth = width - circleSize * value;
  const circleCount = ((width - remainingWidth) / circleSize) * 2 - 2;
  console.log({
    circleSize,
    remainingWidth,
    circleCount,
  });
  return {
    circleSize,
    remainingWidth,
    circleCount,
  };
};
