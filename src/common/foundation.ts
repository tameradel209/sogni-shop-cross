import {StyleSheet} from 'react-native';
import i18n from '../../i18next';
import {width, height, getWidthThreshold} from '../config/helpers/thresholds';
const smallThreshold = getWidthThreshold(15);
const bigThreshold = getWidthThreshold(14);
const tinyThreshold = getWidthThreshold(16);
export const Colors = {
  primary: '#42032C',
  secondary: '#E6D2AA',
  third: '#D36B00',
  forth: '#F1EFDC',
  denger: '#c70606',
  dengerHint: '#ffdddd',
  success: '#21c45a',
  successHint: 'rgb( 33 ,196,90,0.15)',
  white: '#fff',
  black: '#000',
  borderColor: '#6e0e0a',
  grey: '#808080',
  lightGrey: '#a9a9a9',
  loadingBack: 'rgba(241, 239, 220,0.5)',
};

export const Spacings = {
  wSpace: Math.ceil(width * 0.12),
  wSpace1: Math.ceil(width * 0.1),
  wSpace2: Math.ceil(width * 0.09),
  wSpace3: Math.ceil(width * 0.08),
  wSpace4: Math.ceil(width * 0.07),
  wSpace5: Math.ceil(width * 0.06),
  wSpace6: Math.ceil(width * 0.05),
  wSpace7: Math.ceil(width * 0.04),
  wSpace8: Math.ceil(width * 0.03),
  wSpace9: Math.ceil(width * 0.02),
  wSpace10: Math.ceil(width * 0.01),
  hSpace: Math.ceil(height * 0.12),
  hSpace1: Math.ceil(height * 0.1),
  hSpace2: Math.ceil(height * 0.09),
  hSpace3: Math.ceil(height * 0.08),
  hSpace4: Math.ceil(height * 0.07),
  hSpace5: Math.ceil(height * 0.06),
  hSpace6: Math.ceil(height * 0.05),
  hSpace7: Math.ceil(height * 0.04),
  hSpace8: Math.ceil(height * 0.03),
  hSpace9: Math.ceil(height * 0.02),
  hSpace10: Math.ceil(height * 0.01),
  borderWidth: Math.ceil(width * 0.002),
  circleSmallSize: smallThreshold.circleSize,
  smallCircleCount: smallThreshold.circleCount,
  smallRemainingWidth: smallThreshold.remainingWidth,
  circleBigSize: bigThreshold.circleSize,
  bigCircleCount: bigThreshold.circleCount,
  bigRemainingWidth: bigThreshold.remainingWidth,
  circleTinySize: tinyThreshold.circleSize,
  tinyCircleCount: tinyThreshold.circleCount,
  tinyRemainingWidth: tinyThreshold.remainingWidth,
  fontFamily: i18n.language == 'ar' ? 'HelveticaArabic' : 'Roboto',
};

export const Typography = StyleSheet.create({
  header: {
    fontSize: Spacings.wSpace,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
  },
  header1: {
    fontSize: Spacings.wSpace1,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
  },
  header2: {
    fontSize: Spacings.wSpace2,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
  },
  header3: {
    fontSize: Spacings.wSpace3,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
  },
  header4: {
    fontSize: Spacings.wSpace4,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
  },
  header5: {
    fontSize: Spacings.wSpace5,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
  },
  header6: {
    fontSize: Spacings.wSpace6,
    //fontFamily: Spacings.fontFamily,
    color: Colors.black,
  },
  header7: {
    fontSize: Spacings.wSpace7,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
  },
  header8: {
    fontSize: Spacings.wSpace8,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
  },
  header9: {
    fontSize: Spacings.wSpace9,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
  },
  header10: {
    fontSize: Spacings.wSpace10,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
  },
  headerBold: {
    fontSize: Spacings.wSpace,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
    fontWeight: 'bold',
  },
  headerBold1: {
    fontSize: Spacings.wSpace1,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
    fontWeight: 'bold',
  },
  headerBold2: {
    fontSize: Spacings.wSpace2,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
    fontWeight: 'bold',
  },
  headerBold3: {
    fontSize: Spacings.wSpace3,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
    fontWeight: 'bold',
  },
  headerBold4: {
    fontSize: Spacings.wSpace4,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
    fontWeight: 'bold',
  },
  headerBold5: {
    fontSize: Spacings.wSpace5,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
    fontWeight: 'bold',
  },
  headerBold6: {
    fontSize: Spacings.wSpace6,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
    fontWeight: 'bold',
  },
  headerBold7: {
    fontSize: Spacings.wSpace7,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
    fontWeight: 'bold',
  },
  headerBold8: {
    fontSize: Spacings.wSpace8,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
    fontWeight: 'bold',
  },
  headerBold9: {
    fontSize: Spacings.wSpace9,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
    fontWeight: 'bold',
  },
  headerBold10: {
    fontSize: Spacings.wSpace10,
    fontFamily: Spacings.fontFamily,
    color: Colors.black,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: width * 0.06,
    fontFamily: Spacings.fontFamily,
  },
  text: {
    color: Colors.secondary,
    fontSize: Math.ceil(width * 0.04),
    fontFamily: Spacings.fontFamily,
  },
  smallText: {
    color: Colors.forth,
    fontSize: Math.ceil(width * 0.04),
    fontFamily: Spacings.fontFamily,
  },
  tinyText: {
    color: Colors.forth,
    fontSize: Math.ceil(width * 0.035),
    fontFamily: Spacings.fontFamily,
  },
  boldTinyText: {
    color: Colors.third,
    fontSize: Math.ceil(width * 0.035),
    fontFamily: Spacings.fontFamily,
    fontWeight: 'bold',
  },
  error: {
    color: Colors.denger,
    fontSize: Math.ceil(width * 0.035),
    fontFamily: Spacings.fontFamily,
    fontWeight: 'bold',
  },
});

export const Sizing = {
  icon: height * 0.03,
  smallIcon: height * 0.02,
  bigIcon: height * 0.05,
};
