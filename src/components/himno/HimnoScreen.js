import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
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
    const [noFavoritesData, setNoFavoriteData] = useState([])
    const [favorites, setFavorites] = useState([]);
    const [modeSearch, setModeSearch] = useState(false);

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
            setNoFavoriteData( dataNotFavorite );

        } catch (error) {
            console.log("Get Favorites Err", error);
        }
    }

    const handlePress = ( himno ) => {

        props.navigation.navigate('HimnoSong', { himno });
        setModeSearch(false)
    }

    const handleSearch = (query) => {

        query && !modeSearch && setModeSearch(true);
        !query && setModeSearch(false);

        const HimnosFiltered = data.filter((himno) => {

            return removeAccents(himno.title_es).toLowerCase().includes(removeAccents(query).toLowerCase()) || removeAccents(himno.description_es).toLowerCase().includes(removeAccents(query).toLowerCase())
        });

        setDataSearch(HimnosFiltered);

        !query && getHimnos();
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

            <HimnoSearch onChange={handleSearch} modeSearch={modeSearch}/>

            <FlatList
                style = {styles.contentItems}
                data = { !modeSearch ? noFavoritesData : dataSearch}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) =>
                    <>
                        { !modeSearch && index === 0 &&
                                <FavoriteScreen navigation={navigation} favorites={favorites} />
                        }

                        <HimnoItem key={item.id} item={item} onPress={ () => handlePress(item) }/>
                    </>
                }
            />

            { !noFavoritesData.length &&
                <FavoriteScreen navigation={navigation} favorites={favorites} />
            }

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
