import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fonts from '../assests/fonts';
import Sales from '../assests/images/sales.png';
import Installments from '../assests/images/installments.png';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HeaderLogo from '../components/reuseable/HeaderLogo';
import HeaderSection from '../components/reuseable/HeaderSection';
import { VerticalScale } from '../components/responsive/Metrics';
import { dynamicFontSize } from '../components/reuseable/Responsive';

const AddRecordMenu = () => {
  const route = useRoute();
  const {title} = route.params;
  console.log(title);
  const navigation = useNavigation();

  return (
    <View style={mainMenuStyle.mm_container}>
      {/* Header Container */}
      <HeaderSection writeTitle = {title}/>

      {/* Content Container */}
      <View style={mainMenuStyle.mm_content_container}>
        {/* Logo Image */}
        <HeaderLogo />

        {/* Menu Container */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 150,
          }}>
          {/* Menu One */}
          <View
            style={{
              overflow: 'hidden',
              paddingBottom: 5,
              width: wp(90),
              borderRadius: 10,
            }}>
            <TouchableOpacity
              style={mainMenuStyle.mm_menu}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('AddRecord' , {check: true})}>
              <Image source={Sales} style={{width: 30, height: 30}} />

              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color: '#15A196',
                    fontFamily: fonts.PoppinsRegular,
                    fontSize: dynamicFontSize(16),
                    fontWeight: 700,
                  }}>
                  Add New Sales
                </Text>
                <Text
                  style={{
                    color: '#727272',
                    fontFamily: fonts.PoppinsRegular,
                    fontSize: dynamicFontSize(11),
                    fontWeight: 600,
                  }}>
                  Add Sales Record
                </Text>
              </View>

              <View style={{marginLeft: 'auto', marginRight: 10}}>
                <AntDesign
                  name="right"
                  style={{fontSize: dynamicFontSize(16)}}
                  color="#333333"
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Menu Two */}
          <View
            style={{
              overflow: 'hidden',
              paddingBottom: 5,
              width: wp(90),
              borderRadius: 10,
              marginVertical: 20,
            }}>
            <TouchableOpacity
              style={mainMenuStyle.mm_menu}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('AddRecord', {check: false})}>
              <Image source={Installments} style={{width: 30, height: 30}} />

              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color: '#15A196',
                    fontFamily: fonts.PoppinsRegular,
                    fontSize: dynamicFontSize(16),
                    fontWeight: 700,
                  }}>
                  Add New Installments
                </Text>
                <Text
                  style={{
                    color: '#727272',
                    fontFamily: fonts.PoppinsRegular,
                    fontSize: dynamicFontSize(11),
                    fontWeight: 600,
                  }}>
                  Add Installment Record
                </Text>
              </View>

              <View style={{marginLeft: 'auto', marginRight: 10}}>
                <AntDesign
                  name="right"
                  style={{fontSize: dynamicFontSize(16)}}
                  color="#333333"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const mainMenuStyle = StyleSheet.create({
  mm_container: {
    flex: 1,
    alignItems: 'center',
  },
  mm_header_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 50,
    marginTop: 5,
  },
  mm_content_container: {
    flex: 1,
    backgroundColor: '#A4C9C6',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: VerticalScale(40)
  },

  mm_menu: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    elevation: 10,
  },
});

export default AddRecordMenu;
