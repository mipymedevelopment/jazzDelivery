
import React,{useState,useEffect,useContext} from 'react'
import {StyleSheet, ScrollView, Text} from 'react-native'
import {useIsFocused} from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'

import VendedorItem from '../components/VendedorItem'
import Content from '../utils/Context'

function EnCurso(props){

    const isFocused = useIsFocused()
    const [envios, setEnvios] = useState([])
    const {userEmail, apiUrl} = useContext(Content)
    const icon = <AntDesign name='doubleright' size={25} color='black'/>

    props.navigation.setOptions({title:'Envios en curso'})

    const loadEnvios = async () =>{
        let response = await fetch(`${apiUrl}/envios/encurso?repartidor=${userEmail}`)
        response = await response.json()
        setEnvios(response.response)
    }

    const handlePressEnvio = (envio) =>{
        props.navigation.navigate('DetalleEnCurso',{envio})
    }

    useEffect(()=>{
        loadEnvios()
    },[isFocused])

    return(
        <ScrollView style={styles.container}>
            {envios.length!==0 ? envios.map(e=>(
                <VendedorItem icon={icon} envio={e} onPress={()=>{handlePressEnvio(e)}}/>
            )) : <Text style={styles.mensaje}>No hay envios en curso</Text>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 40
    },
    mensaje:{
        textAlign: 'center',
        marginTop: '50%'
    }
})

export default EnCurso