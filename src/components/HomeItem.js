import React from 'react'
import {View,Text, Pressable,StyleSheet} from 'react-native'

import colors from '../utils/colors'

function HomeItem(props){
    return(
        <Pressable style={styles.container} onPress={props.onPress}>
            <View>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.text}>{props.text}</Text>
            </View>
            <View style={styles.icon}>{props.icon}</View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        marginBottom: 20,
        padding: 15,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 10,
        height: 140
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
    },
    text:{
        maxWidth: '90%',
        color: 'black'
    },
    icon:{

    }
})

export default HomeItem
