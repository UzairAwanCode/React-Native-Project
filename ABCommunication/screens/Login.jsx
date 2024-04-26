import {
  Dimensions,
  KeyboardAvoidingView,
  PixelRatio,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import fonts from '../assests/fonts';
import LoginComponent from '../components/login/LoginComponent';
import {ModerateScale, VerticalScale} from '../components/responsive/Metrics';
import {db} from '../components/reuseable/BackendDBConn';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {getLoginData} from '../components/login/LoginBackend';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [login, setLogin] = useState([]);
  const isFocused = useIsFocused();

  const getData = async () => {
    try {
      const logIn = await AsyncStorage.getItem('loggedIn');
      if (logIn === 'true') {
        navigation.navigate('MainMenu');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Create Table in database
  useEffect(() => {
    db.transaction(function (txn) {
      // Installment Table
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='login_tbl'",
        [],
        function (tx, res) {
          console.log('Login:', res.rows.length);
          console.log(res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS login_tbl', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS login_tbl(login_id INTEGER PRIMARY KEY AUTOINCREMENT,login_username VARCHAR(255), login_password VARCHAR(255))',
              [],
              function () {
                // After creating the table, insert data
                txn.executeSql(
                  'INSERT INTO login_tbl (login_username, login_password) VALUES (?, ?)',
                  ['@saadawan123', 'c459'],
                  function () {
                    console.log('Data inserted successfully');
                  },
                  function (tx, error) {
                    console.error('Error inserting data: ', error);
                  },
                );
              },
            );
          } else {
            txn.executeSql(
              'PRAGMA table_info(login_tbl)',
              [],
              function (tx, res) {
                for (var i = 0; i < res.rows.length; i++) {
                  var column = res.rows.item(i);
                  //   console.log(
                  //     'Column name: ' + column.name + ', Type: ' + column.type,
                  //   );
                }
              },
            );
          }
        },
      );
    });
  }, []);

  useEffect(() => {
    getData();
    getLoginData(setLogin);
  }, [isFocused]);

  return (
    <ScrollView contentContainerStyle={{flex: 1}} style={loginStyle.login_container}>
      <View style={loginStyle.heading_container}>
        <Text
          style={[
            loginStyle.heading,
            {fontFamily: fonts.PoppinsBold, fontSize: ModerateScale(20)},
          ]}>
          AB Communication
        </Text>
      </View>

      <LoginComponent loginDetails={login} />
    </ScrollView>
  );
};

const loginStyle = StyleSheet.create({
  login_container: {
    
  },
  heading_container: {
    display: 'flex',
    marginTop: VerticalScale(20),
    marginBottom: VerticalScale(30),
    alignItems: 'center',
  },
  heading: {
    color: '#ffffff',
    fontWeight: 700,
  },
});
export default Login;
