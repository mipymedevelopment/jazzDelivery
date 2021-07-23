import React,{useState, useEffect, useContext} from 'react'
import {View, Text, ScrollView, Image, StyleSheet,RefreshControl} from 'react-native'
import {useIsFocused} from '@react-navigation/native'
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


import Context from '../utils/Context'
import VendedorItem from '../components/VendedorItem'

function Vendedor(props){

    const isFocused = useIsFocused()
    const vendedor = props.route.params.vendedor
    const [envios, setEnvios] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const {apiUrl} = useContext(Context)
    const icon = <CommunityIcons name='timer-sand' size={40} color='black' />

    const handlePressDetalle = (envio) =>{
        props.navigation.navigate('Detalle', {envio,vendedor})
    }

    const updateEnvios = async () =>{
        let response = await fetch(`${apiUrl}/envios/available?seller=${vendedor.name}`)
        response = await response.json()
        setEnvios(response.response)
    }

    const onRefresh = () =>{
        setRefreshing(true)
        updateEnvios()
        setTimeout(() => {
            setRefreshing(false)
        }, 1000);
    }

    useEffect(()=>{
        props.navigation.setOptions({title: vendedor.name})
        updateEnvios()
    },[isFocused])

    return(
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            <View style={styles.header}>
                <Image source={{uri:vendedor.picture}} style={styles.image}/>
                <Text style={styles.title}>{vendedor.address}</Text>
                <Text style={styles.title}>{vendedor.phone}</Text>
            </View>
            {envios.length!==0 ? envios.map(e=>(
                <VendedorItem icon={icon} envio={e} key={e._id} onPress={()=>{handlePressDetalle(e)}}/>
            )) : <Text style={styles.aviso}>Ya no quedan envios de este vendor :D</Text>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image:{
        width: 40,
        height: 40
    },
    header:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    title:{
        fontWeight: 'bold'
    },
    aviso:{
        textAlign: 'center',
        marginTop: '50%'
    }
})

export default Vendedor