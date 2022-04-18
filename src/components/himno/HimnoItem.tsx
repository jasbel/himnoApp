import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Storage from '../../libs/storage';
import Colors from '../../res/colors';
import { responsive } from '../../res/responsive';
import { Songs } from '../../types/types';
import ImageItem from './elements/ImageItem';
import StarNote from './elements/StarNote';

interface Props {
  item: Songs;
  onPress: () => void;
}

const HimnoItem = ({ item, onPress }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { title_es, description_es, id, musicalNote } = item;

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
      <ImageItem  id={id} isFavorite={isFavorite}/>

      <View style={styles.content}>
        <View style={{flex: 1}}>
          <Text style={styles.title} numberOfLines={1}> {title_es}</Text>
          <Text style={styles.description} numberOfLines={1}> {description_es}</Text>
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

export default HimnoItem;
