import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '../../res/colors';
import HimnoSearch from './HimnoSearch';
import {songs} from '../../res/letters';
import HimnoItem from './HimnoItem';
import { titleApp } from '../../res/constant';
import FavoriteScreen from '../favorite/FavoriteScreen';
const HimnoScreen = (props) => {

    const {navigation} = props;
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
    useEffect(() => {
        navigation.setOptions({
            title: titleApp,
            headerTitleStyle: {
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: 23
            },
        })
    }, [])

    return (
        <View style={styles.container}>

            <HimnoSearch onChange={handleSearch}/>

            <FavoriteScreen />

            <FlatList
                style = {styles.contentItems}
                data = {data}
                showsVerticalScrollIndicator={false}
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
    },
    contentItems: {
        paddingTop: 12
    }
})

export default HimnoScreen
