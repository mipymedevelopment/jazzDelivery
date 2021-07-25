import React,{useState, useContext} from 'react'
import {View, Text, StyleSheet,ScrollView} from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Context from '../utils/Context'
import SimpleButton from '../components/SimpleButton'


function Detalle(props){

    const [showAlert_, setShowAlert_] = useState(false)
    const {apiUrl} = useContext(Context)


    const envio = props.route.params.envio
    const vendedor = props.route.params.vendedor

    const handleAceptPress = async () =>{
        let jwt = await AsyncStorage.getItem('jwt')
        let response = await fetch(`${apiUrl}/envios/aceptar`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + jwt},
            body: JSON.stringify({
                _id: envio._id
            })
        })
        if(response.status === 401){
            props.navigation.navigate('Login')
        }
        else{
            response = await response.json()
            if(response.response !== 1){
                showAlert()
            }else{
                props.navigation.goBack()
            }
        }
    }

    const showAlert = ()=>{
        setShowAlert_(true)
    }
    const hideAlert = () =>{
        setShowAlert_(false)
    }

    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Vendedor</Text>
                <Text style={styles.text}>{vendedor.name}</Text>
                <Text style={styles.text}>{vendedor.address}</Text>
                <Text style={styles.text}>{vendedor.phone}</Text>

                <Text style={styles.title}>Pedido</Text>
                <Text style={styles.text}>{envio.items}</Text>
                <Text style={styles.text}>{`$${envio.price} (valor sin envio)`}</Text>
                
                <Text style={styles.title}>Destino</Text>
                <Text style={styles.text}>{envio.address}</Text>
                <Text style={styles.text}>{envio.phone}</Text>
            
            </View>
            <View style={styles.button}>
                <SimpleButton text='Aceptar envio' onPress={handleAceptPress}/>
            </View>

            <AwesomeAlert
                show={showAlert_}
                showProgress={false}
                title="Ups"
                message="Parece que alguien ya aceptó este envio :s"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Entendido"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    hideAlert();
                    props.navigation.goBack()
                }}
                />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: '10%',
        marginLeft: '15%'
    },
    title:{
        fontSize: 30,
        marginTop: 20,
        marginBottom: 10
    },
    text:{
        margin: 3,
        marginLeft: '7%'
    },
    button:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '20%',
        marginBottom: 20
    }
})

export default Detalle