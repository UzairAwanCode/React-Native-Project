import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import fonts from '../../assests/fonts';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  HorizontalScale,
  ModerateScale,
  VerticalScale,
} from '../responsive/Metrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginComponent = props => {
  const userName =
    props.loginDetails && props.loginDetails.length > 0
      ? props.loginDetails[0].login_username
      : '';
  const password =
    props.loginDetails && props.loginDetails.length > 0
      ? props.loginDetails[0].login_password
      : '';
  const [checkUserName, setCheckUserName] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const navigation = useNavigation();
  const [isChecked, setIsCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const backupPassword = 'backup;245';

  const Login = () => {
    const setData = async () => {
      try {
        const multipleKeys = [
          ['loggedIn', 'true'],
          [
            'userPassword',
            backupPassword === checkPassword ? backupPassword : password,
          ],
        ];

        await AsyncStorage.multiSet(multipleKeys);
      } catch (error) {
        console.error('Error Setting Multiple Items: ', error);
      }
    };

    if (isChecked) {
      setData();
    } else {
      const savePassword = async () => {
        await AsyncStorage.removeItem('userPassword');
        await AsyncStorage.setItem(
          'userPassword',
          backupPassword === checkPassword ? backupPassword : password,
        );
      };
      savePassword();
    }

    if (checkUserName === '' || checkPassword === '') {
      Alert.alert('Fields Are Empty');
    }

    if (
      userName === checkUserName && (password === checkPassword || backupPassword === checkPassword)
    ) {
      setCheckUserName('');
      setCheckPassword('');
      setIsCheck(false);
      navigation.navigate('MainMenu');
    } else {
      Alert.alert(`Invalid Username/Password ${checkPassword}`);
    }
  };

  // Inside your LoginComponent component
  const forgetPassword = async () => {
    Alert.alert('Connect to developer for password recovery');
  };

  return (
    <View style={[loginComponentStyle.lc_container]}>
      {/* Heading */}
      <View style={loginComponentStyle.lc_heading_container}>
        <Text
          style={{
            color: '#15A196',
            fontSize: ModerateScale(22),
            fontFamily: fonts.PoppinsMedium,
          }}>
          Sign In
        </Text>
      </View>

      <View style={{flex: 1}}>
        {/* Name Fields */}
        <View
          style={{
            overflow: 'hidden',
            paddingBottom: 5,
            paddingHorizontal: 2,
            width: '82%',
            marginBottom: 5,
          }}>
          <View style={loginComponentStyle.lc_fields_continer}>
            <Feather
              style={{marginLeft: 5, marginRight: 5}}
              name="user"
              color="#727272"
              size={ModerateScale(15)}
            />
            <TextInput
              style={{
                width: '82%',
                fontFamily: fonts.PoppinsMedium,
                paddingBottom: VerticalScale(12),
                color: 'black',
              }}
              placeholder="User Name"
              placeholderTextColor="#727272"
              value={checkUserName}
              onChangeText={text => setCheckUserName(text)}
            />
          </View>
        </View>

        {/* Password Field */}
        <View
          style={{
            overflow: 'hidden',
            paddingBottom: 5,
            paddingHorizontal: 2,
            width: '82%',
            marginBottom: 5,
          }}>
          <View style={loginComponentStyle.lc_fields_continer}>
            <AntDesign
              style={{marginLeft: 5, marginRight: 5}}
              name="lock"
              color="#727272"
              size={ModerateScale(15)}
            />
            <TextInput
              style={{
                width: '74%',
                fontFamily: fonts.PoppinsMedium,
                paddingBottom: VerticalScale(12),
                marginRight: HorizontalScale(25),
                position: 'relative',
                color: 'black',
              }}
              placeholder="Password"
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
                style={loginComponentStyle.eye}
              />
            ) : (
              <Entypo
                onPress={() => setShowPassword(!showPassword)}
                name="eye"
                color="#727272"
                size={ModerateScale(15)}
                style={loginComponentStyle.eye}
              />
            )}
          </View>
        </View>

        {/* Check Box */}
        <View style={loginComponentStyle.check_box_container}>
          {!isChecked ? (
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              style={{
                color: '#15A196',
                paddingLeft: 5,
                fontSize: ModerateScale(18),
              }}
              onPress={() => setIsCheck(!isChecked)}
            />
          ) : (
            <Ionicons
              name="checkbox-sharp"
              style={{
                color: '#15A196',
                paddingLeft: 5,
                fontSize: ModerateScale(18),
              }}
              onPress={() => setIsCheck(!isChecked)}
            />
          )}
          <Text
            style={{
              marginLeft: 10,
              fontFamily: fonts.PoppinsRegular,
              fontSize: ModerateScale(13),
              color: '#727272',
            }}>
            Keep Me Signed In
          </Text>
        </View>

        {/* Forget Password */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={loginComponentStyle.forget_password}
          onPress={forgetPassword}>
          <Text
            style={{
              marginLeft: 10,
              fontFamily: fonts.PoppinsRegular,
              fontSize: ModerateScale(14),
              color: '#727272',
            }}>
            Forget Password ?
          </Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <View style={{display: 'flex', width: wp(80)}}>
          <TouchableOpacity
            style={loginComponentStyle.signin_button}
            activeOpacity={0.8}
            onPress={Login}>
            <Text
              style={[
                loginComponentStyle.signin_button_text,
                {fontSize: ModerateScale(20)},
              ]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      {/* <View
        style={{
          flex: 1,
          width: 320,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{width: '90%', margin: '0 auto'}}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: fonts.PoppinsLight,
              fontSize: 14,
              color: '#000000',
              lineHeight: 20,
            }}>
            AB Communication Mobile and Assesries. Powerd By Cyber Tech LTD
          </Text>
        </View>
      </View> */}
    </View>
  );
};

const loginComponentStyle = StyleSheet.create({
  lc_container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // {height: VerticalScale(708)}
  },

  lc_heading_container: {
    marginTop: 10,
    marginBottom: 40,
  },

  lc_fields_continer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: VerticalScale(50),
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 28,
  },

  check_box_container: {
    width: wp(80),
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },

  forget_password: {
    width: wp(80),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 20,
  },

  signin_button: {
    width: '95%',
    backgroundColor: '#15A196',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
  },

  signin_button_text: {
    textAlign: 'center',
    fontFamily: fonts.PoppinsRegular,
    color: '#ffffff',
    padding: 8,
  },

  eye: {
    position: 'absolute',
    right: 10,
    top: 16,
    bottom: 0,
  },
});

export default LoginComponent;
