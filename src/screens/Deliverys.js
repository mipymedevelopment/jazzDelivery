import React,{useState, useEffect, useContext} from 'react'
import {View, ScrollView, StyleSheet, ActivityIndicator, Dimensions, RefreshControl} from 'react-native'
import {useIsFocused} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Context from '../utils/Context'
import DeliveryItem from '../components/DeliverysItem'
import SimpleButton from '../components/SimpleButton'

function Deliverys(props){

    const isFocused = useIsFocused()
    const [vendedores,setVendedores] = useState({})    
    const [enCurso, setEnCurso] = useState(0)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const {apiUrl} = useContext(Context)

    const loadWatingDeliverys = async () =>{
        try{
            let jwt = await AsyncStorage.getItem('jwt')
            let envios = await fetch(`${apiUrl}/envios/available?seller=all`,{
                headers:{'Authorization': 'Bearer ' + jwt}
            })
            if(envios.status === 401){
                props.navigation.navigate('Login')
            }
            envios = await envios.json()
            
            var vendedores = {}
            
            envios.response.forEach(envio =>{       // Se llenan los envios
                if(!vendedores[envio.seller]){
                    
                    vendedores[envio.seller] = {
                        name: envio.seller,
                        nenvios: 0
                    }
                }
                vendedores[envio.seller].nenvios +=1
            })
            let names = Object.keys(vendedores)

            for(let i=0 ; i<names.length ; i++){
                let response = await fetch(apiUrl + `/vendedores?seller=${names[i]}`,{
                    headers: {'Authorization': 'Bearer ' + jwt}
                })
                if(envios.status === 401){
                    props.navigation.navigate('Login')
                }
                response = await response.json()
                vendedores[names[i]].address = response.response.address
                vendedores[names[i]].picture = response.response.picture
                vendedores[names[i]].phone = response.response.phone
            }
            setVendedores(vendedores)
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }

    const loadingEnCurso = async () =>{
        let jwt = await AsyncStorage.getItem('jwt')
        let response = await fetch(`${apiUrl}/envios/encurso`,{
            headers: {'Authorization': 'Bearer ' + jwt}
        })
        if(response.status === 401){
            props.navigation.navigate('Login')
        }else{
            response = await response.json()
            setEnCurso(response.response.length)
        }
    }

    const handlePressVendedor = (vendedor) =>{
        props.navigation.navigate('Vendedor',{vendedor})
    }

    const handlePressEnCurso = () =>{
        props.navigation.navigate('EnCurso')
    }

    const onRefresh = () =>{
        setRefreshing(true)
        setVendedores({})
        setLoading(true)        
        loadWatingDeliverys()
        loadingEnCurso()
        setTimeout(() => {
            setRefreshing(false)
        }, 1000);
    }

    useEffect(()=>{
        loadingEnCurso()
        loadWatingDeliverys()
    },[isFocused])

    return(
        <ScrollView style={styles.scroll} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            <View style={styles.container}>
                <View style={styles.buttonContainer} ><SimpleButton text={`En curso (${enCurso})`} onPress={handlePressEnCurso} /></View>
                {loading?<ActivityIndicator style={styles.indicator} size='large' color='blue' />:false}
                {Object.keys(vendedores).map(vname=>(
                    <DeliveryItem vendedor={vendedores[vname]} key={vendedores[vname].name} onPress={()=>{handlePressVendedor(vendedores[vname])}}/>
                ))}       
            </View>
        </ScrollView>
    )
}
 /*----------------------------------------------------------*/
const styles = StyleSheet.create({
    container:{
        display: 'flex',
        alignItems: 'center'
    },
    buttonContainer:{
        margin: 40
    },
    indicator:{
        marginTop: Dimensions.get('window').height/4,
    }
})

export default Deliverys