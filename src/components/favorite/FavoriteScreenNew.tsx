import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Colors from '../../res/colors';
import FavoriteEmptyState from './FavoriteEmptyState';
import HimnoItemNew from '../himno/HimnoItemNew';
import { INavigate, Song2 } from '../../../src/types/types';

interface Props {
  navigation: INavigate;
  favorites: Song2[];
}

const FavoriteScreenNew = ({navigation, favorites}: Props) => {
  const handlePress = (himno: Song2) => {
    navigation.navigate('HimnoSongNew', {himno});
  };

  return (
    <View style={styles.container}>
      {!favorites.length && <FavoriteEmptyState />}

      <FlatList
        data={favorites}
        renderItem={({item}) => (
          <HimnoItemNew
            key={item.id}
            item={item}
            onPress={() => handlePress(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: Colors.bkgLight,
    paddingTop: 12,
    // borderBottomWidth: 1,
    borderBottomColor: Colors.yellow,
    // marginBottom: 12,
  },
});

export default FavoriteScreenNew;
