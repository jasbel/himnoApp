import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Colors from '../../res/colors';
import HimnoItem from '../himno/HimnoItem';
import FavoriteEmptyState from './FavoriteEmptyState';

const FavoriteScreen = ({navigation, favorites}) => {

    const handlePress = ( himno ) => {
        navigation.navigate('HimnoSong', { himno });
    }

    return (
        <View style={styles.container}>
            { !favorites.length && <FavoriteEmptyState /> }

            <FlatList
                data={favorites}
                renderItem={({item})=>
                    <HimnoItem key={item.id} item={item} onPress={ () => handlePress(item) }/>
                }
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.green,
        borderTopWidth: 1,
        borderTopColor: Colors.bkgLight,
        paddingTop: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.bkgLight,
        marginBottom: 12,
    }
})

export default FavoriteScreen
