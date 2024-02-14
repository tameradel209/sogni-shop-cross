import React from 'react';
import {Colors, Spacings} from '../foundation';
import {IZigzagSquareShape} from '../models';
import Zigzag from '../zigzag';

const ZigzagSquareShape = (props: IZigzagSquareShape) => {
  const {horizontalCount, verticalCount, color, circleSize} = props;

  return (
    <>
      <Zigzag
        circleCount={horizontalCount * 2}
        circleSize={circleSize ?? Spacings.circleSmallSize}
        color={color ?? Colors.white}
        shring={
          -((verticalCount - 2) * (circleSize ?? Spacings.circleSmallSize))
        }
        direction="horizontal"
      />
      <Zigzag
        circleCount={verticalCount * 2}
        circleSize={circleSize ?? Spacings.circleSmallSize}
        color={color ?? Colors.white}
        shring={
          -((horizontalCount - 2) * (circleSize ?? Spacings.circleSmallSize))
        }
        direction="vertical"
      />
    </>
  );
};

export default ZigzagSquareShape;
