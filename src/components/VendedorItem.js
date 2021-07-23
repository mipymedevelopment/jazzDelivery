import React from 'react'
import {Pressable,Text, StyleSheet} from 'react-native'

import colors from '../utils/colors'

function VendedorItem(props){
    return(
        <Pressable style={styles.container} onPress={props.onPress}>
            <Text style={styles.address} >{props.envio.address}</Text>
            {props.icon}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.green,
        margin: 10,
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10
    },
    address:{
        fontSize: 17,
        
    }
}) 

export default VendedorItem