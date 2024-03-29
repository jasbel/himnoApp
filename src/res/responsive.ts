import { Dimensions } from "react-native";

export const widthScreen = Dimensions.get('window').width;

export const responsive = (maxValue: number, minValue: number, currentScreen: number = widthScreen, maxScreen = 412, minScreen = 320) => {

    let currentValue;

    currentValue = (minValue + (maxValue - minValue) * (currentScreen - minScreen) / (maxScreen - minScreen));

    return currentValue;
};

export const percent = (valuePercent: number) => {
    return widthScreen * valuePercent / 100;
};
