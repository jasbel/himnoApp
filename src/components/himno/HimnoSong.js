import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Storage from '../../libs/storage';
import Colors from '../../res/colors';

const widthScreen = Dimensions.get('window').width;

const HimnoSong = (props) => {

    const {route, navigation} = props;
    const [isFavorite, setIsFavorite] = useState(false)
    const [himno, setHimno] = useState(route.params.himno)
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
            filter = chorus.filter( choirItem => (compareArrayIgnore( choirItem.chorus_position_ignore, i)))
            choir = filter[0] && filter[0].choir;
        }

        choir = choir || '';

        return ({...item, choir})
    })

    const getIconChoir = () => {
        return require('himnoapp/src/assets/images/verse.png');
    }

    function compareArrayIgnore (arr, val) {
        return arr.find(arrValue => arrValue === val) ? false : true;
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
                    colors={[Colors.bkgLight, '#E0E9ED11']}
                />
            </View>
            <FlatList
                style={styles.content}
                data={verses}
                showsVerticalScrollIndicator={false}
                keyExtractor={( item , index) => index.toString()}
                renderItem={({item, index}) =>
                    <View key={item.key}>
                        <Text style={ styles.paragraph }> {item.paragraph} {"\n"}</Text>
                        { item.choir !==''  &&
                            <>
                                <Image
                                    style={ styles.iconChoir}
                                    source={ getIconChoir()}
                                />
                                <Text style={ styles.choir}> {item.choir} {"\n"}</Text>
                            </>
                        }
                        {(verses.length - 1 === index) && <View style={styles.spaceBottom}></View>}
                    </View>
                }
            />

            <Pressable
                onPress = { () => toggleFavorite() }
                style={ styles.containerFloat }
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
        backgroundColor: Colors.bkgLight,
        opacity: 0.9,
        borderRadius: 50
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
        fontSize: 25,
        lineHeight: 25,
        textAlign: 'center',
        color: Colors.txtBlack
    },
    iconChoir: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: -15,
        marginBottom: 15
    },
    choir: {
        fontSize: 25,
        lineHeight: 25,
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
