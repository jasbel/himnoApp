import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const HimnoSong = (props) => {

    const {himno} = props.route.params;
    const {title_es, parrafos, coro} = himno;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title_es}</Text>
            <FlatList
                style={styles.content}
                data={parrafos}
                renderItem={({item}) =>
                    <View key={item.key}>
                        <Text style={ styles.parrafo }> {item.parrafo} {"\n"}</Text>
                        <Text style={ styles.coro}> {coro} {"\n"}</Text>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 6,
        paddingLeft: 12,
        paddingRight: 12
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    content: {
        paddingTop: 12,
        marginBottom: 24
    },
    parrafo: {
        fontSize: 26,
        lineHeight: 25,
        textAlign: 'center',
    },
    coro: {
        fontSize: 25,
        lineHeight: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
})

export default HimnoSong
