import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../../res/colors'

const HimnoSearch = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> Busqueda (En desarrollo)</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        marginTop: 16,
        backgroundColor: Colors.grayLight,
        borderRadius: 50,
        padding: 16,
        marginBottom: 24
    },
    text: {
        color: Colors.txtDark
    }
})

export default HimnoSearch
