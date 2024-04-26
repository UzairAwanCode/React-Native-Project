import { Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

const guidLineBaseWidth = 375;
const guidLineBaseHeight = 812;

const HorizontalScale = (size)=>(width/guidLineBaseWidth) * size;
const VerticalScale = (size)=>(height/guidLineBaseHeight) * size;
const ModerateScale = (size, factor = 0.5) => size + (HorizontalScale(size) - size) * factor;

export {HorizontalScale, VerticalScale, ModerateScale};

// verticalScale = height, marginTop, marginBottom, marginVertical, line-height, paddingTop, paddingBottom, marginVertivcel, likeWise
// HorizontalScale = width, marginLeft, marginRight, marginHorizontal, paddingLeft , paddingRight, paddingHorizontal, likeWise
// moderateScale = font-size, borderRadius, likewise