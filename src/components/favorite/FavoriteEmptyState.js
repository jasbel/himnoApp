import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../../res/colors'

const FavoriteEmptyState = () => {
    return (
        <View>
            <Text style={styles.text}> Aun no hay una alabanza en favoritos </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: Colors.txtPrimary,
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center'
    }
})

export default FavoriteEmptyState;
