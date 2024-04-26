import {
  Alert,
  Dimensions,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import fonts from '../../assests/fonts';
import {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ModerateScale, VerticalScale} from '../responsive/Metrics';
import {EditInstData} from '../installments/backendFunc';
import {dynamicFontSize} from '../reuseable/Responsive';
import {addDataStyle} from './InstStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const EditInstallment = props => {
  const route = useRoute();
  const {title, data} = route.params;
  const [userName, setUserName] = useState(data.name || '');
  const [downPayment, setDownPayment] = useState(data.down_payment || '');
  const [nextIsntDate, setNextIsntDate] = useState(data.next_installment || '');
  const [isntEndDate, setIsntEndDate] = useState(
    data.installments_end_date || '',
  );
  const [productName, setProductName] = useState(data.product_name || '');
  const [totalPayment, setTotalPayment] = useState(data.total_payment || '');
  const [advancePayment, setAdvancePayment] = useState(
    data.pending_payment || '',
  );
  const [pendingPayments, setPendingPayments] = useState(
    data.advance_payment || '',
  );
  const [monthlyInsts, setMonthlyInsts] = useState(
    data.monthly_instalments || '',
  );
  const [instId, setInstId] = useState(data.id || '');
  const [validation, setValidation] = useState({
    userNameErr: false,
    nextIsntDateErr: false,
    isntEndDateErr: false,
    productNameErr: false,
    totalPaymentErr: false,
    advancePaymentErr: false,
    monthlyInstalmentsErr: false,
  });

  const navigation = useNavigation();

  const editInstallmentData = () => {
    let newErrInstDateErr = false;
    let userNameErr = false;
    let nextIsntDateErr = false;
    let isntEndDateErr = false;
    let productNameErr = false;
    let totalPaymentErr = false;
    let advancePaymentErr = false;
    let monthlyInstalmentsErr = false;

    if (!userName) {
      userNameErr = true;
    }

    if (!nextIsntDate) {
      nextIsntDateErr = true;
    }

    if (!isntEndDate) {
      isntEndDateErr = true;
    }

    if (!productName) {
      productNameErr = true;
    }

    if (!totalPayment) {
      totalPaymentErr = true;
    }

    if (!advancePayment) {
      advancePaymentErr = true;
    }

    if (!monthlyInsts) {
      monthlyInstalmentsErr = true;
    }

    setValidation({
      ...validation,
      productNameErr: productNameErr,
      newErrInstDateErr: newErrInstDateErr,
      userNameErr: userNameErr,
      nextIsntDateErr: nextIsntDateErr,
      isntEndDateErr: isntEndDateErr,
      totalPaymentErr: totalPaymentErr,
      advancePaymentErr: advancePaymentErr,
      monthlyInstalmentsErr: monthlyInstalmentsErr,
    });

    if (
      !productName ||
      !userName ||
      !nextIsntDate ||
      !isntEndDate ||
      !totalPayment ||
      !advancePayment ||
      !monthlyInsts
    ) {
      setTimeout(() => {
        setValidation({
          productNameErr: false,
          newErrInstDateErr: false,
          userNameErr: false,
          nextIsntDateErr: false,
          isntEndDateErr: false,
          totalPaymentErr: false,
          advancePaymentErr: false,
          monthlyInstalmentsErr: false,
        });
      }, 2000);
      return false;
    }
    // console.log(userName);
    EditInstData(
      instId,
      productName,
      userName,
      downPayment == '' ? 'none' : downPayment,
      nextIsntDate,
      isntEndDate,
      totalPayment,
      advancePayment,
      pendingPayments == null ? 'none' : pendingPayments,
      monthlyInsts,
      navigation,
    );
  };

  return (
    <ScrollView style={addDataStyle.ad_container}>
      <View style={{display: 'flex', alignItems: 'center'}}>
        {/* Heading */}
        <View style={addDataStyle.ad_heading_container}>
          <Text
            style={{
              color: '#15A196',
              fontSize: dynamicFontSize(22),
              fontFamily: fonts.PoppinsMedium,
              textAlign: 'center',
            }}>
            Edit Installment Record
          </Text>
        </View>

        {/* Product Name */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '82%',
          }}>
          {validation.productNameErr ? (
            <Text style={{color: 'red'}}>Enter Product Name</Text>
          ) : null}
        </View>

        <View
          style={{
            overflow: 'hidden',
            paddingBottom: 5,
            paddingHorizontal: 2,
            width: '82%',
            marginBottom: 5,
            display: 'flex',
            alignItems: 'center',
          }}>
          <View style={addDataStyle.ad_fields_continer}>
            <FontAwesome
              style={{marginLeft: 5, marginRight: 5}}
              name="product-hunt"
              color="#727272"
              size={ModerateScale(15)}
            />
            <TextInput
              style={{
                width: '82%',
                fontFamily: fonts.PoppinsMedium,
                paddingBottom: VerticalScale(12),
                color: '#727272',
              }}
              placeholder="Enter Product Name"
              placeholderTextColor="#727272"
              value={productName}
              onChangeText={txt => setProductName(txt)}
            />
          </View>
        </View>

        {/* Name */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '82%',
          }}>
          {validation.userNameErr ? (
            <Text style={{color: 'red'}}>Enter full name</Text>
          ) : null}
        </View>

        <View
          style={{
            overflow: 'hidden',
            paddingBottom: 5,
            paddingHorizontal: 2,
            width: '82%',
            marginBottom: 5,
          }}>
          <View style={addDataStyle.ad_fields_continer}>
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
                color: '#727272',
              }}
              placeholder="Enter Name"
              placeholderTextColor="#727272"
              value={userName}
              onChangeText={txt => setUserName(txt)}
            />
          </View>
        </View>

        {/* Down Payment */}

        <View
          style={{
            overflow: 'hidden',
            paddingBottom: 5,
            paddingHorizontal: 2,
            width: '82%',
            marginBottom: 5,
          }}>
          <View style={addDataStyle.ad_fields_continer}>
            <MaterialIcons
              style={{marginLeft: 5, marginRight: 5}}
              name="payment"
              color="#727272"
              size={ModerateScale(15)}
            />
            <TextInput
              style={{
                width: '82%',
                fontFamily: fonts.PoppinsMedium,
                paddingBottom: VerticalScale(12),
                color: '#727272',
              }}
              placeholder="Enter Down Payment"
              placeholderTextColor="#727272"
              value={downPayment}
              onChangeText={txt => {
                setDownPayment(txt);
              }}
            />
          </View>
        </View>

        {/* Choose Next Installment Date */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '82%',
          }}>
          {validation.nextIsntDateErr ? (
            <Text style={{color: 'red'}}>Enter next installment date</Text>
          ) : null}
        </View>

        <View
          style={{
            overflow: 'hidden',
            paddingBottom: 5,
            paddingHorizontal: 2,
            width: '82%',
            marginBottom: 5,
          }}>
          <View style={addDataStyle.ad_fields_continer}>
            <MaterialCommunityIcons
              style={{marginLeft: 5, marginRight: 5}}
              name="update"
              color="#727272"
              size={ModerateScale(15)}
            />
            <TextInput
              style={{
                width: '82%',
                fontFamily: fonts.PoppinsMedium,
                paddingBottom: VerticalScale(12),
                color: '#727272',
              }}
              placeholder="Next Installment Date"
              placeholderTextColor="#727272"
              value={nextIsntDate}
              onChangeText={txt => setNextIsntDate(txt)}
            />
          </View>
        </View>

        {/* Installment End Date */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '82%',
          }}>
          {validation.isntEndDateErr ? (
            <Text style={{color: 'red'}}>Enter ending installment date</Text>
          ) : null}
        </View>

        <View
          style={{
            overflow: 'hidden',
            paddingBottom: 5,
            paddingHorizontal: 2,
            width: '82%',
            marginBottom: 5,
          }}>
          <View style={addDataStyle.ad_fields_continer}>
            <Fontisto
              style={{marginLeft: 5, marginRight: 5}}
              name="date"
              color="#727272"
              size={ModerateScale(15)}
            />
            <TextInput
              style={{
                width: '82%',
                fontFamily: fonts.PoppinsMedium,
                paddingBottom: VerticalScale(12),
                color: '#727272',
              }}
              placeholder="Installments Ending Date"
              placeholderTextColor="#727272"
              value={isntEndDate}
              onChangeText={txt => setIsntEndDate(txt)}
            />
          </View>
        </View>

        {/* Total payment */}
        <View style={addDataStyle.common_fields_style}>
          {validation.totalPaymentErr ? (
            <Text style={{color: 'red'}}>Enter Total Payments</Text>
          ) : null}
        </View>

        <View
          style={{
            overflow: 'hidden',
            paddingBottom: 5,
            paddingHorizontal: 2,
            width: '82%',
            marginBottom: 5,
          }}>
          <View style={addDataStyle.ad_fields_continer}>
            <MaterialIcons
              style={{marginLeft: 5, marginRight: 5}}
              name="payments"
              color="#727272"
              size={ModerateScale(15)}
            />
            <TextInput
              style={{
                width: '82%',
                fontFamily: fonts.PoppinsMedium,
                paddingBottom: VerticalScale(12),
                color: '#727272',
              }}
              placeholder="Enter Total Product"
              placeholderTextColor="#727272"
              value={totalPayment}
              onChangeText={txt => setTotalPayment(txt)}
            />
          </View>
        </View>

        {/* Advance payment */}
        <View style={addDataStyle.common_fields_style}>
          {validation.advancePaymentErr ? (
            <Text style={{color: 'red'}}>Enter Advance payment</Text>
          ) : null}
        </View>

        <View
          style={{
            overflow: 'hidden',
            paddingBottom: 5,
            paddingHorizontal: 2,
            width: '82%',
            marginBottom: 5,
          }}>
          <View style={addDataStyle.ad_fields_continer}>
            <MaterialIcons
              style={{marginLeft: 5, marginRight: 5}}
              name="payment"
              color="#727272"
              size={ModerateScale(15)}
            />
            <TextInput
              style={{
                width: '82%',
                fontFamily: fonts.PoppinsMedium,
                paddingBottom: VerticalScale(12),
                color: '#727272',
              }}
              placeholder="Enter Advance payment"
              placeholderTextColor="#727272"
              value={advancePayment}
              onChangeText={txt => setAdvancePayment(txt)}
            />
          </View>
        </View>

        {/* Panding payment's */}
        <View
          style={{
            overflow: 'hidden',
            paddingBottom: 5,
            paddingHorizontal: 2,
            width: '82%',
            marginBottom: 5,
          }}>
          <View style={addDataStyle.ad_fields_continer}>
            <MaterialIcons
              style={{marginLeft: 5, marginRight: 5}}
              name="pending"
              color="#727272"
              size={ModerateScale(15)}
            />
            <TextInput
              style={{
                width: '82%',
                fontFamily: fonts.PoppinsMedium,
                paddingBottom: VerticalScale(12),
                color: '#727272',
              }}
              placeholder="Pending(Leave empty if none)"
              placeholderTextColor="#727272"
              value={pendingPayments}
              onChangeText={txt => setPendingPayments(txt)}
            />
          </View>
        </View>

        {/* Monthly instalments */}
        <View style={addDataStyle.common_fields_style}>
          {validation.monthlyInstalmentsErr ? (
            <Text style={{color: 'red'}}>Enter Monthly instalments</Text>
          ) : null}
        </View>

        <View
          style={{
            overflow: 'hidden',
            paddingBottom: 5,
            paddingHorizontal: 2,
            width: '82%',
            marginBottom: 5,
          }}>
          <View style={addDataStyle.ad_fields_continer}>
            <MaterialIcons
              style={{marginLeft: 5, marginRight: 5}}
              name="calendar-month"
              color="#727272"
              size={ModerateScale(15)}
            />
            <TextInput
              style={{
                width: '82%',
                fontFamily: fonts.PoppinsMedium,
                paddingBottom: VerticalScale(12),
                color: '#727272',
              }}
              placeholder="Enter Monthly instalments"
              placeholderTextColor="#727272"
              value={monthlyInsts}
              onChangeText={txt => setMonthlyInsts(txt)}
            />
          </View>
        </View>
      </View>

      {/* Edit Button */}
      <View
        style={{
          width: '100%',
          marginTop: 20,
          display: 'flex',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={addDataStyle.ad_record_button}
          activeOpacity={0.8}
          onPress={editInstallmentData}>
          <Text style={addDataStyle.ad_record_button_text}>Edit Record</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditInstallment;
