import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../res/colors';

const HimnoSong = (props) => {

    const {himno} = props.route.params;
    const {title_es, paragraphs, chorus} = himno;

    /* TODO: mejorar la respuesta de indefinido , array vacio, o string vacio en choir y chorus */
    const verses = paragraphs.map((item, i) => {
        let choir ='';

        let filter = undefined ;
        if (chorus !== undefined) {
            filter = chorus.filter( choirItem => (compareArrayIgnore( choirItem.chorus_position_ignore, i)))
            choir = filter[0] && filter[0].choir;
        }

        choir = choir || '';

        console.log(choir);
        return ({...item, choir})
    })

    const getIconChoir = () => {
        return require('himnoapp/src/assets/images/verse.png');
    }

    function compareArrayIgnore (arr, val) {
        return arr.find(arrValue => arrValue === val) ? false : true;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title_es}</Text>
            <FlatList
                style={styles.content}
                data={verses}
                renderItem={({item}) =>
                    <View key={item.key}>
                        <Text style={ styles.paragraph }> {item.paragraph} {"\n"}</Text>
                        { item.choir !==''  &&
                            <>
                                <Image
                                    style={ styles.iconChoir}
                                    source={ getIconChoir()}
                                />
                                <Text style={ styles.choir}> {item.choir} {"\n"}</Text>
                            </>
                        }
                        
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
        paddingRight: 12,
        backgroundColor: Colors.bkgWhite
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: Colors.txtWhite,
        backgroundColor: Colors.bkgPrimary,
        borderRadius: 5

    },
    content: {
        paddingTop: 12,
        marginBottom: 24
    },
    paragraph: {
        fontSize: 27,
        lineHeight: 26,
        textAlign: 'center',
        color: Colors.txtBlack
    },
    iconChoir: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: -20,
        marginBottom: 10,
        textAlign: 'center',
    },
    choir: {
        fontSize: 26,
        lineHeight: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: Colors.txtDark,
    }
})

export default HimnoSong
