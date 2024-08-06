import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { responsive } from '../../../res/responsive';
import Colors from '../../../res/colors';

interface Props {
  isFavorite: boolean;
  musicalNote: string;
}

const StarNote = ({isFavorite, musicalNote}: Props) => {
  const getIconStar = () => {
    if (isFavorite) return require('../../../../src/assets/images/star.png');

    if (!isFavorite) return require('../../../../src/assets/images/unstar.png');
  };

  return (
    <View style={styles.wrapIcon}>
      <Image style={styles.iconStar} source={getIconStar()} />
      <Text style={styles.note}> {musicalNote}</Text>
    </View>
  );
};

export default StarNote;

const styles = StyleSheet.create({
  wrapIcon: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
    alignItems: 'flex-end',
  },
  iconStar: {
    width: 25,
    height: 25,
  },
  note: {
    fontWeight: 'bold',
    fontSize: responsive(16, 14),
    color: Colors.txtPrimary,
    textShadowColor: Colors.txtBlack,
    textShadowRadius: 0.1,
  },
});
