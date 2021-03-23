import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../res/colors';
import HimnoSearch from './HimnoSearch';
import {songs} from '../../res/letters';
import HimnoItem from './HimnoItem';

const HimnoScreen = (props) => {

    const [data, setData] = useState(songs)
    const [dataSearch, setDataSearch] = useState(songs)

    const handlePress = ( himno ) => {
        props.navigation.navigate('HimnoSong', { himno });
    }

    const handleSearch = (query) => {

        const HimnosFiltered = dataSearch.filter((himno) => {
            return himno.title_es.toLowerCase().includes(query.toLowerCase()) || himno.description_es.toLowerCase().includes(query.toLowerCase())
        });

        setData(HimnosFiltered)
    }

    return (
        <View style={styles.container}>

            <HimnoSearch onChange={handleSearch}/>

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
        backgroundColor: Colors.bkgwhite,
        paddingLeft: 12,
        paddingRight: 12
    }
})

export default HimnoScreen
