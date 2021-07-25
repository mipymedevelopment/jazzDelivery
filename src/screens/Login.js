import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import Icons from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';


import SimpleButton from '../components/SimpleButton';
import colors from '../utils/colors'
import myContext from '../utils/Context'

let ScreenHeight = Dimensions.get("window").height;

function Login(props) {

    const [user, SetUser] = useState('')
    const [password, SetPassword] = useState('')
    const [showAlert_, setShowAlert_] = useState(false)
    const {setUserEmail_,apiUrl} = useContext(myContext)

    const handlePressLogin = async () =>{
        let response = await fetch(apiUrl + `/login?user=${user.toLocaleLowerCase()}&password=${password}`)
        response = await response.json()
        if(response.status){
            await AsyncStorage.setItem('jwt',response.token)
            isLogged()
        }else{
            setShowAlert_(true)
        }

    }

    const isLogged = async () =>{
        const jwt = await AsyncStorage.getItem('jwt')        
        let response = await fetch(apiUrl + '/isauth',{
            headers:{'Authorization': 'Bearer ' + jwt}
        })
        response = await response.json()
        if(response.status){
            setUserEmail_(response.user)
            props.navigation.navigate('Home')
        }
        
    }

    useEffect(()=>{
        isLogged()
    },[])

    return (
        <ScrollView>
            <View style={styles.Container}>
                <Icons name='paper-plane' size={100} color='black'/>
                <Text style={styles.title}>JazzDelivery</Text>
                <TextInput style={styles.input} placeholder='Usuario' onChangeText={t=>{SetUser(t)}} defaultValue={user} />
                <TextInput secureTextEntry={true} style={styles.input} placeholder='Contraseña' onChangeText={t=>{SetPassword(t)}} defaultValue={password} />
                <View style={styles.buttonContainer} >
                    <SimpleButton text='  Login  ' onPress={handlePressLogin}/>
                </View>
                <Text style={styles.footer} >Acerca de nosotros</Text>
            </View>
            <AwesomeAlert
                show={showAlert_}
                showProgress={false}
                title="Error"
                message='Nombre de usuario o clave incorrectos'
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Entendido"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    setShowAlert_(false)
                }}
                />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    Container:{
        backgroundColor: colors.green,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: ScreenHeight
    },
    input:{
        backgroundColor: 'white',
        width: 200,
        margin: 5,
        textAlign: 'center',
        borderRadius: 5
    },
    buttonContainer:{
        alignSelf: 'center',
        margin: 30
    },
    title:{
        marginBottom: 30,
        fontWeight: 'bold',
        fontSize: 30
    },
    footer:{
        position: 'absolute',
        bottom: 50
    }
})


export default Login