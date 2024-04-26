import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import fonts from '../../assests/fonts';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ModerateScale, VerticalScale} from '../responsive/Metrics';
import {EditInstData} from '../installments/backendFunc';
import {dynamicFontSize} from '../reuseable/Responsive';
import {editSales} from './backendSalesData';
import { addDataStyle } from './salesStyle';

const EditSalesRecord = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const {data} = route.params;
  const [productName, setProductName] = useState(data.productname || '');
  const [price, setPrice] = useState(data.price ? data.price.toString() : '');
  const [sellingDate, setSellingDate] = useState(data.sellingdate || '');
  const [salesId, setSalesId] = useState(data.id || '');
  const [validation, setValidation] = useState({
    productNameErr: false,
    priceErr: false,
    sellingDateErr: false,
  });

  const editSalesData = () => {
    let productNameErr = false;
    let priceErr = false;
    let sellingDateErr = false;

    if (!productName) {
      productNameErr = true;
    }

    if (!price) {
      priceErr = true;
    }

    if (!sellingDate) {
      sellingDateErr = true;
    }

    setValidation({
      ...validation,
      productNameErr: productNameErr,
      priceErr: priceErr,
      sellingDateErr: sellingDateErr,
    });

    if (!productName || !price || !sellingDate) {
      setTimeout(() => {
        setValidation({
          productNameErr: false,
          priceErr: false,
          sellingDateErr: false,
        });
      }, 2000);
      return false;
    }

    editSales(salesId, productName, price, sellingDate, navigation);
  };

  return (
    <View style={addDataStyle.ad_container}>
      {/* Heading */}
      <View style={addDataStyle.ad_heading_container}>
        <Text
          style={{
            color: '#15A196',
            fontSize: dynamicFontSize(22),
            fontFamily: fonts.PoppinsMedium,
          }}>
          Edit Sales Record
        </Text>
      </View>

      {/* Procuct Name */}
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
              color: '#727272'
            }}
            placeholder="Enter Product Name"
            placeholderTextColor="#727272"
            value={productName}
            onChangeText={txt => setProductName(txt)}
          />
        </View>
      </View>

      {/* Product Price */}
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '82%',
        }}>
        {validation.priceErr ? (
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
              color: '#727272'
            }}
            placeholder="Enter Selling Price"
            placeholderTextColor="#727272"
            value={price}
            onChangeText={txt => setPrice(txt)}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Selling Date */}
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '82%',
        }}>
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
        <View style={addDataStyle.ad_fields_continer}>
          <Fontisto
            style={{marginLeft: 5, marginRight: 5}}
            name="date"
            color="#727272"
            size={ModerateScale(15)}
            backgroundColor="none"
          />
          <TextInput
            style={{
              width: '82%',
              fontFamily: fonts.PoppinsMedium,
              paddingBottom: VerticalScale(12),
              color: '#727272'
            }}
            placeholder="Enter Selling Date"
            placeholderTextColor="#727272"
            value={sellingDate}
            onChangeText={txt => {
              setSellingDate(txt);
            }}
          />
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
          onPress={editSalesData}>
          <Text style={addDataStyle.ad_record_button_text}>Edit Record</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditSalesRecord;
