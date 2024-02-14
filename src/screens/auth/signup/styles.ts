import {StyleSheet} from 'react-native';
import {Colors, Spacings} from '../../../common/foundation';

export const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    color: Colors.forth,
    marginTop: Spacings.hSpace2,
  },
  subHeaderText: {
    textAlign: 'center',
    color: Colors.forth,
  },
  checkContainer: {
    alignItems: 'center',
    marginBottom: Spacings.hSpace10,
  },
  checkContainer1: {
    alignItems: 'center',
    marginBottom: Spacings.hSpace10,
    marginLeft: Spacings.wSpace1,
  },
  signupContainer: {
    justifyContent: 'center',
    marginBottom: Spacings.hSpace10,
  },
  margin: {
    marginBottom: Spacings.hSpace10,
  },
  thirdPartyContainer: {
    justifyContent: 'space-evenly',
    margin: Spacings.hSpace10,
  },
  thirdParty: {
    width: Spacings.wSpace,
    height: Spacings.wSpace,
    borderRadius: Spacings.wSpace,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.secondary,
  },
  thirdPartyImage: {
    width: Spacings.wSpace5,
    height: Spacings.wSpace5,
  },
});
