import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Storage from '../../libs/storage';
import Colors from '../../res/colors';

const HimnoItem = ({item, onPress}) => {

    const [isFavorite, setIsFavorite] = useState(false);

    const {title_es, description_es, id} = item;

    const getIcon = () => {
        return require('himnoapp/src/assets/images/play.png');
    }
    const getIconStar = () => {
        if (isFavorite) return require('himnoapp/src/assets/images/star.png');

        if (!isFavorite) return require('himnoapp/src/assets/images/unstar.png');
    }

    const getFavorite = async () => {
        try {
            const key = `favorite-${item.id}`;

            const favStr = await Storage.instance.get(key);

            if(favStr !== null) {
                setIsFavorite(true )
            }
        } catch (error) {
            console.log(" Get Favorite Error:  ", error);
        }
    }

    useEffect(() => {
        getFavorite();
    }, [])

    return (
        <Pressable style={styles.container} onPress={ onPress }>
            <View style={[styles.figure, isFavorite && styles.figureIsFavorite ]}>
                <Text style={[styles.numberHimno, isFavorite && styles.numberHimnoFavorite ]}>
                    {parseInt(id) + 1}
                </Text>
                <Image
                    style={styles.icon}
                    source={ getIcon() }
                />
            </View>
            <View style={styles.content}>
                <Text
                    style={ styles.title}
                > {title_es}</Text>
                <Text
                    style={ styles.description}
                > {description_es}</Text>
                <Image
                    style={ styles.iconStar}
                    source={ getIconStar()}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 12,
        justifyContent: 'space-between'
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
        position: 'relative'
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
        width: '85%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 19,
        color: Colors.txtPrimary,
        textShadowColor: Colors.txtBlack,
        textShadowRadius: 0.1
    },
    description: {
        fontSize: 16,
        color: Colors.txtBlack
    },
    iconStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 25,
        height: 25
    },
})

export default HimnoItem;
