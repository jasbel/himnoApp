import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Colors from '../../res/colors'
import { responsive, widthScreen } from '../../res/responsive';

interface Props {
  item: any;
  isFinalVerse?: boolean;
  customFontSize?: number;
}

const ItemHimnoLetter = ({ item, isFinalVerse, customFontSize }: Props) => {
  const initialValues = {
    fontSize: responsive(28, 23, widthScreen),
    fontSizeIncremental: 1,
  };


  const getIconChoir = () => {
    return require('himnoapp/src/assets/images/verse.png');
  };

  return (
    <View key={item.key}>
      <Text
        style={[
          styles.paragraph,
          {
            fontSize: customFontSize,
            lineHeight: customFontSize,
          },
        ]}>
        {item.paragraph} {'\n'}
      </Text>
      {item.choir !== '' && (
        <>
          <View style={styles.containerIconChoir}>
            <Image style={styles.iconChoir} source={getIconChoir()} />
          </View>
          <Text
            style={[
              styles.choir,
              {
                fontSize: customFontSize,
                lineHeight: customFontSize,
              },
            ]}>
            {item.choir} {'\n'}
          </Text>
        </>
      )}
      {isFinalVerse && (
        <View style={styles.spaceBottom} />
      )}
    </View>
  )
}

export default ItemHimnoLetter


const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: Colors.bkgWhite,
    position: 'relative',
  },
  headerButton: {},
  headerRightContainer: {
    flexDirection: 'row',
  },
  spaceTop: {
    position: 'absolute',
    top: 0,
    width: widthScreen,
    zIndex: 10,
  },
  spaceLinearGradient: {
    height: 18,
    width: '100%',
  },
  containerFloat: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: Colors.bkgTransparentPrimary,
    borderRadius: 50,
  },
  containerFloatFavorite: {
    backgroundColor: Colors.bkgTransparentDark,
  },
  iconStar: {
    margin: 6,
    width: 30,
    height: 30,
  },
  content: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  paragraph: {
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
    color: Colors.txtBlack,
  },
  containerIconChoir: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: -15,
    marginBottom: 15,
    width: 170,
  },
  iconChoir: {
    width: 170,
    height: 15,
  },
  choir: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Colors.txtDark,
  },
  spaceBottom: {
    height: 48,
  },
});