import React, {useState, useContext} from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'
import AsyncStorage from '@react-native-async-storage/async-storage'

import SimpleButton from '../components/SimpleButton'
import Context from '../utils/Context'

const screenHeight = Dimensions.get('screen').height/1.5

function ChangeContacto(props){

    const [newContacto, setNewContacto] = useState('')
    const [showAlertFailure, setShowAlertFailure] = useState(false) 
    const [showAlertError, setShowAlertError] = useState(false) 
    const {apiUrl} = useContext(Context)

    const handlePressGuardar = async () =>{
        
        if(newContacto.length !== 9){
            setShowAlertError(true)
            return false
        }

        let jwt = await AsyncStorage.getItem('jwt')
        let response = await fetch(`${apiUrl}/changecontacto`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt},
            body: JSON.stringify({
                contacto: newContacto
            })
        })

        if(response.status === 401){
            props.navigation.navigate('Login')
        }else{
            response = await response.json()
            if(!response.status){
                setShowAlertFailure(true)
            }else{
                props.navigation.goBack()
            }
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Ingresar telefono de contacto</Text>
            <TextInput style={styles.input} onChangeText={t=>{setNewContacto(t)}} defaultValue={newContacto} placeholder='ej. 961234567' />
            <SimpleButton text='Guardar' onPress={handlePressGuardar} />

            <AwesomeAlert
                show={showAlertFailure}
                showProgress={false}
                title="Error"
                message='Ah ocurrido un error actualizando el contacto'
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Continuar"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    setShowAlertFailure(false)
                }}
                />
            <AwesomeAlert
                show={showAlertError}
                showProgress={false}
                title="Error"
                message='El formato ingresado es incorrecto. Por ingresar un numero de contacto (ej. 961234567)'
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Continuar"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    setShowAlertError(false)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight
    },
    input:{
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        margin: 30,
        width: 200,
        textAlign: 'center'
    },
    text:{
        fontWeight: 'bold',
        margin: 5
    }
})


export default ChangeContacto