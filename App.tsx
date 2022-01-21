import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import HimnoStack from './src/navigate/HimnoStack';

const App = () => {

  return (
    <NavigationContainer>
      <HimnoStack />
      {/* <HimnoStackTest /> */}
    </NavigationContainer>
  );
};

export default App;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HimnoStackTest = () => {
  return (<Text>Views</Text>);
};
