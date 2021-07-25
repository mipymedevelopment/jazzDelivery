import React from 'react'
import {Pressable, Text,StyleSheet} from 'react-native'
import colors from '../utils/colors'

function SimpleButton(props){
    return(
        <Pressable style={style.button} onPress={props.onPress}>
            <Text style={style.text}>{props.text}</Text>
        </Pressable>
    )
}

const style = StyleSheet.create({
    button:{
        backgroundColor: colors.darkGreen,
        padding: 15,
        borderRadius: 3,
        fontWeight: 'bold'
    },
    text:{
        color: 'white'
    }
}) 

export default SimpleButton