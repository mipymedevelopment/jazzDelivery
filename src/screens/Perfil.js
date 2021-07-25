import React,{useState, useEffect, useContext} from 'react'
import {ScrollView, View, Text, TextInput, StyleSheet, Dimensions} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import AwesomeAlert from 'react-native-awesome-alerts'
import {useIsFocused} from '@react-navigation/native'

import SimpleButton from '../components/SimpleButton'
import Context from '../utils/Context'


const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width

function passPolicies(pass){
    if(pass.search(' ') !== -1 ){
        return false
    }
    if(pass.length<6){
        return false
    }
    return true
}

function Perfil(props){

    const isFocused = useIsFocused()
    const [showALlertPassSuccess, SetShowAlertPassSuccess] = useState(false)
    const [showALlertPassFailure, SetShowAlertPassFailure] = useState(false)
    const [showALlertPassIncorrect, SetShowAlertPassIncorrect] = useState(false)
    const [showALlertPassConfirm, SetShowAlertPassConfirm] = useState(false)
    const [showALlertAbono, SetShowAlertAbono] = useState(false)
    const [contacto, setContacto] = useState('')
    const [newPass,setNewPass] = useState('')
    const [newPassConfirm,setNewPassConfirm] = useState('')
    const [repartos,setRepartos] = useState(0)
    const {userEmail, apiUrl} = useContext(Context)

    const handlePressCerrar = async () =>{
        await AsyncStorage.setItem('jwt','')
        props.navigation.navigate('Login')
    }

    const handlePressChangePass = async () =>{
        
        if(!passPolicies(newPass) | newPass!=newPassConfirm){
            SetShowAlertPassIncorrect(true)
            return false
        }
        
        let jwt = await AsyncStorage.getItem('jwt')
        let response = await fetch(`${apiUrl}/changepassword`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt},
            body: JSON.stringify({
                password: newPass
            })            
        })
        if(response.status === 401){
            props.navigation.navigate('Login')
        }else{
            response = await response.json()
            if(!response.status){
                SetShowAlertPassFailure(true)
            }else{
                SetShowAlertPassSuccess(true)
                setNewPass('')
                setNewPassConfirm('')
            }
        }
    }

    const handlePressContacto = () =>{
        props.navigation.navigate('Editar contacto')
    }

    const handlePressAbono = async () =>{
        let jwt = await AsyncStorage.getItem('jwt')
        let response = await fetch(`${apiUrl}/abono`,{
            headers: {'Authorization': 'Bearer ' + jwt}
        })
        response = await response.json()
        setRepartos(response.repartos)
        SetShowAlertAbono(true)
    }

    const loadContacto = async () =>{
        let jwt = await AsyncStorage.getItem('jwt')
        let response = await fetch(`${apiUrl}/contacto`,{
            headers: {'Authorization': 'Bearer ' + jwt}
        })
        if(response.status === 401){
            props.navigation.navigate('Login')
        }else{
            response = await response.json()
            setContacto(response.response)
        }
    }

    useEffect(()=>{
        loadContacto()
    },[isFocused])
    
    return(
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <View style={styles.topView}>
                
                <View style={styles.header}>
                    <Icons name='face-profile' size={90} color='black' />
                    <View style={styles.emailContainer}>
                        <Text style={styles.email}>{userEmail}</Text>
                        <View style={styles.contactoContainer} >
                            <Text style={styles.contacto} >Contacto: +56 {contacto}</Text>
                            <SimpleButton text='Editar' onPress={handlePressContacto} />
                        </View>
                    </View>
                </View>

                <View style={styles.bodyContainer}>
                    <View style={styles.newPassContainer}>
                        <View>
                            <TextInput placeholderTextColor='gray' secureTextEntry={true} style={styles.input} placeholder='Nueva constraseña' onChangeText={t=>{setNewPass(t)}} defaultValue={newPass} />
                            <TextInput placeholderTextColor='gray' secureTextEntry={true} style={styles.input} placeholder='Confirmar contraseña' onChangeText={t=>{setNewPassConfirm(t)}} defaultValue={newPassConfirm} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <SimpleButton text='Cambiar contraseña' onPress={()=>{SetShowAlertPassConfirm(true)}} />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <SimpleButton text='Cerrar sesion' onPress={handlePressCerrar} />
                    </View>
                </View>
            </View>

            <View style={styles.bottomView}>
                <SimpleButton text='Ver abono' onPress={handlePressAbono} />
            </View>
            <AwesomeAlert
                show={showALlertPassSuccess}
                showProgress={false}
                title="Confirmacion"
                message='Se ha cambiado la contraseña exitosamente'
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Continuar"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    SetShowAlertPassSuccess(false)
                }}
                />
                <AwesomeAlert
                show={showALlertPassFailure}
                showProgress={false}
                title="Error"
                message='No se ha podido cambiar la contraseña'
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Continuar"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    SetShowAlertPassFailure(false)
                }}
                />
                <AwesomeAlert
                show={showALlertPassIncorrect}
                showProgress={false}
                title="Error"
                message='La contraseña debe tener mas de 6 caracteres y ambas contraseñas deben coincidir'
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Continuar"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    SetShowAlertPassIncorrect(false)
                }}
                />
                <AwesomeAlert
                show={showALlertPassConfirm}
                showProgress={false}
                title="Confirmacion"
                message='¿Desea cambiar su contraseña?'
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                confirmText="Continuar"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    SetShowAlertPassConfirm(false)
                    handlePressChangePass()
                }}
                onCancelPressed={()=>{
                    SetShowAlertPassConfirm(false)
                }}
                />
                <AwesomeAlert
                show={showALlertAbono}
                showProgress={false}
                title="Abono"
                message={`Durante este mes has realizado un total de ${repartos} repartos.`}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Continuar"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    SetShowAlertAbono(false)
                }}
                />
        </ScrollView>
    )
}
/*-------------------------------------------------*/
const styles = StyleSheet.create({
    mainContainer:{
        height: screenHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    topView:{
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingBottom: 10
    },
    header:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    email:{
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 30,
        marginLeft: 10,
        maxWidth: screenWidth-100
    },
    contactoContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    contacto:{
        margin: 5,
        fontSize: 14
    },
    newPassContainer:{
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
        marginBottom: 60,
        marginTop: 20,
    },
    bottomView:{
        marginTop: 60
    },
    input:{
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        color: 'black',
        textAlign: 'center'
    },
    buttonContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    }
})

export default Perfil