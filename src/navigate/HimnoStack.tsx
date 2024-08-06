import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HimnoScreen from '../screens/HimnoScreen';
import HimnoSongScreen from '../screens/HimnoSongScreen';
import Colors from '../res/colors';
import HimnoHomeScreen from '../screens/HimnoHomeScreen';
import HimnoScreenNew from '../screens/HimnoScreenNew';

const Stack = createNativeStackNavigator();

const HimnoStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: Colors.bkgBlack,
          // shadowColor: Colors.bkgDark,
        },
        headerTintColor: Colors.txtLight,
      }}>
      <Stack.Screen name="HimnoHome" component={HimnoHomeScreen} />
      <Stack.Screen name="HimnoScreen" component={HimnoScreen} />
      <Stack.Screen name="HimnoScreenNew" component={HimnoScreenNew} />
      <Stack.Screen name="HimnoSong" component={HimnoSongScreen} />
      <Stack.Screen name="HimnoSongNew" component={HimnoSongScreen} />
    </Stack.Navigator>
  );
};

export default HimnoStack;
