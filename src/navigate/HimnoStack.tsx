import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HimnoScreen from '../screens/HimnoScreen';
import HimnoSongScreen from '../screens/HimnoSongScreen';
import Colors from '../res/colors';
import HimnoHomeScreen from '../screens/HimnoHomeScreen';

const Stack = createStackNavigator();

const HimnoStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: Colors.bkgBlack,
          shadowColor: Colors.bkgDark,
        },
        headerTintColor: Colors.txtLight,
      }}>
      <Stack.Screen name="HimnoHome" component={HimnoHomeScreen} />
      <Stack.Screen name="HimnoScreen" component={HimnoScreen} />
      <Stack.Screen name="HimnoSong" component={HimnoSongScreen} />
    </Stack.Navigator>
  );
};

export default HimnoStack;
