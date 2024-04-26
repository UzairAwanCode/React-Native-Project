import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import fonts from '../../assests/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {VerticalScale} from '../responsive/Metrics';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import HeaderSection from '../reuseable/HeaderSection';
import {DeleteSingleInstRecord, deleteData, getSingleData} from './backendFunc';
import {dynamicFontSize} from '../reuseable/Responsive';

const DetailedInstallments = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {item, title} = route.params;
  const [instSingleData, setInstSingleData] = useState([]);
  const [detailsList, setDetailsList] = useState([]);
  const isFocused = useIsFocused();
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    getSingleData(item.id, setInstSingleData);
  }, [isFocused]);

  useEffect(() => {
    if (instSingleData && Object.keys(instSingleData).length > 0) {
      const details = {
        id: instSingleData.inst_id,
        date: instSingleData.inst_newinstdate,
        name: instSingleData.inst_username,
        issue_date: instSingleData.inst_newinstdate,
        down_payment: instSingleData.inst_downpayment,
        next_installment: instSingleData.inst_nextisntdate,
        product_name: instSingleData.product_name,
        total_payment: instSingleData.total_payment,
        pending_payment: instSingleData.pending_payment,
        installments_end_date: instSingleData.inst_isntenddate,
        advance_payment: instSingleData.advance_payment,
        monthly_instalments: instSingleData.monthly_instalments,
      };
      setDetailsList(details);
      // console.log(detailsList);
    }
  }, [instSingleData]);

  useEffect(() => {
    if (confirmDelete) {
      deleteData(item.id, navigation);
      setConfirmDelete(false);
    }
  }, [confirmDelete]);

  const DeleteSingleRecord = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this record?',
      [{text: 'No'}, {text: 'yes', onPress: () => setConfirmDelete(true)}],
      {cancelable: false},
    );
  };

  return (
    <View style={diStyle.di_container}>
      {/* Header Container */}
      <HeaderSection writeTitle={title} />

      {/* Content Container */}
      <View style={diStyle.di_content_container}>
        <ScrollView style={diStyle.card_user_data_Container}>
          {/* First Row */}
          <View style={diStyle.card_user_data_Common_style}>
            <Text
              style={[
                diStyle.inst_title_common_style,
                {fontSize: dynamicFontSize(14)},
              ]}>
              {detailsList.date}
            </Text>
            <TouchableOpacity
              onPress={DeleteSingleRecord}
              activeOpacity={0.8}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  fontFamily: fonts.PoppinsRegular,
                  fontSize: dynamicFontSize(14),
                  fontWeight: 'bold',
                  color: '#FF0000',
                }}>
                Delete Record
              </Text>
            </TouchableOpacity>
          </View>

          {/* Edit */}
          <View
            style={[
              diStyle.card_user_data_Common_style,
              {marginTop: VerticalScale(20)},
            ]}>
            <Text
              style={{
                flex: 2,
                fontFamily: fonts.PoppinsSemiBold,
                fontSize: dynamicFontSize(14),
                fontWeight: 'bold',
                color: '#15A196',
              }}>
              Edit Record
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#15A196',
                padding: 3,
                width: wp(30),
                borderRadius: 50,
              }}
              onPress={() =>
                navigation.navigate('EditInstallment', {
                  check: false,
                  title: 'Edit Installment Record',
                  data: detailsList,
                })
              }>
              <FontAwesome
                name="edit"
                style={{
                  color: '#FFFFFF',
                  paddingTop: 2,
                  fontSize: dynamicFontSize(14),
                }}
              />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: fonts.PoppinsRegular,
                  fontSize: dynamicFontSize(14),
                }}>
                {' '}
                Edit Record
              </Text>
            </TouchableOpacity>
          </View>

          {/* Name */}
          <View
            style={[
              diStyle.card_user_data_Common_style,
              {marginTop: VerticalScale(16)},
            ]}>
            <Text
              style={[
                diStyle.inst_title_common_style,
                {fontSize: dynamicFontSize(15)},
              ]}>
              Name
            </Text>
            <Text
              style={{
                flex: 1,
                justifyContent: 'center',
                textAlign: 'right',
                fontSize: dynamicFontSize(14),
                color: 'black',
              }}>
              {detailsList.name}
            </Text>
          </View>

          {/* Product Name */}
          <View
            style={[
              diStyle.card_user_data_Common_style,
              {marginTop: VerticalScale(16)},
            ]}>
            <Text
              style={[
                diStyle.inst_title_common_style,
                {fontSize: dynamicFontSize(15)},
              ]}>
              Product Name
            </Text>
            <Text
              style={{
                flex: 1,
                justifyContent: 'center',
                textAlign: 'right',
                fontSize: dynamicFontSize(14),
                color: 'black',
              }}>
              {detailsList.product_name}
            </Text>
          </View>

          {/* Issue Date */}
          <View
            style={[
              diStyle.card_user_data_Common_style,
              {marginTop: VerticalScale(10)},
            ]}>
            <Text
              style={[
                diStyle.inst_title_common_style,
                {fontSize: dynamicFontSize(15)},
              ]}>
              Issue Date
            </Text>
            <Text
              style={{
                flex: 1,
                justifyContent: 'center',
                textAlign: 'right',
                fontSize: dynamicFontSize(14),
                color: 'black',
              }}>
              {detailsList.issue_date}
            </Text>
          </View>

          {/* Down Payment */}
          <View
            style={[
              diStyle.card_user_data_Common_style,
              {marginTop: VerticalScale(10)},
            ]}>
            <Text
              style={[
                diStyle.inst_title_common_style,
                {fontSize: dynamicFontSize(15)},
              ]}>
              Down Payment
            </Text>
            <Text
              style={{
                flex: 1,
                justifyContent: 'center',
                textAlign: 'right',
                fontSize: dynamicFontSize(14),
                color: 'black',
              }}>
              {detailsList.down_payment}
            </Text>
          </View>

          {/* Next Installment */}
          <View
            style={[
              diStyle.card_user_data_Common_style,
              {marginTop: VerticalScale(10)},
            ]}>
            <Text
              style={[
                diStyle.inst_title_common_style,
                {fontSize: dynamicFontSize(15)},
              ]}>
              Next Installment
            </Text>
            <Text
              style={{
                flex: 1,
                justifyContent: 'center',
                textAlign: 'right',
                fontSize: dynamicFontSize(14),
                color: 'black',
              }}>
              {detailsList.next_installment}
            </Text>
          </View>

          {/* Installments Ending */}
          <View
            style={[
              diStyle.card_user_data_Common_style,
              {marginTop: VerticalScale(10)},
            ]}>
            <Text
              style={[
                diStyle.inst_title_common_style,
                {fontSize: dynamicFontSize(15)},
              ]}>
              Installments Ending
            </Text>
            <Text
              style={{
                flex: 1,
                justifyContent: 'center',
                textAlign: 'right',
                fontSize: dynamicFontSize(14),
                color: 'black',
              }}>
              {detailsList.installments_end_date}
            </Text>
          </View>

          {/* Total Payment */}
          <View
            style={[
              diStyle.card_user_data_Common_style,
              {marginTop: VerticalScale(16)},
            ]}>
            <Text
              style={[
                diStyle.inst_title_common_style,
                {fontSize: dynamicFontSize(15)},
              ]}>
              Total Payment
            </Text>
            <Text
              style={{
                flex: 1,
                justifyContent: 'center',
                textAlign: 'right',
                fontSize: dynamicFontSize(14),
                color: 'black',
              }}>
              {detailsList.total_payment}
            </Text>
          </View>

          {/* Advance Payment */}
          <View
            style={[
              diStyle.card_user_data_Common_style,
              {marginTop: VerticalScale(16)},
            ]}>
            <Text
              style={[
                diStyle.inst_title_common_style,
                {fontSize: dynamicFontSize(15)},
              ]}>
              Advance Payment
            </Text>
            <Text
              style={{
                flex: 1,
                justifyContent: 'center',
                textAlign: 'right',
                fontSize: dynamicFontSize(14),
                color: 'black',
              }}>
              {detailsList.advance_payment}
            </Text>
          </View>

          {/* Pending Payments */}
          <View
            style={[
              diStyle.card_user_data_Common_style,
              {marginTop: VerticalScale(16)},
            ]}>
            <Text
              style={[
                diStyle.inst_title_common_style,
                {fontSize: dynamicFontSize(15)},
              ]}>
              Pending Payment
            </Text>
            <Text
              style={{
                flex: 1,
                justifyContent: 'center',
                textAlign: 'right',
                fontSize: dynamicFontSize(14),
                color: 'black',
              }}>
              {detailsList.pending_payment}
            </Text>
          </View>

          {/* Monthly Instalments */}
          <View
            style={[
              diStyle.card_user_data_Common_style,
              {marginTop: VerticalScale(16)},
            ]}>
            <Text
              style={[
                diStyle.inst_title_common_style,
                {fontSize: dynamicFontSize(15)},
              ]}>
              Monthly Payment
            </Text>
            <Text
              style={{
                flex: 1,
                justifyContent: 'center',
                textAlign: 'right',
                fontSize: dynamicFontSize(14),
                color: 'black',
              }}>
              {detailsList.monthly_instalments}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const diStyle = StyleSheet.create({
  di_container: {
    flex: 1,
    alignItems: 'center',
  },

  di_header_container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 5,
  },

  di_content_container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 30,
  },

  card_user_data_Container: {
    display: 'flex',
    marginTop: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    width: '90%',
    paddingHorizontal: 0,
    paddingVertical: 20,
  },

  card_user_data_Common_style: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  inst_title_common_style: {
    display: 'flex',
    fontFamily: fonts.PoppinsSemiBold,
    fontWeight: 'bold',
    color: '#333333',
  },

  inst_popup_container_data: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
});
export default DetailedInstallments;
