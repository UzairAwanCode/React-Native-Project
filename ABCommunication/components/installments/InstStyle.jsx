import { StyleSheet } from "react-native";
import { VerticalScale } from "../responsive/Metrics";
import fonts from "../../assests/fonts";

export const addDataStyle = StyleSheet.create({
  ad_container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
    // alignItems: 'center',
  },

  ad_heading_container: {
    marginTop: 20,
    marginBottom: 40,
  },

  ad_fields_continer: {
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

  common_fields_style: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '82%',
  },

  ad_check_box_container: {
    width: 320,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },

  ad_record_button: {
    width: '50%',
    backgroundColor: '#15A196',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
  },

  ad_record_button_text: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.PoppinsRegular,
    color: '#ffffff',
    padding: 7,
  },
});
