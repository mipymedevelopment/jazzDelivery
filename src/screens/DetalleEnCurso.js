import React,{useState, useEffect,useContext} from 'react'
import {View, Text, StyleSheet,ScrollView} from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';


import Context from '../utils/Context'
import SimpleButton from '../components/SimpleButton'


function Detalle(props){

    const [showAlert_, setShowAlert_] = useState(false)
    const [vendedor, setVendedor] = useState({})
    const {apiUrl} = useContext(Context)
    const envio = props.route.params.envio

    props.navigation.setOptions({title: 'Detalle'})

    const loadVendedor = async () =>{
        let response = await fetch(`${apiUrl}/vendedores?seller=${envio.seller}`)
        response = await response.json()
        setVendedor(response.response)
    }

    const handlePressEntregado = async () =>{
        let response = await fetch(`${apiUrl}/envios/entregado`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                _id: envio._id
            })
        })
        response = await response.json()
        if(response.response !== 1){
            showAlert()
        }else{
            props.navigation.goBack()
        }
    }

    const showAlert = ()=>{
        setShowAlert_(true)
    }
    const hideAlert = () =>{
        setShowAlert_(false)
    }

    useEffect(()=>{
        loadVendedor()
    },[])

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
                <SimpleButton text='Marcar como entregado' onPress={handlePressEntregado} />
            </View>
            <AwesomeAlert
                show={showAlert_}
                showProgress={false}
                title="Ups"
                message="Ah ocurrido un error D:"
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