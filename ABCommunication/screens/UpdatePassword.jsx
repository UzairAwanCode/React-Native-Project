import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {updatePasswordStyle} from '../components/updatepassword/UpdatePasswordStyle';
import {
  HorizontalScale,
  ModerateScale,
  VerticalScale,
} from '../components/responsive/Metrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SetNewPassword } from '../components/updatepassword/UpdatePasswordBackend';

const UpdatePassword = () => {
  const [changePassword, setChangePassword] = useState({
    Password: null,
    CurrentPassword: null,
    NewPassword: null,
    RetypePassword: null,
    ShowCurrentPassword: true,
    ShowNewPassword: true,
  });

  const [validation, setValidation] = useState({
    CurrentPasswordErr: false,
    NewPasswordErr: false,
    RetypePasswordErr: false,
  });

  const route = useRoute();
  const isFocused = useIsFocused();
  const title = 'Change Password';
  const navigation = useNavigation();
  const [instlength, setInstLenght] = useState(0);
  const [salesLength, setSalesLength] = useState(0);

  useEffect(() => {
    getInstLength(setInstLenght);
    getSalesLength(setSalesLength);
    const getValue = async () => {
      const value = await AsyncStorage.getItem('userPassword');
      setChangePassword({
        ...changePassword,
        Password: value,
      });
    };
    getValue();
  }, [isFocused]);

  const Update = () => {
    let CurrentPasswordErr = false;
    let NewPasswordErr = false;
    let RetypePasswordErr = false;

    if (!changePassword.CurrentPassword) {
      CurrentPasswordErr = true;
    }

    if (!changePassword.NewPassword) {
      NewPasswordErr = true;
    }

    if (!changePassword.RetypePassword) {
      RetypePasswordErr = true;
    }

    setValidation({
      ...validation,
      CurrentPasswordErr: CurrentPasswordErr,
      NewPasswordErr: NewPasswordErr,
      RetypePasswordErr: RetypePasswordErr,
    });

    if (
      !changePassword.CurrentPassword ||
      !changePassword.NewPassword ||
      !changePassword.RetypePassword
    ) {
      setTimeout(() => {
        setValidation({
          CurrentPasswordErr: false,
          NewPasswordErr: false,
          RetypePasswordErr: false,
        });
      }, 2000);
      return false;
    }

    if(changePassword.Password != changePassword.CurrentPassword){
      Alert.alert("Invalid Current Password");
    }
    else if(changePassword.NewPassword != changePassword.RetypePassword){
      Alert.alert("Passwords do not match");
    }
    else{
      SetNewPassword(
        1,
        changePassword.NewPassword,
        navigation,
      );

      updatedPassword();
    }
  };

  const updatedPassword = async () => {
    try{
      const multipleKeys = [
        ['loggedIn', 'true'],
        ['userPassword' , changePassword.NewPassword]
      ]
      await AsyncStorage.multiSet(multipleKeys)
    }
    catch(error){
      console.error('Error Setting Multiple Items: ', error)
    }
  };



  return (
    <ScrollView style={updatePasswordStyle.up_container}>
      {/* Header Container */}
      <HeaderSection writeTitle={title} />

      {/* Content Container */}
      <View style={updatePasswordStyle.up_content_container}>
        {/* Menu Container */}
        <View
          style={[
            updatePasswordStyle.up_mainmenu_container,
            {marginBottom: VerticalScale(50)},
          ]}>

          {/* Current Password */}
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '82%',
            }}>
            {validation.CurrentPasswordErr ? (
              <Text style={{color: 'red'}}>Enter Current Password</Text>
            ) : null}
          </View>

          <View style={updatePasswordStyle.up_common_field_style}>
            <View style={updatePasswordStyle.lc_fields_continer}>
              <AntDesign
                style={{marginLeft: 5, marginRight: 5}}
                name="lock"
                color="#727272"
                size={ModerateScale(15)}
              />
              <TextInput
                style={[
                  updatePasswordStyle.up_password_field,
                  {
                    fontFamily: fonts.PoppinsMedium,
                    paddingBottom: VerticalScale(12),
                    marginRight: HorizontalScale(25),
                  },
                ]}
                placeholder="Current Password"
                placeholderTextColor="#727272"
                value={changePassword.CurrentPassword}
                onChangeText={text =>
                  setChangePassword({
                    ...changePassword,
                    CurrentPassword: text,
                  })
                }
                secureTextEntry={changePassword.ShowCurrentPassword}
              />
              {changePassword.ShowCurrentPassword ? (
                <Entypo
                  onPress={() =>
                    setChangePassword({
                      ...changePassword,
                      ShowCurrentPassword: !changePassword.ShowCurrentPassword,
                    })
                  }
                  name="eye-with-line"
                  color="#727272"
                  size={ModerateScale(15)}
                  style={updatePasswordStyle.eye}
                />
              ) : (
                <Entypo
                  onPress={() =>
                    setChangePassword({
                      ...changePassword,
                      ShowCurrentPassword: !changePassword.ShowCurrentPassword,
                    })
                  }
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
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '82%',
            }}>
            {validation.NewPasswordErr ? (
              <Text style={{color: 'red'}}>Enter New Password</Text>
            ) : null}
          </View>

          <View style={updatePasswordStyle.up_common_field_style}>
            <View style={updatePasswordStyle.lc_fields_continer}>
              <AntDesign
                style={{marginLeft: 5, marginRight: 5}}
                name="lock"
                color="#727272"
                size={ModerateScale(15)}
              />
              <TextInput
                style={[
                  updatePasswordStyle.up_password_field,
                  {
                    fontFamily: fonts.PoppinsMedium,
                    paddingBottom: VerticalScale(12),
                    marginRight: HorizontalScale(25),
                  },
                ]}
                placeholder="New Password"
                placeholderTextColor="#727272"
                value={changePassword.NewPassword}
                onChangeText={text =>
                  setChangePassword({
                    ...changePassword,
                    NewPassword: text,
                  })
                }
                secureTextEntry={changePassword.ShowNewPassword}
              />
              {changePassword.ShowNewPassword ? (
                <Entypo
                  onPress={() =>
                    setChangePassword({
                      ...changePassword,
                      ShowNewPassword: !changePassword.ShowNewPassword,
                    })
                  }
                  name="eye-with-line"
                  color="#727272"
                  size={ModerateScale(15)}
                  style={updatePasswordStyle.eye}
                />
              ) : (
                <Entypo
                  onPress={() =>
                    setChangePassword({
                      ...changePassword,
                      ShowNewPassword: !changePassword.ShowNewPassword,
                    })
                  }
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
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '82%',
            }}>
            {validation.RetypePasswordErr ? (
              <Text style={{color: 'red'}}>Retype Password</Text>
            ) : null}
          </View>

          <View style={updatePasswordStyle.up_common_field_style}>
            <View style={updatePasswordStyle.lc_fields_continer}>
              <AntDesign
                style={{marginLeft: 5, marginRight: 5}}
                name="lock"
                color="#727272"
                size={ModerateScale(15)}
              />
              <TextInput
                style={[
                  updatePasswordStyle.up_password_field,
                  {
                    fontFamily: fonts.PoppinsMedium,
                    paddingBottom: VerticalScale(12),
                    marginRight: HorizontalScale(25),
                  },
                ]}
                placeholder="Re-Type Password"
                placeholderTextColor="#727272"
                value={changePassword.RetypePassword}
                onChangeText={text =>
                  setChangePassword({
                    ...changePassword,
                    RetypePassword: text,
                  })
                }
                secureTextEntry={changePassword.ShowNewPassword}
              />
              {changePassword.ShowNewPassword ? (
                <Entypo
                  onPress={() =>
                    setChangePassword({
                      ...changePassword,
                      ShowNewPassword: !changePassword.ShowNewPassword,
                    })
                  }
                  name="eye-with-line"
                  color="#727272"
                  size={ModerateScale(15)}
                  style={updatePasswordStyle.eye}
                />
              ) : (
                <Entypo
                  onPress={() =>
                    setChangePassword({
                      ...changePassword,
                      ShowNewPassword: !changePassword.ShowNewPassword,
                    })
                  }
                  name="eye"
                  color="#727272"
                  size={ModerateScale(15)}
                  style={updatePasswordStyle.eye}
                />
              )}
            </View>
          </View>

          {/* Sign In Button */}
          <View
            style={{
              display: 'flex',
              width: wp(60),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
