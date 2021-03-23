import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../res/colors';
import HimnoSearch from './HimnoSearch';
import {songs} from '../../res/letters';
import { useState } from 'react';
import { useEffect } from 'react';
import HimnoItem from './HimnoItem';

// const letters =  JSON.stringify(data);

const HimnoScreen = (props) => {
    
    const data = songs;

    const handlePress = ( himno ) => {
        props.navigation.navigate('HimnoSong', { himno });
    }

    return (
        <View style={styles.container}>

            <HimnoSearch />
            
            <FlatList
                data = {data}
                renderItem={({item}) =>
                    <HimnoItem key={item.key} item={item} onPress={ () => handlePress(item) }/>
                }

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bkgLight,
        paddingLeft: 12,
        paddingRight: 12
    }
})

export default HimnoScreen
