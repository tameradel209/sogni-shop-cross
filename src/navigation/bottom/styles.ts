import {StyleSheet} from 'react-native';
import {width, height} from '../../config/helpers/thresholds';

const styles = StyleSheet.create({
  tapStyles: {
    backgroundColor: '#17213b',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: height * 0.1,
    paddingBottom: height * 0.01,
  },
  img: {
    height: height * 0.03,
    width: width * 0.08,
    marginBottom: -height * 0.01,
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.04,
    textAlign: 'left',
    color: '#909090',
    marginBottom: height * 0.01,
  },
  activeLabel: {
    color: '#fecd20',
  },
});

export default styles;
