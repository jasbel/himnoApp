import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../res/colors';

interface Props {
  onChange: (query: string) => void;
  modeSearch: boolean;
}

const HimnoSearch = ({onChange, modeSearch}: Props) => {
  const [query, setQuery] = useState('' as string);

  const handleText = (cQuery: string) => {
    setQuery(cQuery);

    if (onChange) onChange(cQuery);
  };

  useEffect(() => {
    !modeSearch && setQuery('');
  }, [modeSearch]);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        onChangeText={handleText}
        value={query}
        placeholder={'Buscar...'}
        placeholderTextColor={Colors.txtDark}
      />
      <LinearGradient
        style={styles.spaceLinearGradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1.0}}
        colors={[Colors.bkgWhite, '#F6F6F611']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 8,
    position: 'relative',
  },
  spaceLinearGradient: {
    height: 0,
    width: '100%',
    position: 'absolute',
    paddingBottom: 6,
    bottom: -6,
    zIndex: 10,
  },
  textInput: {
    backgroundColor: Colors.grayLight,
    borderRadius: 50,
    padding: 12,
    paddingLeft: 18,
    paddingRight: 18,
    color: Colors.txtBlack,
    fontSize: 20,
  },
  textInputAndroid: {
    borderWidth: 0,
    borderBottomColor: Colors.grayLight,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});

export default HimnoSearch;
