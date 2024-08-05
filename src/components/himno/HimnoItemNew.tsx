import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Storage from '../../libs/storage';
import Colors from '../../res/colors';
import { responsive } from '../../res/responsive';
import { Songs, Song2 } from '../../types/types';
import ImageItem from './elements/ImageItem';
import StarNote from './elements/StarNote';

interface Props {
  item: Song2;
  onPress: () => void;
}

const HimnoItemNew = ({ item, onPress }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { title,  code, musicalNote, paragraphs} = item;

  const getFavorite = async () => {
    try {
      const key = `favorite-${item.id}`;
      const favStr = await Storage.instance.get(key);

      if (favStr !== null) setIsFavorite(true);
    } catch (error) {
      console.log(' Get Favorite Error:  ', error);
    }
  };

  useEffect(() => {
    getFavorite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageItem  id={code} isFavorite={isFavorite}/>

      <View style={styles.content}>
        <View style={{flex: 1}}>
          <Text style={styles.title} numberOfLines={1}> {title}</Text>
          <Text style={styles.description} numberOfLines={1}> {paragraphs[0].paragraph}</Text>
        </View>

        <StarNote isFavorite={isFavorite} musicalNote={musicalNote} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  content: {
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: Colors.bkgLight,
    flexDirection:'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: responsive(20, 18),
    color: Colors.txtPrimary,
    textShadowColor: Colors.txtBlack,
    textShadowRadius: 0.1,
  },

  description: {
    fontSize: responsive(17, 16),
    color: Colors.txtBlack,
  },


});

export default HimnoItemNew;
