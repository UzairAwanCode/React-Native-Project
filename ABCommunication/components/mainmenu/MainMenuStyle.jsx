import { StyleSheet } from "react-native";
import { VerticalScale } from "../responsive/Metrics";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const mainMenuStyle = StyleSheet.create({
    mm_container: {
      flex: 1,
      alignItems: 'center',
    },
    mm_header_container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: 60,
      marginTop: 5,
    },

    mm_mainmenu_container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: VerticalScale(50),
    },
    mm_content_container: {
      flex: 1,
      backgroundColor: '#A4C9C6',
      width: '100%',
      alignItems: 'center',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      marginTop: VerticalScale(40)
    },
  
    mm_menu: {
      width: wp(90),
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      padding: 10,
      elevation: 10,
    },
  });