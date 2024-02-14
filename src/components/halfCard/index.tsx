import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Spacings, Typography} from '../../common/foundation';
import IMAGES from '../../common/images';
import {styles} from './styles';
import ZigzagSquareShape from '../../common/zigzagSquareShape';
import CustomButton from '../customButton';

const HalfCard = (props: any) => {
  const horizontalCount = Spacings.smallCircleCount * 0.25;
  const verticalCount = Spacings.smallCircleCount - 16;
  const circleSize = Spacings.circleSmallSize;
  const {style} = props;
  const [count, setCount] = useState(0);
  return (
    <View style={style}>
      <TouchableOpacity
        style={[
          {
            padding: circleSize * 0.5,
            width: horizontalCount * circleSize,
            height: circleSize * verticalCount,
          },
        ]}>
        <ZigzagSquareShape
          horizontalCount={horizontalCount}
          verticalCount={verticalCount}
          circleSize={circleSize}
        />
        <Image
          source={IMAGES.product1}
          resizeMode="contain"
          style={{
            width: horizontalCount * circleSize * 0.8,
            height: horizontalCount * circleSize * 0.8,
          }}
        />
        <Text style={Typography.header8}>Fresho</Text>
        <Text style={Typography.headerBold7}>Cauliflower</Text>
        <Text style={Typography.header8}>2 kg</Text>
        <Text style={Typography.header8}>5 EGP</Text>
        {count == 0 ? (
          <CustomButton
            onPress={() => setCount(count + 1)}
            circleCount={Spacings.smallCircleCount - 8}
            title={'Add To Card'}
            backgroundPressedInColor={Colors.primary}
            backgroundPressedOutColor={Colors.forth}
            circleSize={Spacings.circleSmallSize * 0.6}
          />
        ) : (
          <View style={styles.row}>
            <CustomButton
              onPress={() => setCount(count + 1)}
              circleCount={4}
              title={'+'}
              titleStyle={styles.title}
              backgroundPressedInColor={Colors.primary}
              backgroundPressedOutColor={Colors.forth}
              circleSize={Spacings.circleSmallSize * 0.6}
            />
            <View style={styles.count}>
              <Text>{count}</Text>
            </View>
            <CustomButton
              onPress={() => setCount(count - 1)}
              circleCount={4}
              title={'-'}
              titleStyle={styles.title}
              backgroundPressedInColor={Colors.primary}
              backgroundPressedOutColor={Colors.forth}
              circleSize={Spacings.circleSmallSize * 0.6}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HalfCard;
