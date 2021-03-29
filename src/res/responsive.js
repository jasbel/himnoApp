export const responsive = (maxValue, minValue, currentScreen, maxScreen = 412, minScreen = 360) => {

    let currentValue;

    currentValue = (minValue + (maxValue - minValue)*( currentScreen - minScreen) / (maxScreen - minScreen) );

    return currentValue;
}