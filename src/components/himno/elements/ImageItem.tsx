import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../../res/colors';
import { responsive } from '../../../res/responsive';

interface Props {
  id: string;
  isFavorite: boolean;
}

const ImageItem = ({isFavorite, id}: Props) => {
  const getIcon = () => {
    return require('himnoapp/src/assets/images/play.png');
  };
  return (
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
  );
};

export default ImageItem;

const styles = StyleSheet.create({
  numberHimno: {
    fontFamily: 'sans-serif-condensed',
    fontSize: responsive(16, 15),
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
  icon: {
    width: responsive(30, 23),
    height: responsive(34, 28),
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
  figureIsFavorite: {
    backgroundColor: Colors.yellow,
    borderColor: Colors.primary,
  },
});
