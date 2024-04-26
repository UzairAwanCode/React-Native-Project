import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fonts from '../assests/fonts';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HeaderSection from '../components/reuseable/HeaderSection';
import {mainMenuStyle} from '../components/mainmenu/MainMenuStyle';
import {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  getInstLength,
  getSalesLength,
} from '../components/mainmenu/GetRecordlength';
import { updatePasswordStyle } from '../components/updatepassword/UpdatePasswordStyle';
import { HorizontalScale, ModerateScale, VerticalScale } from '../components/responsive/Metrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdatePassword = () => {
    const [checkPassword, setCheckPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

  const route = useRoute();
  const isFocused = useIsFocused();
  const title = "Change Password";
  const navigation = useNavigation();
  const [instlength, setInstLenght] = useState(0);
  const [salesLength, setSalesLength] = useState(0);
  const [isChecked, setIsCheck] = useState(false);

  useEffect(() => {
    getInstLength(setInstLenght);
    getSalesLength(setSalesLength);
  }, [isFocused]);

  const Update = () => {
    
  };

  return (
    <ScrollView style={updatePasswordStyle.up_container}>
      {/* Header Container */}
      <HeaderSection writeTitle={title} />

      {/* Content Container */}
      <View style={updatePasswordStyle.up_content_container}>
        {/* Menu Container */}
        <View style={[updatePasswordStyle.up_mainmenu_container,{marginBottom: VerticalScale(50),}]}>
          {/* Current Password */}
          <View
            style={updatePasswordStyle.up_common_field_style}>
            <View style={updatePasswordStyle.lc_fields_continer}>
              <AntDesign
                style={{marginLeft: 5, marginRight: 5}}
                name="lock"
                color="#727272"
                size={ModerateScale(15)}
              />
              <TextInput
                style={[updatePasswordStyle.up_password_field,
                    {fontFamily: fonts.PoppinsMedium,
                    paddingBottom: VerticalScale(12),
                    marginRight: HorizontalScale(25),}
                ]}
                placeholder="Current Password"
                placeholderTextColor="#727272"
                value={checkPassword}
                onChangeText={text => setCheckPassword(text)}
                secureTextEntry={showPassword}
              />
              {showPassword ? (
                <Entypo
                  onPress={() => setShowPassword(!showPassword)}
                  name="eye-with-line"
                  color="#727272"
                  size={ModerateScale(15)}
                  style={updatePasswordStyle.eye}
                />
              ) : (
                <Entypo
                  onPress={() => setShowPassword(!showPassword)}
                  name="eye"
                  color="#727272"
                  size={ModerateScale(15)}
                  style={updatePasswordStyle.eye}
                />
              )}
            </View>
          </View>

          {/* New Password */}
          <View
            style={updatePasswordStyle.up_common_field_style}>
            <View style={updatePasswordStyle.lc_fields_continer}>
              <AntDesign
                style={{marginLeft: 5, marginRight: 5}}
                name="lock"
                color="#727272"
                size={ModerateScale(15)}
              />
              <TextInput
                style={[updatePasswordStyle.up_password_field,
                    {fontFamily: fonts.PoppinsMedium,
                    paddingBottom: VerticalScale(12),
                    marginRight: HorizontalScale(25),}
                ]}
                placeholder="New Password"
                placeholderTextColor="#727272"
                value={checkPassword}
                onChangeText={text => setCheckPassword(text)}
                secureTextEntry={showPassword}
              />
              {showPassword ? (
                <Entypo
                  onPress={() => setShowPassword(!showPassword)}
                  name="eye-with-line"
                  color="#727272"
                  size={ModerateScale(15)}
                  style={updatePasswordStyle.eye}
                />
              ) : (
                <Entypo
                  onPress={() => setShowPassword(!showPassword)}
                  name="eye"
                  color="#727272"
                  size={ModerateScale(15)}
                  style={updatePasswordStyle.eye}
                />
              )}
            </View>
          </View>

          {/* Re-type Password */}
          <View
            style={updatePasswordStyle.up_common_field_style}>
            <View style={updatePasswordStyle.lc_fields_continer}>
              <AntDesign
                style={{marginLeft: 5, marginRight: 5}}
                name="lock"
                color="#727272"
                size={ModerateScale(15)}
              />
              <TextInput
                style={[updatePasswordStyle.up_password_field,
                    {fontFamily: fonts.PoppinsMedium,
                    paddingBottom: VerticalScale(12),
                    marginRight: HorizontalScale(25),}
                ]}
                placeholder="Re-Type Password"
                placeholderTextColor="#727272"
                value={checkPassword}
                onChangeText={text => setCheckPassword(text)}
                secureTextEntry={showPassword}
              />
              {showPassword ? (
                <Entypo
                  onPress={() => setShowPassword(!showPassword)}
                  name="eye-with-line"
                  color="#727272"
                  size={ModerateScale(15)}
                  style={updatePasswordStyle.eye}
                />
              ) : (
                <Entypo
                  onPress={() => setShowPassword(!showPassword)}
                  name="eye"
                  color="#727272"
                  size={ModerateScale(15)}
                  style={updatePasswordStyle.eye}
                />
              )}
            </View>
          </View>

          {/* Sign In Button */}
          <View style={{display: 'flex', width: wp(60), justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity
              style={updatePasswordStyle.signin_button}
              activeOpacity={0.8}
              onPress={Update}>
              <Text
                style={[
                  updatePasswordStyle.signin_button_text,
                  {fontSize: ModerateScale(20)},
                ]}>
                Update Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdatePassword;
