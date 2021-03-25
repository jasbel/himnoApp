import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../res/colors';
import FavoriteEmptyState from './FavoriteEmptyState';

const FavoriteScreen = () => {

    const [favorites, setFavorites] = useState([])

    return (
        <View style={styles.container}>
            { favorites && <FavoriteEmptyState /> }
            {/* <Text> Favorite Screen </Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        borderTopWidth: 1,
        borderTopColor: Colors.bkgLight,
        paddingTop: 6,
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: Colors.bkgLight,
    }
})

export default FavoriteScreen
