import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import fonts from "../../assests/fonts";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { VerticalScale } from "../responsive/Metrics";
import { dynamicFontSize } from "../reuseable/Responsive";
import { useEffect, useState } from "react";

const InsCard = (props)=>{
  const navigation = useNavigation();
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(()=>{
    if(confirmDelete){
      props.deleteFunc(props.instData.id)
      setConfirmDelete(false)
    }
  },[confirmDelete])
  const handleDelete = ()=>{
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this record?',
      [
        {text: 'No'},
        {text: 'yes' , onPress: ()=>setConfirmDelete(true)}
      ],
      {cancelable: false}
    )
  }
  
  return(
      <View style={instCardStyle.card_user_data_Container}>
          {/* First Row */}
          <View style={instCardStyle.card_user_data_Common_style}>
            <Text style={[instCardStyle.inst_title_common_style,{fontSize: dynamicFontSize(12),}]}>{props.instData.date}</Text>
            <TouchableOpacity activeOpacity={0.8} style={{flex:1, justifyContent:'center', alignItems: 'flex-end'}} onPress={handleDelete}><Text style={{fontFamily: fonts.PoppinsRegular, fontSize: dynamicFontSize(12), fontWeight: "bold", color:'#FF0000'}}>Delete Record</Text></TouchableOpacity>
          </View>

          {/* Name */}
          <View style={[instCardStyle.card_user_data_Common_style,{marginTop: VerticalScale(16)}]}>
            <Text style={[instCardStyle.inst_title_common_style,{fontSize: dynamicFontSize(12),}]}>Name</Text>
            <Text style={{flex:1, textAlign:'right', fontSize: dynamicFontSize(12), color: 'black'}}>{props.instData.name}</Text>
          </View>

          {/* Next Installment */}
          <View style={[instCardStyle.card_user_data_Common_style,{marginTop: VerticalScale(10)}]}>
            <Text style={[instCardStyle.inst_title_common_style,{fontSize: dynamicFontSize(12),}]}>Next Installment</Text>
            <Text style={{flex:1, textAlign:'right', fontSize: dynamicFontSize(12), color: 'black'}}>{props.instData.next_installment}</Text>
          </View>

          {/* Installments Ending */}
          <View style={[instCardStyle.card_user_data_Common_style,{marginTop: VerticalScale(10)}]}>
            <Text style={[instCardStyle.inst_title_common_style,{fontSize: dynamicFontSize(12),}]}>Installments Ending</Text>
            <Text style={{flex:1, textAlign:'right', fontSize: dynamicFontSize(12), color: 'black'}}>{props.instData.installments_end_date}</Text>
          </View>

          {/* See Details */}
          <View style={[instCardStyle.card_user_data_Common_style,{marginTop: VerticalScale(20)}]}>
            <Text style={{flex: 2,fontFamily: fonts.PoppinsSemiBold, fontSize: dynamicFontSize(12), fontWeight: "bold", color:'#15A196'}}>Complete Record</Text>
            <TouchableOpacity activeOpacity={0.9} style={{flex: 1, flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor: '#15A196', padding: 5, width: wp(25), borderRadius:50}}
              onPress={()=>navigation.navigate('DetailedInstallments', {item: props.instData, title: 'Details'})}
            >
              <MaterialCommunityIcons name="account-details-outline" style={{color:"#FFFFFF", paddingTop: 2, fontSize: dynamicFontSize(12)}}/>
              <Text style={{color:"#FFFFFF", fontFamily: fonts.PoppinsRegular, fontSize: dynamicFontSize(12),}}> See Details</Text>
            </TouchableOpacity>
          </View>
      </View>
  )
}

const instCardStyle = StyleSheet.create({

    card_user_data_Container:{
      marginTop: VerticalScale(20),
      borderRadius: 10,
      marginHorizontal: 20,
      backgroundColor: "#FFFFFF",
      width: "90%",
      paddingHorizontal: 10,
      paddingVertical: 20
    },
  
    card_user_data_Common_style:{
      display: 'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems: 'center',
      marginBottom: 10
    },

    inst_title_common_style:{
      flex: 1,
      fontFamily: fonts.PoppinsSemiBold,
      fontWeight: "bold",
      color:'#333333'
    },

    inst_popup_container_data:{
      display:'flex',
      flexDirection:'row',
      paddingHorizontal: 10,
      justifyContent:'space-between',
    },

    inst_popup_headering_data:{
      fontSize: 15,
      color:'black',
      fontWeight:"500"
    },
});
export default InsCard;