// Popup Pending Payments
// const pendingPayments = paymentValue => {
//   Alert.alert(
//     'Pending Payments',
//     paymentValue
//       .map((payment, index) => `${index + 1}. ${payment}`)
//       .join('\n'),
//   );
// };

// PopUp Received History
// const ReceivedPaymentHistory = (value)=>{
//     return(
//     <Modal visible={showReceivedData} animationType="fade" transparent={true}>
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent}}>
//         <View style={{backgroundColor:"#FFFFFF",padding: 5, width:"90%", borderRadius: 10}}>
//             <Entypo style={{color:'black',fontWeight: '700'}}name="cross" size={25} onPress={()=>setShowReceivedData(!showReceivedData)}/>
//             <Text style={{textAlign: 'center', fontSize:20, color:"#15A196"}}>Payment Received History</Text>
//             <View style={[diStyle.inst_popup_container_data,{marginTop:15, marginBottom:5}]}>
//             <Text style={diStyle.inst_popup_headering_data}>Received Through</Text>
//             <Text style={diStyle.inst_popup_headering_data}>Date</Text>
//             </View>

//             {value.map((receiveHistory, index)=>(
//             <View key={index} style={[diStyle.inst_popup_container_data,{marginVertical:5,}]}>
//                 <Text style={{width:"50%"}}>{receiveHistory[0]}</Text>
//                 <Text>{receiveHistory[1]}</Text>
//             </View>
//             ))}

//         </View>
//         </View>
//     </Modal>
//     )
// }

{
  /* Pending Payments */
}
{
  /* <View
            style={[
              diStyle.card_user_data_Common_style,
              {marginTop: VerticalScale(10)},
            ]}>
            <Text
              style={[
                diStyle.inst_title_common_style,
                {fontSize: dynamicFontSize(15)},
              ]}>
              Pending Payments
            </Text>
            {item.pending_payment.length === 0 ? (
              <Text>None</Text>
            ) : (
              <TouchableOpacity
                onPress={() => pendingPayments(item.pending_payment)}>
                <Text
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    textAlign: 'right',
                    fontSize: dynamicFontSize(14),
                  }}>
                  {item.pending_payment.length} See Details
                </Text>
              </TouchableOpacity>
            )}
          </View> */
}

{
  /* Received Payment */
}
{
  /* <View
            style={[
              diStyle.card_user_data_Common_style,
              {marginTop: VerticalScale(10)},
            ]}>
            <Text
              style={[
                diStyle.inst_title_common_style,
                {fontSize: dynamicFontSize(15)},
              ]}>
              Payments History
            </Text>
            {item.received_payments.length === 0 ? (
              <Text>None</Text>
            ) : (
              <TouchableOpacity
                onPress={() => setShowReceivedData(!showReceivedData)}>
                <Text
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    textAlign: 'right',
                    fontSize: dynamicFontSize(14),
                  }}>
                  {item.received_payments.length} See Details
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {ReceivedPaymentHistory(item.received_payments)} */
}

// Sales variables
  // const [productName, setProductName] = useState('');
  // const [sellingPrice, setSellingPrice] = useState();
  // const [sellingDate, setSellingDate] = useState('');