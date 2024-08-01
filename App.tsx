/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import HimnoStack from './src/navigate/HimnoStack';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <HimnoStack />
    </NavigationContainer>
  );
}

export default App;
