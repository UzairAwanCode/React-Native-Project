import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import fonts from '../assests/fonts';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import InsCard from '../components/installments/InsCard';
import HeaderSection from '../components/reuseable/HeaderSection';
import {useIsFocused, useRoute, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import { deleteData, getData } from '../components/installments/backendFunc';

const Installments = () => {
  const isFocused = useIsFocused();
  const route = useRoute();
  const navigation = useNavigation();
  const {title} = route.params;
  const [instList, setInstList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData(setInstList, navigation);
  }, [isFocused]);

  useEffect(() => {
    const newUserList = instList.map(item => ({
      id: item.inst_id,
      date: item.inst_newinstdate,
      name: item.inst_username,
      issue_date: item.inst_newinstdate,
      down_payment: item.inst_downpayment,
      next_installment: item.inst_nextisntdate,
      product_name: item.product_name,
      total_payment: item.total_payment,
      pending_payment: item.pending_payment,
      installments_end_date: item.inst_isntenddate,
      advance_payment: item.advance_payment,
      monthly_instalments: item.monthly_instalments
    }));
    setUsers(newUserList);
  }, [instList]);

  const deleteInstRecord = (id)=>{
    deleteData(id)
    getData(setInstList, navigation);
  }
  
  return (
    <View style={ismtDataStyle.ins_container}>
      {/* Header Container */}
      <HeaderSection writeTitle={title} />

      {/* User's List */}
      <View style={ismtDataStyle.ins_user_list_Container}>
        <FlatList
          data={users}
          renderItem={({item}) => <InsCard instData={item} deleteFunc = {deleteInstRecord} />}
        />
      </View>
    </View>
  );
};

const ismtDataStyle = StyleSheet.create({
  ins_container: {
    flex: 1,
    alignItems: 'center',
  },

  ins_fields_continer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 28,
  },

  ins_user_list_Container: {
    width: '100%',
    height: 580,
  },
});
export default Installments;
