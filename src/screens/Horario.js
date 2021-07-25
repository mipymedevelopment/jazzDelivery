import React,{useState, useEffect, useContext} from 'react'
import {ScrollView, View, StyleSheet, Pressable, Text} from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome5'
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SimpleButton from '../components/SimpleButton'
import colors from '../utils/colors'
import Context from '../utils/Context'
import { watchFile } from 'fs';

/*----------------------------------------------------------------*/
function generateHorario(){
    let h = []
    for(let col=0 ; col<7 ; col++){
        h.push([])
        for(let row=0 ; row<(24-9) ; row++){
            h[col].push({r:row, c:col, value: false})
        }
    }
    return h
}

var message = `Marca en el horario los horarios que tienes disponible para repartir. 
        Debes conectarte a la aplicacion en los horarios que marcaste activando el boton 'estoy conectado'. 
        Recuerda que los vendedores pueden ver los dias en los que te conectaras y en base a eso organizaran su semana`


/*----------------------------------------------------------------*/
function Horario(props){
    
    const [h,setH] = useState(generateHorario())
    const [showAlertHelp_, setShowAlertHelp_] = useState(false)
    const [showAlertSave_, setShowAlertSave_] = useState(false)
    const [showAlertSaveError_, setShowAlertSaveError_] = useState(false)
    const {apiUrl} = useContext(Context)

    const leyenda_horas = ['9.00-10.00','10.00-11.00','11.00-12.00','12.00-13.00','13.00-14.00','14.00-15.00','15.00-16.00','16.00-17.00','17.00-18.00','18.00-19.00','19.00-20.00','20.00-21.00','21.00-22.00','22.00-23.00','23.00-00.00']
    const leyenda_dias = ['l','m','m','j','v','s','d']

    const handleClickCell = ({r,c,value}) =>{
        let h_ = JSON.parse(JSON.stringify(h))
        h_[c][r].value = !value
        setH(h_)
    }

    const handlePressHelp = () =>{
        setShowAlertHelp_(true)
    }

    const handlePressGuardar = async () =>{
        let jwt = await AsyncStorage.getItem('jwt')
        let response = await fetch(`${apiUrl}/savehorario`,{
            method: 'PUT',
            headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt},
            body: JSON.stringify({
                horario: h
            })
        })
        if(response.status === 401){
            props.navigation.navigate('Login')
        }else{
            response = await response.json()
            if(response.status){
                setShowAlertSave_(true)
            }else{
                setShowAlertSaveError_(true)
            }
        }
    }

    const loadHorario = async ()=>{
        let jwt = await AsyncStorage.getItem('jwt')
        let response = await fetch(`${apiUrl}/horario`,{
            headers: {'Authorization': 'Bearer ' + jwt}
        })
        if(response.status === 401){
            props.navigation.navigate('Login')
        }else{
            response = await response.json()
            if(response.horario){
                setH(response.horario)
            }
        }
    }

    useEffect(()=>{
        loadHorario()
    },[])

    return(
        <ScrollView style={sytles.mainContainer}>
            <View style={sytles.leyendaDias}>
                {
                    leyenda_dias.map(l=>(
                        <Text style={sytles.leyendaDiasItem}>{l}</Text>
                    ))
                }
            </View>
            <View style={sytles.container}>
                <View>
                    {
                        leyenda_horas.map(l =>(
                            <Text style={sytles.leyendaHorasItem} key={l}>{l}</Text>
                        ))
                    }
                </View>
                <View style={sytles.horario}>
                    {
                        h.map(col =>(
                            <View style={sytles.column}>
                                {col.map(cell =>(
                                    <Pressable style={cell.value?sytles.celdaPressed:sytles.celda} onPress={()=>{handleClickCell(cell)}} key={`${cell.c}x${cell.r}`}>
                                    </Pressable>
                                ))}
                            </View>
                        ))
                    }
                </View>
            </View>
            <View style={sytles.buttonsContainer}>
                <SimpleButton text='Guardar cambios' onPress={handlePressGuardar} />
                <Pressable style={sytles.askButton} onPress={handlePressHelp}><Icons name='question' size={20} color='black'/></Pressable>
            </View>
            <AwesomeAlert
                show={showAlertHelp_}
                showProgress={false}
                title="Indicaciones"
                message={message}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Entendido"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    setShowAlertHelp_(false)
                }}
                />
                <AwesomeAlert
                show={showAlertSave_}
                showProgress={false}
                title="Horario guardado"
                message='El horario se ha guardado con exito'
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Continuar"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    setShowAlertSave_(false)
                }}
                />
                <AwesomeAlert
                show={showAlertSaveError_}
                showProgress={false}
                title="Error"
                message='Ha ocurrido un error guardando su horario'
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Continuar"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    setShowAlertSaveError_(false)
                }}
                />
        </ScrollView>
    )
}

/*---------------------------------------------------------------*/
const sytles = StyleSheet.create({
    mainContainer:{
        marginTop: 20
    },
    marginTop: 20,
    leyendaDias: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 110
    },
    leyendaDiasItem:{
        width: 35
    },
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    leyendaHorasItem:{
        height: 35,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 5,
        marginLeft: 5
    },
    horario:{
        display: 'flex',
        flexDirection: 'row'
    },
    column:{

    },
    celda:{
        width: 35,
        height: 35,
        borderWidth: 1,
        borderColor: 'gray'
    },
    celdaPressed:{
        width: 35,
        height: 35,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: colors.red
    },
    askButton:{
        marginRight: '5%',
        backgroundColor: colors.green,
        borderRadius: 30,
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: 20
    },
    buttonsContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20
    }
})

export default Horario