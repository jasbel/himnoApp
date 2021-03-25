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
        backgroundColor: Colors.green,
    },
    text: {
        color: Colors.txtPrimary,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    }
})

export default FavoriteEmptyState;
