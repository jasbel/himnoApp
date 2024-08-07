import React, {useEffect} from 'react';

import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Colors from '../res/colors';
import {percent} from '../res/responsive';
import { useNavigation, useRoute } from '@react-navigation/native';

const HimnoHomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const getLogo = () => {
    return require('../../src/assets/images/logoHome.png');
  };

  const handlePress = () => {
    /* @ts-ignore */
    navigation.navigate('HimnoScreen', {})
  };
  const handlePressNew = () => {
    /* @ts-ignore */
    navigation.navigate('HimnoScreenNew', {})
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={getLogo()} />
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.textButton}>Ingresar</Text>
      </Pressable>

      <Pressable style={styles.buttonNew} onPress={handlePressNew}>
        <Text style={styles.textButtonNew}>Ingresar Beta</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.textFooter}> Version 1.9.1 By JAsbel & Kairos </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blueLight,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    marginBottom: percent(25),
  },
  button: {
    backgroundColor: Colors.orangeDark,
    padding: percent(2),
    paddingLeft: percent(4.5),
    paddingRight: percent(4.5),
    borderRadius: percent(2.8),
    marginBottom: percent(10),
  },
  buttonNew: {
    backgroundColor: Colors.orangeDark,
    padding: percent(2),
    paddingLeft: percent(4.5),
    paddingRight: percent(4.5),
    borderRadius: percent(2.8),
    marginBottom: percent(10),
  },
  textButton: {
    color: 'white',
    fontSize: percent(8.8),
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textShadowColor: Colors.bkgDark,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 5,
  },
  textButtonNew: {
    color: 'white',
    fontSize: percent(6),
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textShadowColor: Colors.bkgDark,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 12,
  },
  textFooter: {
    color: Colors.txtDark,
    fontSize: percent(2.5),
    fontWeight: 'bold',
  },
});

export default HimnoHomeScreen;
