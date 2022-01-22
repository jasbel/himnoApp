import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Storage from '../../libs/storage';
import Colors from '../../res/colors';
import { responsive, widthScreen } from '../../res/responsive';
import { Songs } from '../../types/types';

interface Props {
  item: Songs;
  onPress: () => void;
}

const HimnoItem = ({ item, onPress }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { title_es, description_es, id, musicalNote } = item;

  const getIcon = () => {
    return require('himnoapp/src/assets/images/play.png');
  };
  const getIconStar = () => {
    if (isFavorite) return require('himnoapp/src/assets/images/star.png');

    if (!isFavorite) return require('himnoapp/src/assets/images/unstar.png');
  };

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
      <View style={[styles.figure, isFavorite && styles.figureIsFavorite]}>
        <Text
          style={[
            styles.numberHimno,
            isFavorite && styles.numberHimnoFavorite,
          ]}>
          {parseInt(id, 10) + 1}
        </Text>
        <Image style={styles.icon} source={getIcon()} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}> {title_es}</Text>
        <Text style={styles.description}> {description_es}</Text>
        <View style={styles.wrapIcon}>
          <Image style={styles.iconStar} source={getIconStar()} />
          <Text style={styles.note}> {musicalNote}</Text>
        </View>
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
  figure: {
    backgroundColor: Colors.white,
    borderColor: Colors.bkgLight,
    borderRadius: 8,
    borderWidth: 2,
    paddingTop: 10,
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 2,
    marginRight: 5,
    alignSelf: 'center',
    position: 'relative',
  },
  numberHimno: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 16,
    lineHeight: 15,
    fontWeight: 'bold',
    position: 'absolute',
    top: 3,
    left: 2,
    color: Colors.bkgTransparentPrimary,
  },
  numberHimnoFavorite: {
    color: Colors.bkgPrimary,
  },
  figureIsFavorite: {
    backgroundColor: Colors.yellow,
    borderColor: Colors.primary,
  },
  icon: {
    width: 30,
    height: 34,
  },
  content: {
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: Colors.bkgLight,
    width: '83%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: responsive(20, 18, widthScreen),
    color: Colors.txtPrimary,
    textShadowColor: Colors.txtBlack,
    textShadowRadius: 0.1,
  },
  note: {
    fontWeight: 'bold',
    fontSize: responsive(16, 14, widthScreen),
    color: Colors.txtPrimary,
    textShadowColor: Colors.txtBlack,
    textShadowRadius: 0.1,
  },
  description: {
    fontSize: responsive(17, 16, widthScreen),
    color: Colors.txtBlack,
  },
  wrapIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'flex-end',
  },
  iconStar: {
    width: 25,
    height: 25,
  },
});

export default HimnoItem;
