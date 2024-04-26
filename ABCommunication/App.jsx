import {
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import MainMenu from './screens/MainMenu';
import SalesData from './screens/SalesData';
import Installments from './screens/Installments';
import AddRecord from './screens/Addrecord';
import AddRecordMenu from './screens/AddRecordMenu';
import DetailedInstallments from './components/installments/DetailedInstallments';
import EditInstallment from './components/installments/EditInstallment';
import EditSalesRecord from './components/salesdata/EditSalesRecord';
import {useEffect, useState} from 'react';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import UpdatePassword from './screens/UpdatePassword';

const App = () => {
  const [loggingIn, setLoggingIn] = useState('');
  const Stack = createNativeStackNavigator();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#15A196',
    },
  };

  useEffect(()=>{
    if(Platform.OS === 'android'){SplashScreen.hide()}
  },[])

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainMenu" component={MainMenu} initialParams={{title: 'Main Menu'}} />
        <Stack.Screen name="Sales" component={SalesData} />
        <Stack.Screen name="Installment" component={Installments} />
        <Stack.Screen name="AddRecordMenu" component={AddRecordMenu} />
        <Stack.Screen name="AddRecord" component={AddRecord} />
        <Stack.Screen name="DetailedInstallments" component={DetailedInstallments} />
        <Stack.Screen name="EditInstallment" component={EditInstallment} />
        <Stack.Screen name="EditSalesRecord" component={EditSalesRecord} />
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
