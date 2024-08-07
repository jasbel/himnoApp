import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ItemHimnoLetter from '../components/himno/ItemHimnoLetter';
import Storage from '../libs/storage';
import Colors from '../res/colors';
import {responsive} from '../res/responsive';
import {opacityColor} from '../helpers/helper';
import { useNavigation, useRoute } from '@react-navigation/native';

const widthScreen = Dimensions.get('window').width;

const initialValues = {
  fontSize: responsive(28, 23, widthScreen),
  fontSizeIncremental: 1,
};

const HimnoSongScreen = () => {
  // const {route} = props;
  const route = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  /* @ts-ignore */
  const [himno, setHimno] = useState(route.params?.himno);
  const {paragraphs, chorus} = himno;
  const [customFontSize, setCustomFontSize] = useState(initialValues.fontSize);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const addFavorite = async () => {
    const himnoStr = JSON.stringify(himno);
    const key = `favorite-${himno.id}`;

    const stored = await Storage.instance.store(key, himnoStr);

    if (stored) {
      setIsFavorite(true);
    }
  };

  const removeFavorite = async () => {
    Alert.alert('Borrar de Favoritos', 'Esta de acuerdo en Borrar... ?', [
      {
        text: 'CANCELAR',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'BORRAR',
        onPress: async () => {
          const key = `favorite-${himno.id}`;
          await Storage.instance.remove(key);

          setIsFavorite(false);
        },
        style: 'destructive',
      },
    ]);
  };

  const getFavorite = async () => {
    try {
      const key = `favorite-${himno.id}`;

      const favStr = await Storage.instance.get(key);

      if (favStr !== null) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.log(' Get Favorite Error:  ', error);
    }
  };

  /* TODO: mejorar la respuesta de indefinido , array vacio, o string vacio en choir y chorus */
  const verses = paragraphs.map((item: any, i: number) => {
    let choir = '';

    let filter;
    if (chorus !== undefined) {
      filter = chorus.filter((choirItem: {chorus_position_ignore: any}) =>
        compareArrayIgnore(choirItem.chorus_position_ignore, i + 1),
      );
      choir = filter.length && joinChoirs(filter);
    }

    choir = choir || '';

    return {...item, choir};
  });

  function compareArrayIgnore(arr: any[], val: any) {
    return arr.find((arrValue: any) => arrValue === val) ? false : true;
  }

  function joinChoirs(filter: any[]) {
    return filter.length >= 2
      ? filter.reduce(
          (
            accumulatorChoir: any,
            currentChoir: {choir: any},
            currentIndex: number,
          ) =>
            accumulatorChoir +
            currentChoir.choir +
            (filter.length !== currentIndex + 1 ? '\n\n' : ''),
          '',
        )
      : filter[0].choir;
  }

  const getIconStar = () => {
    if (isFavorite) {return require('../../src/assets/images/star.png');}

    if (!isFavorite)
      {return require('../../src/assets/images/unstar-white.png');}
  };

  const onPressFontSize = (valueFontSize: number) => {
    setCustomFontSize((cFontSize: any) => cFontSize + valueFontSize);
  };

  const getInit = () => {
    /* @ts-ignore */
    const {himno} = route.params;
    navigation.setOptions({
      title: himno.title_es,
      headerStyle: {
        backgroundColor: Colors.bkgDark,
      },
      headerTintColor: Colors.txtWhite,
      // headerRight: () => (      ),
    });

    setHimno(himno);
  };

  useEffect(() => {
    getInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFavorite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [himno]);

  return (
    <View style={styles.container}>
      <View style={styles.spaceTop}>
      </View>
      <FlatList
        style={styles.content}
        data={verses}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <ItemHimnoLetter
            item={item}
            isFinalVerse={verses.length - 1 === index}
            customFontSize={customFontSize}
          />
        )}
      />

      <View style={styles.headerRightContainer}>
        <Pressable
          style={[styles.btn]}
          onPress={() => onPressFontSize(-initialValues.fontSizeIncremental)}>
          <Text style={[styles.btnText]}>-t</Text>
        </Pressable>
        <Pressable
          style={[styles.btn]}
          onPress={() => onPressFontSize(initialValues.fontSizeIncremental)}>
          <Text style={styles.btnText}>+t</Text>

        </Pressable>
      </View>

      <Pressable
        onPress={() => toggleFavorite()}
        style={[
          styles.containerFloat,
          isFavorite && styles.containerFloatFavorite,
        ]}>
        <Image style={styles.iconStar} source={getIconStar()} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: Colors.bkgWhite,
    position: 'relative',
  },
  headerRightContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: Colors.bkgPrimary,
    padding: 6,
    width: 45,
    height: 45,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  btnText: {
    color: Colors.white,
    fontSize: 20,
  },
  spaceTop: {
    position: 'absolute',
    top: 0,
    width: widthScreen,
    zIndex: 10,
    borderBottomColor: opacityColor(Colors.bkgWhite, 0.5),
    borderBottomWidth: 4,
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

export default HimnoSongScreen;
