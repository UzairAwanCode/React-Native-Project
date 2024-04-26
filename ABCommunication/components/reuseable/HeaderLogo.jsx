import { Image, StyleSheet, View } from "react-native"
import Logo from '../../assests/images/logo.png';
import { ModerateScale } from "../responsive/Metrics";

const HeaderLogo = ()=>{
    return(
        <View style={styles.logo_background}>
          <Image
            source={Logo}
            style={styles.logo_image}
            resizeMode='contain'
          />
        </View>
    )
}

const styles = StyleSheet.create({
    logo_background:{
        marginTop: ModerateScale(-40),
        width: ModerateScale(80),    
    },
      
    logo_image:{
        width: "100%",
        borderColor:'#ddd9ce',
        backgroundColor: '#ddd9ce',
        borderWidth: ModerateScale(4),
        height: ModerateScale(80),
        borderRadius: 100
    }
})

export default HeaderLogo