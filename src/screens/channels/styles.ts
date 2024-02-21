import {StyleSheet} from 'react-native';
import {Colors, Spacings} from '../../common/foundation';

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    height:Spacings.hSpace8+Spacings.circleBigSize*2,
    marginVertical:Spacings.hSpace10*0.5,
    flexDirection:'row'
  },
  inner: {
    justifyContent: 'space-between', 
    flexDirection:'row', 
    flex:1, 
    paddingHorizontal:Spacings.circleBigSize, 
    paddingVertical:Spacings.hSpace9, 
  },
  unread:{
    alignSelf:'center',
    backgroundColor:Colors.primary, 
    width:Spacings.wSpace4, height:Spacings.wSpace4, 
    borderRadius:Spacings.wSpace4, alignItems:'center', 
    justifyContent:'center'
  }
});

export default styles;
