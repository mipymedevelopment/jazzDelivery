import React from 'react'
import {View, Text, Image, StyleSheet, Pressable} from 'react-native'

import colors from '../utils/colors'

function DeliveryItem(props){
    return(
        <Pressable style={styles.container} onPress={props.onPress}>
            <View>
                <Text style={styles.title}>{props.vendedor.name}</Text>
                <Text style={styles.text}>{props.vendedor.address}</Text>
            </View>
            <Image source={{uri:props.vendedor.picture}} style={styles.image} />
            <View style={styles.circle}>
                <Text style={styles.circleText}>{props.vendedor.nenvios}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    image:{
        width: 100,
        height: 100
    },
    titleWrapper: {

    },
    title:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    text:{
        maxWidth: '70%'
    },
    container:{
        backgroundColor: colors.green,
        width: '90%',
        margin: 10,
        padding: 10,
        paddingLeft: 20,
        position: 'relative',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    circle:{
        backgroundColor: colors.orange,
        width: 60,
        height: 60,
        position: 'absolute',
        right: -20,
        top: -20,
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleText:{
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default DeliveryItem