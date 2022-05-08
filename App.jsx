import React from 'react';
// React Navigation imports
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Font Loading
import { useFonts } from 'expo-font';

// Components
import Loading from './components/Loading';
import CreateAccount from './screens/CreateAccount';
import Login from './screens/Login';
import Tabs from './navigation/tabs';
import Activity from './screens/Activity';
import Group from './screens/Groups/Group';
import NewActivity from './screens/Activity/NewActivity';
import NewGroup from './screens/Groups/NewGroup';

// Fonts
import { FONTS } from './constants'; 

// Navigation Stack Initializer
const Stack = createNativeStackNavigator();

export default function App() {
  
  let [ fontsLoaded ] = useFonts(FONTS);

  if (!fontsLoaded) {
    return <Loading />;
  } else {
    console.log(`Fonts Loaded: ${fontsLoaded}`)
  }

  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Tabs"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Tabs" component={Tabs}/>
            <Stack.Screen name="CreateAccount" component={CreateAccount} options={{title: "Crear Cuenta"}}/>
            <Stack.Screen name='Group' component={Group} options={{headerShown: true}}/>
            <Stack.Screen name='Activity' component={Activity} options={{headerShown: true}}/>
            <Stack.Screen name='NewActivity' component={NewActivity} options={{headerShown: true, headerTitle: "Nueva Actividad"}}/>
            <Stack.Screen name="NewGroup" component={NewGroup} options={{headerShown: true, headerTitle: "Nuevo Grupo"}} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  ); 
};