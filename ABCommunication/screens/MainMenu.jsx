import {Image, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fonts from '../assests/fonts';
import Sales from '../assests/images/sales.png';
import Transaction from '../assests/images/transaction.png';
import Installments from '../assests/images/installments.png';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HeaderLogo from '../components/reuseable/HeaderLogo';
import HeaderSection from '../components/reuseable/HeaderSection';
import {mainMenuStyle} from '../components/mainmenu/MainMenuStyle';
import {useEffect, useState} from 'react';
import {getInstLength, getSalesLength} from '../components/mainmenu/GetRecordlength';
import {dynamicFontSize} from '../components/reuseable/Responsive';

const MainMenu = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const {title} = route.params;
  const navigation = useNavigation();
  const [instlength, setInstLenght] = useState(0);
  const [salesLength, setSalesLength] = useState(0);

  useEffect(() => {
    getInstLength(setInstLenght);
    getSalesLength(setSalesLength);
  }, [isFocused]);

  return (
    <View style={mainMenuStyle.mm_container}>
      {/* Header Container */}
      <HeaderSection writeTitle={title} />

      {/* Content Container */}
      <View style={mainMenuStyle.mm_content_container}>
        {/* Header Logo */}
        <HeaderLogo />

        {/* Menu Container */}
        <View style={mainMenuStyle.mm_mainmenu_container}>
          {/* Sales */}
          <View
            style={{
              overflow: 'hidden',
              paddingBottom: 5,
              width: wp(90),
              borderRadius: 10,
            }}>
            <TouchableOpacity
              disabled={salesLength===0 ? true: false}
              style={mainMenuStyle.mm_menu}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Sales', {title: 'Sales'})}>
              <Image source={Sales} style={{width: 30, height: 30}} />

              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color: '#15A196',
                    fontFamily: fonts.PoppinsRegular,
                    fontSize: dynamicFontSize(18),
                    fontWeight: 700,
                  }}>
                  Sales
                </Text>
                <Text
                  style={{
                    color: '#727272',
                    fontFamily: fonts.PoppinsRegular,
                    fontSize: dynamicFontSize(11),
                    fontWeight: 600,
                  }}>
                  {salesLength===0 ? 'No records found' : `${salesLength} records found`}
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

          {/* Installments */}
          <View
            style={{
              overflow: 'hidden',
              paddingBottom: 5,
              width: wp(90),
              borderRadius: 10,
              marginVertical: 20,
            }}>
            <TouchableOpacity
            disabled={instlength===0 ? true: false}
              style={mainMenuStyle.mm_menu}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('Installment', {title: 'Installments'})
              }>
              <Image source={Installments} style={{width: 30, height: 30}} />

              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color: '#15A196',
                    fontFamily: fonts.PoppinsRegular,
                    fontSize: dynamicFontSize(18),
                    fontWeight: 700,
                  }}>
                  Installments
                </Text>
                <Text
                  style={{
                    color: '#727272',
                    fontFamily: fonts.PoppinsRegular,
                    fontSize: dynamicFontSize(11),
                    fontWeight: 600,
                  }}>
                  {instlength===0 ? 'No records found' : `${instlength} records found`}
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

          {/* Add Record */}
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
              onPress={() =>
                navigation.navigate('AddRecordMenu', {title: 'Add Record'})
              }>
              <Image source={Transaction} style={{width: 30, height: 30}} />

              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color: '#15A196',
                    fontFamily: fonts.PoppinsRegular,
                    fontSize: dynamicFontSize(18),
                    fontWeight: 700,
                  }}>
                  Add Record
                </Text>
                <Text
                  style={{
                    color: '#727272',
                    fontFamily: fonts.PoppinsRegular,
                    fontSize: dynamicFontSize(11),
                    fontWeight: 600,
                  }}>
                  Add New Record
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

export default MainMenu;
