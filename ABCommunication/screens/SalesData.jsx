import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import fonts from '../assests/fonts';
import Card from '../components/salesdata/Card';
import HeaderSection from '../components/reuseable/HeaderSection';
import { useIsFocused, useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { deleteSalesData, getSalesData } from '../components/salesdata/backendSalesData';


const SalesData = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {title} = route.params;
  const isFocused = useIsFocused();
  const [salesList, setSalesList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getSalesData(setSalesList, navigation);
  }, [isFocused]);

  useEffect(() => {
    const newUserList = salesList.map(item => ({
      id: item.sales_id,
      date: item.sales_newinstdate,
      productname: item.sales_productname,
      price: item.sales_sellingprice,
      sellingdate: item.sales_sellingdate,
    }));
    setUsers(newUserList);
  }, [salesList]);

  const deleteData = (id)=>{
    deleteSalesData(id)
    getSalesData(setSalesList,navigation)
  }


  return (
    <View style={salesDataStyle.sd_container}>
      {/* Header Container */}
      <HeaderSection writeTitle = {title}/>

      {/* User's List */}
      <View style={salesDataStyle.sd_user_list_Container}>
          <FlatList
          data={users}
          renderItem={({item})=> <Card salesData={item} deleteFunc= {deleteData}/>}
          />
      </View>
    </View>
  );
};

const salesDataStyle = StyleSheet.create({
  sd_container: {
    flex: 1,
    alignItems: 'center',
  },

  sd_header_container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 5,
  },

  sd_fields_continer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: '#fff',
    width: "100%",
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 28,
  },

  sd_user_list_Container:{
    width: "100%",
    height: 580,
  },
});
export default SalesData;
