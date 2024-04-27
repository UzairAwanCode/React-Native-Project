import React, {useState, useRef, useEffect} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import ProfileLogo from '../../assests/images/logo.png';
import fonts from '../../assests/fonts';
import {HorizontalScale} from '../responsive/Metrics';
import {dynamicFontSize} from './Responsive';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderSection = props => {
  const [profile, setProfile] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const fadeIn = () => {
    setProfile(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setProfile(false)); // After the fade-out animation completes, set profile to false
  };

  useEffect(()=>{
    const getValue = async()=>{
      const value = await AsyncStorage.getItem('userPassword')
      console.log(value);
    }
    getValue()
  },[])
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('loggedIn')
      await AsyncStorage.removeItem('userPassword')
      navigation.navigate('Login');
    } catch (error) {
      console.error(`Error Throws: ${keys}`);
    }
  };

  return (
    <View style={headerStyle.header_container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MainMenu')}
        activeOpacity={0.9}
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <AntDesign
          name="left"
          color="#FFFFFF"
          style={{fontSize: dynamicFontSize(12)}}
        />
        <Text
          style={{
            marginLeft: 4,
            fontFamily: fonts.PoppinsRegular,
            fontSize: dynamicFontSize(13),
            color: '#ffffff',
          }}>
          AB Communication
        </Text>
      </TouchableOpacity>

      <View>
        <Text
          style={{
            marginRight: 20,
            marginTop: 1,
            borderBottomWidth: 0.8,
            borderBottomColor: '#ffffff',
            fontFamily: fonts.PoppinsRegular,
            fontSize: dynamicFontSize(13),
            color: '#ffffff',
          }}>
          {props.writeTitle}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#ddd9ce',
          width: 40,
          height: 40,
          borderRadius: 100,
          marginRight: 10,
        }}>
        {/* Open Profile */}
        <TouchableOpacity
          onPress={profile ? fadeOut : fadeIn}
          activeOpacity={0.9}>
          <Image
            source={ProfileLogo}
            style={{
              width: '100%',
              height: 40,
              borderRadius: 100,
              position: 'relative',
            }}
          />
        </TouchableOpacity>

        {profile && (
          <Animated.View style={[headerStyle.ins_profile_container, {opacity}]}>
            <TouchableOpacity
              onPress={() => {fadeOut(); navigation.navigate('MainMenu')}}
              style={[headerStyle.ins_profile_icons, {marginBottom: 15}]}>
              <Entypo
                name="home"
                size={10}
                marginRight={10}
                style={{color: '#727272'}}
              />
              <Text style={{color: '#727272'}}>Home page</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {fadeOut(); navigation.navigate('UpdatePassword')}}
              style={[headerStyle.ins_profile_icons, {marginBottom: 15}]}>
              <MaterialIcons
                name="password"
                size={10}
                marginRight={10}
                style={{color: '#727272'}}
              />
              <Text style={{color: '#727272'}}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={headerStyle.ins_profile_icons}
              onPress={() => {
                fadeOut(), signOut();
              }}>
              <Entypo
                name="log-out"
                size={12}
                marginRight={10}
                style={{color: '#727272'}}
              />
              <Text
                style={{marginRight: 5, paddingBottom: 10, color: '#727272'}}>
                Sign out
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const headerStyle = StyleSheet.create({
  header_container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    zIndex: 1,
  },

  ins_profile_container: {
    width: HorizontalScale(140),
    backgroundColor: '#F4EEE0',
    position: 'absolute',
    top: 42,
    left: -122,
    right: 0,
    borderRadius: 5,
    padding: 5,
  },

  ins_profile_icons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HeaderSection;
