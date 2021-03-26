import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '../../res/colors';
import HimnoSearch from './HimnoSearch';
import {songs} from '../../res/letters';
import HimnoItem from './HimnoItem';
import { titleApp } from '../../res/constant';
import FavoriteScreen from '../favorite/FavoriteScreen';
import Storage from '../../libs/storage';
import { removeAccents } from '../../res/removeAccents';

const HimnoScreen = (props) => {

    const {navigation} = props;
    const [dataSearch, setDataSearch] = useState(songs)
    const [data, setData] = useState(songs);
    const [allData, setAllData] = useState([])
    const [favorites, setFavorites] = useState([]);

    const getHimnos = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys();
            const keys = allKeys.filter((key) => key.includes('favorite-'));
            const favs = await Storage.instance.multiGet(keys);
            const favorites = favs.map((fav) => JSON.parse(fav[1]));

            const dataNotFavorite = data.filter((himnoItem) => {

                const himno = favorites.filter((itemFav) => {
                    return itemFav.id === himnoItem.id;
                });

                return himno.length ? false : true
            });
            
            setFavorites( favorites );
            setAllData( dataNotFavorite );

        } catch (error) {
            console.log("Get Favorites Err", error);
        }
    }

    const handlePress = ( himno ) => {
        props.navigation.navigate('HimnoSong', { himno });
    }

    const handleSearch = (query) => {

        const HimnosFiltered = dataSearch.filter((himno) => {

            return removeAccents(himno.title_es).toLowerCase().includes(removeAccents(query).toLowerCase()) || removeAccents(himno.description_es).toLowerCase().includes(removeAccents(query).toLowerCase())
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
        });
        const unsubscribe = navigation.addListener('focus', () => getHimnos());
        return unsubscribe;
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => getHimnos());
        return () => {
            unsubscribe;
        }
    }, [navigation]);

    return (
        <View style={styles.container}>

            <HimnoSearch onChange={handleSearch}/>

            <FlatList
                style = {styles.contentItems}
                data = {allData}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) =>
                    <>
                        { index === 0 && <FavoriteScreen navigation={navigation} favorites={favorites} /> }

                        <HimnoItem key={item.id} item={item} index={index} onPress={ () => handlePress(item) }/>
                    </>
                }

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bkgWhite,
        paddingLeft: 12,
        paddingRight: 12
    },
    contentItems: {
        paddingTop: 12,
    }
})

export default HimnoScreen
