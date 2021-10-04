import { Dimensions } from "react-native";

export const widthScreen = Dimensions.get('window').width;

export const responsive = (maxValue, minValue, currentScreen, maxScreen = 412, minScreen = 360) => {

    let currentValue;

    currentValue = (minValue + (maxValue - minValue)*( currentScreen - minScreen) / (maxScreen - minScreen) );

    return currentValue;
};

export const percent = ( valuePercent) => {
    return widthScreen * valuePercent / 100;
};
