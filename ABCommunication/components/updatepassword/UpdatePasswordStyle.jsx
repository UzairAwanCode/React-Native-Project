import {StyleSheet} from 'react-native';
import fonts from '../../assests/fonts';
import {VerticalScale} from '../responsive/Metrics';

export const updatePasswordStyle = StyleSheet.create({
  up_container: {
    display: 'flex',
  },

  up_common_field_style: {
    overflow: 'hidden',
    paddingBottom: 5,
    paddingHorizontal: 2,
    width: '82%',
    marginBottom: 5,
  },

  up_content_container: {
    flex: 1,
    backgroundColor: '#A4C9C6',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: VerticalScale(40),
  },

  up_mainmenu_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  up_password_field: {
    width: '74%',
    position: 'relative',
    color: 'black',
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
