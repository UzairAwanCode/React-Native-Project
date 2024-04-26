import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import fonts from "../../assests/fonts";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { VerticalScale } from "../responsive/Metrics";
import { useNavigation } from "@react-navigation/native";
import { dynamicFontSize } from "../reuseable/Responsive";
import { deleteSalesData } from "./backendSalesData";
import { useEffect, useState } from "react";

const Card = (props)=>{
  const navigation = useNavigation();
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(()=>{
    if(confirmDelete){
      props.deleteFunc(props.salesData.id)
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
      <View style={cardStyle.card_user_data_Container}>
        
        {/* First Row */}
        <View style={cardStyle.card_user_data_Common_style}>
          <Text style={[cardStyle.card_user_data_titile_style,{fontSize: dynamicFontSize(12),}]}>{props.salesData.date}</Text>
          <TouchableOpacity onPress={handleDelete} activeOpacity={0.8}><Text style={{fontFamily: fonts.PoppinsRegular, fontSize: dynamicFontSize(12), fontWeight: "bold", color:'#FF0000'}}>Delete Record</Text></TouchableOpacity>
        </View>

        {/* Second Row */}
        <View style={[cardStyle.card_user_data_Common_style,{marginTop: VerticalScale(20)}]}>
          <Text style={{fontFamily: fonts.PoppinsSemiBold, fontSize: dynamicFontSize(12), fontWeight: "bold", color:'#15A196'}}>Edit Record</Text>
          <TouchableOpacity 
            activeOpacity={0.9} 
            style={{display: 'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor: '#15A196', padding: 5, width: wp(25), borderRadius:50}}
            onPress={()=> navigation.navigate('EditSalesRecord', {data: props.salesData})}
          >
            <FontAwesome name="edit" style={{color:"#FFFFFF", fontSize: dynamicFontSize(12), paddingTop: 2}}/>
            <Text style={{color:"#FFFFFF", fontFamily: fonts.PoppinsRegular, fontSize: dynamicFontSize(12),}}> Edit Record</Text>
          </TouchableOpacity>
        </View>

        {/* Third Row */}
        <View style={[cardStyle.card_user_data_Common_style,{marginTop: VerticalScale(16)}]}>
          <Text style={[cardStyle.card_user_data_titile_style,{fontSize: dynamicFontSize(12),}]}>Product Name</Text>
          <Text style={{flex:1, textAlign:'right', fontSize: dynamicFontSize(12), color: 'black'}}>{props.salesData.productname}</Text>
        </View>

        {/* Fourth Row */}
        <View style={[cardStyle.card_user_data_Common_style,{marginTop: VerticalScale(16)}]}>
          <Text style={[cardStyle.card_user_data_titile_style,{fontSize: dynamicFontSize(12),}]}>Selling Price</Text>
          <Text style={{flex:1, textAlign:'right', fontSize: dynamicFontSize(12), color: 'black'}}>{props.salesData.price}</Text>
        </View>

        {/* Fifth Row */}
        <View style={[cardStyle.card_user_data_Common_style,{marginTop: VerticalScale(16)}]}>
          <Text style={[cardStyle.card_user_data_titile_style,{fontSize: dynamicFontSize(12),}]}>Selling Date</Text>
          <Text style={{flex:1, textAlign:'right', fontSize: dynamicFontSize(12), color: 'black'}}>{props.salesData.sellingdate}</Text>
        </View>

      </View>
  )
}

const cardStyle = StyleSheet.create({

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
    },

    card_user_data_titile_style:{
      flex:1,
      fontFamily: fonts.PoppinsSemiBold,
      fontWeight: "bold",
      color:'#333333'
    }
  });

export default Card;