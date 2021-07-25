import React from 'react'
import {View,Text, Switch, StyleSheet,ScrollView} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import ComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeItem from '../components/HomeItem'

function Home(props){

    const calendar_icon = <Entypo name='calendar' size={40} color="black" />
    const plane_icon = <Entypo name='paper-plane' size={40} color="black" />
    const face_icon = <ComunityIcons name='face' size={40} color="black" />

    const handlePressRepartir = () =>{
        props.navigation.navigate('Deliverys')
    }

    const handlePressHorario = () =>{
        props.navigation.navigate('Horario')
    }

    const handlePressPerfil = () =>{
        props.navigation.navigate('Perfil')
    }

    return(
        <ScrollView>
            <View style={styles.header}> 
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>JazzDelivery</Text>
                    {plane_icon}
                </View>
                <Switch />
            </View>
            <HomeItem title='Horarios' onPress={handlePressHorario} icon={calendar_icon} text='Planifica tu semana y coordinate mejor con los vendedores'/>
            <HomeItem title='Repartir' onPress={handlePressRepartir} icon={plane_icon} text='Revisa si hay pedidos y comienza a repartir!'/>
            <HomeItem title='Perfil' onPress={handlePressPerfil} icon={face_icon} text='Actualiza tus datos y gestiona tu cuenta'/>
        </ScrollView>
    )
}

/*------------------------------------------------------------*/

const styles= StyleSheet.create({
    header:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 40,
        marginLeft: 10,
        marginRight: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    titleWrapper:{
        display: 'flex',
        flexDirection: 'row'
    },
    title:{
        fontSize: 25,
        fontWeight: 'bold'
    },
    slider:{

    }
})

export default Home