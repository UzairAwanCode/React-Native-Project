import { Dimensions, PixelRatio } from "react-native";

const {width, height} = Dimensions.get('window');
const standardWidth = 375;
export const dynamicFontSize = size => {
    const newSize = (size / standardWidth) * width;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  };