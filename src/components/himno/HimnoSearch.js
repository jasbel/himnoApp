import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Colors from '../../res/colors'

const HimnoSearch = ({onChange}) => {

    const [query, setQuery] = useState('')

    const handleText = (query) => {
        setQuery(query);

        if (onChange) {
            onChange(query);
        }
    }


    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.textInput,
                    Platform.OS == 'ios' ? styles.textInputIOS: styles.textInputAndroid
                ]}
                onChangeText={handleText}
                value={query}
                placeholder={'Buscar...'}
                placeholderTextColor={Colors.txtDark}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        marginTop: 16,
        marginBottom: 24,
    },
    textInput: {
        backgroundColor: Colors.grayLight,
        borderRadius: 50,
        padding: 12,
        paddingLeft: 18,
        paddingRight: 18,
        color: Colors.txtBlack,
        fontSize: 20,
    },
    textInputAndroid: {
        borderWidth: 0,
        borderBottomColor: Colors.grayLight
    },
    textInputIOS: {
        margin: 8,
        borderRadius: 8
    }
})

export default HimnoSearch
