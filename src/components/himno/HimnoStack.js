import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import HimnoScreen from './HimnoScreen';
import HimnoSong from './HimnoSong';
import Colors from '../../res/colors';

const Stack = createStackNavigator();

const HimnoStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: Colors.bkgBlack,
                    shadowColor: Colors.bkgDark
                },
                headerTintColor: Colors.txtLight
            }}
        >
            <Stack.Screen name="HimnoHome" component={ HimnoScreen } />
            <Stack.Screen name="HimnoSong" component={ HimnoSong } />
        </Stack.Navigator>
    )
}

export default HimnoStack
