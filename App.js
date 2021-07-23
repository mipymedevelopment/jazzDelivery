import 'react-native-gesture-handler'

import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Context from './src/utils/Context'
import Home from './src/screens/Home'
import Deliverys from './src/screens/Deliverys'
import Vendedor from './src/screens/Vendedor'
import Detalle from './src/screens/Detalle'
import EnCurso from './src/screens/EnCurso'
import DetallEnCurso from './src/screens/DetalleEnCurso'

import Horario from './src/screens/Horario'

const Stack = createStackNavigator()

const App  = () => {
  return (
    <Context.Provider value={{userEmail: 'clave123@mail.com',apiUrl:'http://10.0.2.2:4001'}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerTitleAlign:'center'}}>
          <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
          <Stack.Screen name='Deliverys' component={Deliverys} />
          <Stack.Screen name='Vendedor' component={Vendedor} />
          <Stack.Screen name='Detalle' component={Detalle} />
          <Stack.Screen name='EnCurso' component={EnCurso} />
          <Stack.Screen name='DetalleEnCurso' component={DetallEnCurso} />
          <Stack.Screen name='Horario' component={Horario} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  )  
};

export default App;
