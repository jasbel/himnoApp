import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Storage from '../../libs/storage';
import Colors from '../../res/colors';
import { responsive } from '../../res/responsive';

const widthScreen = Dimensions.get('window').width;

const HimnoSong = (props) => {

    const {route, navigation} = props;
    const [isFavorite, setIsFavorite] = useState(false);
    const [himno, setHimno] = useState(route.params.himno);
    const {paragraphs, chorus} = himno;

    const toggleFavorite = () => {
        if(isFavorite) { removeFavorite() }
            else { addFavorite(); }
    }

    const addFavorite = async () => {
        const himnoStr = JSON.stringify(himno);
        const key = `favorite-${himno.id}`;

        const stored = await Storage.instance.store(key, himnoStr);

        if(stored)
            setIsFavorite(true)
    }

    const removeFavorite = async () => {

        Alert.alert("Borrar de Favoritos", "Esta de acuerdo en Borrar... ?", [
            {
                text: 'CANCELAR',
                onPress: () => {},
                style: "cancel"
            },
            {
                text: "BORRAR",
                onPress: async () => {
                const key = `favorite-${himno.id}`;
                await Storage.instance.remove(key);

                setIsFavorite( false );
                },
                style: "destructive"
            }
        ]);
    }

    const getFavorite = async () => {
        try {
            const key = `favorite-${himno.id}`;

            const favStr = await Storage.instance.get(key);

            if(favStr !== null) {
                setIsFavorite(true )
            }
        } catch (error) {
            console.log(" Get Favorite Error:  ", error);
        }
    }

    /* TODO: mejorar la respuesta de indefinido , array vacio, o string vacio en choir y chorus */
    const verses = paragraphs.map((item, i) => {
        let choir ='';

        let filter = undefined ;
        if (chorus !== undefined) {
            filter = chorus.filter( choirItem => (compareArrayIgnore( choirItem.chorus_position_ignore, i + 1)));
            choir = filter.length && joinChoirs(filter);
        }

        choir = choir || '';

        return ({...item, choir})
    })

    function compareArrayIgnore (arr, val) {
        return arr.find(arrValue => arrValue === val) ? false : true;
    }

    function joinChoirs(filter) {
        return filter.length >= 2 ?
            filter.reduce((accumulatorChoir, currentChoir, currentIndex) =>
                accumulatorChoir  + currentChoir.choir + (filter.length !== currentIndex + 1 ? '\n\n' : ''), '' )
            :
            filter[0].choir;
    }

    const getIconChoir = () => {
        return require('himnoapp/src/assets/images/verse.png');
    }

    const getIconStar = () => {
        if (isFavorite) return require('himnoapp/src/assets/images/star.png');

        if (!isFavorite) return require('himnoapp/src/assets/images/unstar-white.png');
    }

    useEffect(() => {
        const { himno } = route.params;
        navigation.setOptions({
            title: himno.title_es,
            headerStyle: {
                backgroundColor: Colors.bkgDark,
            },
            headerTintColor: Colors.txtWhite
        })

        setHimno( himno);

    }, [])

    useEffect(() => {
        getFavorite()
    }, [himno])

    return (
        <View style={styles.container}>
            <View style={styles.spaceTop}>
                <LinearGradient
                    style={styles.spaceLinearGradient}
                    start={{x: 0, y: 0}} end={{x: 0, y: 1.0}}
                    colors={[Colors.bkgWhite, Colors.bkgTransparentWhite]}
                />
            </View>
            <FlatList
                style={styles.content}
                data={verses}
                showsVerticalScrollIndicator={false}
                keyExtractor={( item , index) => index.toString()}
                renderItem={({item, index}) =>
                    <View key={item.key}>
                        <Text style={ [styles.paragraph] }> {item.paragraph} {"\n"}</Text>
                        { item.choir !==''  &&
                            <>
                                <View style={styles.containerIconChoir}>
                                    <Image
                                        style={ styles.iconChoir}
                                        source={ getIconChoir()}
                                    />
                                </View>
                                <Text style={ [ styles.choir ]}>
                                        {item.choir} {"\n"}
                                </Text>
                            </>
                        }
                        {(verses.length - 1 === index) && <View style={styles.spaceBottom}></View>}
                    </View>
                }
            />

            <Pressable
                onPress = { () => toggleFavorite() }
                style={ [styles.containerFloat, isFavorite && styles.containerFloatFavorite] }
            >
                <Image
                    style={ styles.iconStar }
                    source={getIconStar()}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: Colors.bkgWhite,
        position: 'relative',
    },
    spaceTop: {
        position: 'absolute',
        top: 0,
        width: widthScreen,
        zIndex:10
    },
    spaceLinearGradient: {
        height: 18,
        width: '100%'
    },
    containerFloat: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: Colors.bkgTransparentPrimary,
        borderRadius: 50
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
        fontSize: responsive(28, 23, widthScreen),
        lineHeight: responsive(28, 24, widthScreen),
        textAlign: 'center',
        color: Colors.txtBlack
    },
    containerIconChoir: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: -15,
        marginBottom: 15,
        width: 170
    },
    iconChoir: {
        width: 170,
        height: 15
    },
    choir: {
        fontSize: responsive(28, 23, widthScreen),
        lineHeight: responsive(28, 24, widthScreen),
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: Colors.txtDark,
    },
    spaceBottom: {
        height: 48,
    }
})

export default HimnoSong
