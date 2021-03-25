import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Storage from '../../libs/storage';
import Colors from '../../res/colors';

const HimnoSong = (props) => {

    const {route, navigation} = props;

    const [himno, setHimno] = useState(route.params.himno)

    const {paragraphs, chorus} = himno;

    const [isFavorite, setIsFavorite] = useState(false)

    const toggleFavorite = () => {
        if(isFavorite) { removeFavorite() }
            else { addFavorite(); }
    }

    const addFavorite =async () => {
        const himnoStr = JSON.stringify(himno);
        const key = `favorite-${himno.id}`;

        const stored = await Storage.instance.store(key, himnoStr);

        if(stored)
            setIsFavorite(true)
    }

    const removeFavorite = async () => {

        Alert.alert("Remove favorite", "Are You Sure ?", [
            {
                text: 'cancel',
                onPress: () => {},
                style: "cancel"
            },
            {
                text: "Remove",
                onPress: async () => {
                const key = `favorite-${himno.id}`;
                // const instanceRemove = await Storage.instance.remove(key);
                await Storage.instance.remove(key);

                setIsFavorite( false );
                },
                style: "destructive"
            }
        ]);
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

        if (!isFavorite) return require('himnoapp/src/assets/images/unstar.png');
    }

    const getFavorite = async () => {
        try {
            const key = `favorite-${himnos.id}`;

            const favStr = await Storage.instance.get(key);

            if(favStr !== null) {
                setIsFavorite(true )
            }
        } catch (error) {
            console.log(" Get FAvorite error:  ",error);
        }
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
            
            <FlatList
                style={styles.content}
                data={verses}
                showsVerticalScrollIndicator={false}
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
        paddingTop: 6,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: Colors.bkgWhite,
        position: 'relative'
    },
    containerFloat: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: Colors.bkgDark,
        borderRadius: 50
    },
    iconStar: {
        margin: 6
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
        height: 100,
    }
})

export default HimnoSong
