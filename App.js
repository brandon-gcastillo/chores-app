import React from 'react';
// React Navigation imports
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Native components
import { View, Button } from 'react-native';

import { Card, Title } from 'react-native-paper';

// Font Loading
import { useFonts } from 'expo-font';

// Components
import Loading from './components/Loading';
import CreateAccount from './screens/CreateAccount';
import Login from './screens/Login';
import Home from './screens/Home';
import Tabs from './navigation/tabs';

// Navigation Stack Initializer
const Stack = createNativeStackNavigator();

export default function App() {
  
  let [ fontsLoaded ] = useFonts({
      "Cairo": require("./assets/fonts/cairo.ttf"),
      "Montserrat": require("./assets/fonts/montserrat-variable.ttf"),
      'Montserrat-semiBold': require('./assets/fonts/montserrat-semiBold.ttf')
  });

  if (!fontsLoaded) {
    return <Loading />;
  } else {
    console.log(`Fonts Loaded: ${fontsLoaded}`)
  }

  return (
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Tabs"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Tabs" component={Tabs}/>
          <Stack.Screen name="CreateAccount" component={CreateAccount} options={{title: "Crear Cuenta", headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  ); 
};