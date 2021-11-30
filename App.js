import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HimnoStack from './src/navigate/HimnoStack';

const App = () => {

  return (
    <NavigationContainer>
      <HimnoStack />
    </NavigationContainer>
  );
};

export default App;
