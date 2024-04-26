import {
  Alert,
  Button,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import fonts from '../../assests/fonts';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ModerateScale, VerticalScale} from '../responsive/Metrics';
import {saveInstallmentData, saveSalesData} from './AddNewRecord';
import {db} from '../reuseable/BackendDBConn';
import {dynamicFontSize} from '../reuseable/Responsive';
import {addDataStyle} from './AddDataStyle';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddData = props => {
  const [selectedField, setSelectedField] = useState(null);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('empty');

  // Installment variables
  const [newInstDate, setNewInstDate] = useState(''); //use for both
  const [userName, setUserName] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [nextIsntDate, setNextIsntDate] = useState('');
  const [isntEndDate, setIsntEndDate] = useState('');
  const [totalPayment, setTotalPayment] = useState();
  const [advancePayment, setAdvancePayment] = useState();
  const [pendingPayments, setPendingPayments] = useState();
  const [monthlyInsts, setMonthlyInsts] = useState();

  // Sales variables
  const [productName, setProductName] = useState(''); //use for both
  const [sellingPrice, setSellingPrice] = useState('');
  const [sellingDate, setSellingDate] = useState(new Date());

  const [validation, setValidation] = useState({
    newErrInstDateErr: false,
    userNameErr: false,
    nextIsntDateErr: false,
    isntEndDateErr: false,
    productNameErr: false,
    sellingPriceErr: false,
    sellingDateErr: false,
    totalPaymentErr: false,
    advancePaymentErr: false,
    monthlyInstalmentsErr: false,
  });

  const route = useRoute();
  const check = props.addRecordAction;
  const {title, data} = route.params;
  const navigation = useNavigation();
  const [isChecked, setIsCheck] = useState(false);
  let renderTitle, btnName;
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Create Table in database
  useEffect(() => {
    db.transaction(function (txn) {
      // Installment Table
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='installments_tbl'",
        [],
        function (tx, res) {
          console.log('Installment:', res.rows.length);
          console.log(res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS installments_tbl', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS installments_tbl(inst_id INTEGER PRIMARY KEY AUTOINCREMENT,inst_newinstdate VARCHAR(255), inst_username VARCHAR(255), inst_downpayment VARCHAR(255), inst_nextisntdate VARCHAR(255), inst_isntenddate VARCHAR(255), product_name VARCHAR(255), total_payment VARCHAR(255), advance_payment VARCHAR(255), pending_payment VARCHAR(255), monthly_instalments VARCHAR(255))',
              [],
            );
          } else {
            txn.executeSql(
              'PRAGMA table_info(installments_tbl)',
              [],
              function (tx, res) {
                for (var i = 0; i < res.rows.length; i++) {
                  var column = res.rows.item(i);
                  // console.log(
                  //   'Column name: ' + column.name + ', Type: ' + column.type,
                  // );
                }
              },
            );
          }
        },
      );

      // Sales Table
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='sales_tbl'",
        [],
        function (tx, res) {
          console.log('Sales:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS sales_tbl', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS sales_tbl(sales_id INTEGER PRIMARY KEY AUTOINCREMENT,sales_newinstdate VARCHAR(255) , sales_productname VARCHAR(255), sales_sellingprice VARCHAR(255), sales_sellingdate VARCHAR(255))',
              [],
            );
          } else {
            txn.executeSql(
              'PRAGMA table_info(sales_tbl)',
              [],
              function (tx, res) {
                for (var i = 0; i < res.rows.length; i++) {
                  var column = res.rows.item(i);
                  // console.log(
                  //   'Column name: ' + column.name + ', Type: ' + column.type,
                  // );
                }
              },
            );
          }
        },
      );
    });

    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    setNewInstDate(currentDate);
  }, []);

  function BtnTitle(m) {
    btnName = m;
  }

  switch (title) {
    case 'Edit Installment Record':
      renderTitle = 'Edit Installment Record';
      BtnTitle('Edit Record');
      break;

    case 'Edit Sales Record':
      renderTitle = 'Edit Sales Record';
      BtnTitle('Edit Record');
      break;

    default:
      renderTitle = check ? 'Add Sales Record' : 'Add Installment Record';
      BtnTitle('Add Record');
      break;
  }

  const handleInstallmentSubmit = () => {
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

    setNewInstDate(currentDate);

    // Save Installment Data Api
    saveInstallmentData(
      productName,
      newInstDate,
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
    setProductName('');
    setNewInstDate('');
    setUserName('');
    setDownPayment('');
    setNextIsntDate('');
    setIsntEndDate('');
    setTotalPayment(null);
    setAdvancePayment(null);
    setPendingPayments(null);
    setMonthlyInsts(null);
  };

  const handleSalesSubmit = () => {
    let productNameErr = false;
    let sellingPriceErr = false;
    let sellingDateErr = false;

    if (!productName) {
      productNameErr = true;
    }

    if (!sellingPrice) {
      sellingPriceErr = true;
    }

    if (!sellingDate) {
      sellingDateErr = true;
    }

    setValidation({
      ...validation,
      productNameErr: productNameErr,
      sellingPriceErr: sellingPriceErr,
      sellingDateErr: sellingDateErr,
    });

    if (!productName || !sellingPrice || !sellingDate) {
      setTimeout(() => {
        setValidation({
          productNameErr: false,
          sellingPriceErr: false,
          sellingDateErr: false,
        });
      }, 2000);
      return false;
    }
    setNewInstDate(currentDate);

    saveSalesData(productName, sellingPrice, sellingDate, navigation);
    setProductName('');
    setSellingPrice('');
    setSellingDate('');
  };

  const datePickerFunc = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    switch (selectedField) {
      case 'selling':
        setSellingDate(formattedDate);
        break;
      case 'nextInstallment':
        setNextIsntDate(formattedDate);
        break;
      case 'installmentsEnd':
        setIsntEndDate(formattedDate);
        break;
      default:
        break;
    }
  };

  const showMode = (currentMode, field) => {
    setShow(true);
    setMode(currentMode);
    setSelectedField(field);
  };

  return (
    <ScrollView style={addDataStyle.ad_container}>
      {/* Heading */}
      <View style={addDataStyle.ad_heading_container}>
        <Text
          style={{
            color: '#15A196',
            fontSize: dynamicFontSize(22),
            fontFamily: fonts.PoppinsMedium,
            textAlign: 'center',
          }}>
          {renderTitle}
        </Text>
      </View>

      {/* Procuct name use in both*/}
      <View style={{display: 'flex', alignItems: 'center'}}>
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
      </View>

      {check ? (
        <View style={{display: 'flex', alignItems: 'center'}}>
          {/* Product Price */}
          <View style={addDataStyle.common_fields_style}>
            {validation.sellingPriceErr ? (
              <Text style={{color: 'red'}}>Enter product price</Text>
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
                name="sell"
                color="#727272"
                size={ModerateScale(15)}
                backgroundColor="none"
              />
              <TextInput
                style={{
                  width: '82%',
                  fontFamily: fonts.PoppinsMedium,
                  paddingBottom: VerticalScale(12),
                  color: '#727272',
                }}
                placeholder="Enter Selling Price"
                placeholderTextColor="#727272"
                value={sellingPrice}
                onChangeText={txt => setSellingPrice(txt)}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Selling Date */}
          <View style={addDataStyle.common_fields_style}>
            {validation.sellingDateErr ? (
              <Text style={{color: 'red'}}>Enter selling date</Text>
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
            <Pressable
              onPress={() => showMode('date', 'selling')}
              activeOpacity={1}
              style={addDataStyle.ad_fields_continer}>
              <Fontisto
                style={{marginLeft: 5, marginRight: 5}}
                name="date"
                color="#727272"
                size={ModerateScale(15)}
                backgroundColor="none"
              />
              <TextInput
                editable={false}
                style={{
                  width: '82%',
                  fontFamily: fonts.PoppinsMedium,
                  paddingBottom: VerticalScale(12),
                  color: '#727272',
                }}
                placeholder="Enter Selling Date"
                placeholderTextColor="#727272"
                value={sellingDate}
              />
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={{display: 'flex', alignItems: 'center'}}>
          {/* Name */}
          <View style={addDataStyle.common_fields_style}>
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
                placeholder="Down Payment(Leave empty if none)"
                placeholderTextColor="#727272"
                value={downPayment}
                onChangeText={txt => {
                  setDownPayment(txt);
                }}
              />
            </View>
          </View>

          {/* Choose Next Installment Date */}
          <View style={addDataStyle.common_fields_style}>
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
            <Pressable
              onPress={() => showMode('date', 'nextInstallment')}
              activeOpacity={1}
              style={addDataStyle.ad_fields_continer}>
              <MaterialCommunityIcons
                style={{marginLeft: 5, marginRight: 5}}
                name="update"
                color="#727272"
                size={ModerateScale(15)}
              />
              <TextInput
                editable={false}
                style={{
                  width: '82%',
                  fontFamily: fonts.PoppinsMedium,
                  paddingBottom: VerticalScale(12),
                  color: '#727272',
                }}
                placeholder="Next Installment Date"
                placeholderTextColor="#727272"
                value={nextIsntDate}
              />
            </Pressable>
          </View>

          {/* Installment End Date */}
          <View style={addDataStyle.common_fields_style}>
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
            <Pressable
              onPress={() => showMode('date', 'installmentsEnd')}
              activeOpacity={1}
              style={addDataStyle.ad_fields_continer}>
              <Fontisto
                style={{marginLeft: 5, marginRight: 5}}
                name="date"
                color="#727272"
                size={ModerateScale(15)}
              />
              <TextInput
                editable={false}
                style={{
                  width: '82%',
                  fontFamily: fonts.PoppinsMedium,
                  paddingBottom: VerticalScale(12),
                  color: '#727272',
                }}
                placeholder="Installments Ending Date"
                placeholderTextColor="#727272"
                value={isntEndDate}
              />
            </Pressable>
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
      )}

      {/* Add Button */}
      <View
        style={{
          width: '100%',
          marginTop: 20,
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={addDataStyle.ad_record_button}
          activeOpacity={0.8}
          onPress={check ? handleSalesSubmit : handleInstallmentSubmit}>
          <Text style={addDataStyle.ad_record_button_text}>{btnName}</Text>
        </TouchableOpacity>
      </View>

      {/* show hide datapicker */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={datePickerFunc}
          style={{color: 'black'}}
        />
      )}
    </ScrollView>
  );
};

export default AddData;
