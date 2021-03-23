import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '../../res/colors';

const HimnoItem = ({item, onPress}) => {

    const {title_es, description_es} = item;

    const getIcon = () => {
        return require('himnoapp/src/assets/images/play.png');
    }
    const getIconStar = () => {
        return require('himnoapp/src/assets/images/star.png');
    }

    return (
        <Pressable style={styles.container} onPress={ onPress }>
            <View style={styles.figure}>
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
        marginBottom: 20

    },
    figure: {
        backgroundColor: Colors.grayLight,
        borderRadius: 8,
        padding: 7,
        paddingRight: 8,
        paddingLeft: 10,
        marginRight: 16
    },
    icon: {
        width: 32,
        height: 36
    },
    content: {
        position: 'relative',
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayLight,
        width: '80%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16

    },
    description: {
        fontSize: 14
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
