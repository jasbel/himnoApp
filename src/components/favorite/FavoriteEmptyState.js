import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../../res/colors'

const FavoriteEmptyState = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> Aun no hay una alabanza en favoritos </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: Colors.bkgLight,
        marginBottom: 12
    },
    text: {
        backgroundColor: Colors.bkgLight,
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        padding: 3,
        textAlign: 'center',
        borderRadius: 6
    }
})

export default FavoriteEmptyState;
