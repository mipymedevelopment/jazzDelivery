import React,{useState, useContext} from 'react'
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native'
import Icons from 'react-native-vector-icons/Entypo'
import AwesomeAlert from 'react-native-awesome-alerts'
import SimpleButton from '../components/SimpleButton'

import colors from '../utils/colors'
import Context from '../utils/Context'

const ScreenHeight = Dimensions.get('screen').height

function RecuperationEmail(props){

    const [email, setEmail] = useState('')
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [showAlertError, setShowAlertError] = useState(false)
    const [showAlertWrongEmail, setShowAlertWrongEmail] = useState(false)
    const [showAlertWrongFormat, setShowAlertWrongFormat] = useState(false)
    const {apiUrl} = useContext(Context)

    const handlePressEnviar = async () =>{

        if(email.split('@').length !== 2){
            setShowAlertWrongFormat(true)
            return false
        }else if(email.split('@')[1].split('.').length < 2){
            setShowAlertWrongFormat(true)
            return false
        }

        let response = await fetch(`${apiUrl}/forgotpassword?email=${email}`)
        response = await response.json()
        if(!response.status){
            setShowAlertWrongEmail(true)
        }else if(response.status === -1){
            setShowAlertError(true)
        }else{
            setShowAlertSuccess(true)
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Icons name='paper-plane' size={100} color='black'/>
                <Text style={styles.title}>JazzDelivery</Text>
            </View>
            <Text style={styles.text}>Ingrese su E-mail de recuperacion. Enviaremos un correo con su nueva contraseña</Text>
            <TextInput placeholderTextColor='gray' style={styles.input} placeholder='Ejemplo@mail.com' onChangeText={t=>{setEmail(t)}} defaultValue={email}></TextInput>
            <SimpleButton onPress={handlePressEnviar} text='Enviar' />
        
            <AwesomeAlert
                show={showAlertSuccess}
                showProgress={false}
                title="Correo enviado"
                message= {`Se ha enviado un correo de recuperacion a ${email} con tu nueva contraseña`}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Entendido"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    setShowAlertSuccess(false)
                }}
                />
                <AwesomeAlert
                show={showAlertWrongEmail}
                showProgress={false}
                title="Correo incorrecto"
                message= {`No tenemos registrado ningun correo '${email}'`}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Entendido"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    setShowAlertWrongEmail(false)
                }}
                />
                <AwesomeAlert
                show={showAlertError}
                showProgress={false}
                title="Error"
                message= {`Ha ocurrido un error inesperado. Por favor intentar más tarde o contactar con servicio técnico`}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Entendido"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    setShowAlertError(false)
                }}
                />
                <AwesomeAlert
                show={showAlertWrongFormat}
                showProgress={false}
                title="El correo es incorrecto"
                message= 'El formato del correo es incorrecto. Por favor revise que su correo tenga la forma de ejemplo@mail.com'
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Entendido"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    setShowAlertWrongFormat(false)
                }}
                />
        </View>
    )
}
/*------------------------------------------------__*/
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        height: ScreenHeight,
        display: 'flex',
        alignItems: 'center'
    },
    header:{
        display: 'flex',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 60
    },  
    title:{
        fontWeight: 'bold',
        fontSize: 30
    },
    text:{
        width: 300,
        fontWeight: 'bold'
    },
    input:{
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        width: 200,
        textAlign: 'center',
        color: 'black'
    }
})

export default RecuperationEmail