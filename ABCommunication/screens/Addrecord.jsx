import { StyleSheet, Text, View } from "react-native"
import fonts from "../assests/fonts";
import AddData from "../components/addrecord/AddData";
import { useRoute } from "@react-navigation/native";
import { dynamicFontSize } from "../components/reuseable/Responsive";

const AddRecord = ()=>{

    const route = useRoute();
    const {check} = route.params;

    return(
        <View style = {addRecordStyle.add_container}>
            <View style = {addRecordStyle.add_heading_container}>
                <Text style = {[addRecordStyle.add_heading,{fontFamily: fonts.PoppinsBold, fontSize: dynamicFontSize(23)}]}>AB Communication</Text>
            </View>
            
            <AddData addRecordAction = {check}/>
        </View>
    )
}

const addRecordStyle = StyleSheet.create({
    add_container:{
        flex: 1,
        alignItems: 'center',
        position: 'relative'
    },
    add_heading_container:{
        marginTop: 40,
        marginBottom: 30
    },
    add_heading:{
        color: "#ffffff",
        fontWeight: 700
    }
})

export default AddRecord;