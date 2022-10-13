import React from 'react';
// React Navigation imports
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ChoresAuthProvider } from './contexts/ChoresAuthContext';
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
import UserInit from './screens/User/UserInit';

// Fonts
import { FONTS } from './constants';

// Navigation Stack Initializer
const Stack = createNativeStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts(FONTS);

  if (!fontsLoaded) {
    return <Loading />;
  } else {
    console.log(`Fonts Loaded: ${fontsLoaded}`)
  }

  return (
    <ChoresAuthProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Tabs">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerTitle: "Crear Cuenta", headerShown: false }} />
            <Stack.Screen name='Group' component={Group} options={{ headerTitle: "Grupo" }} />
            <Stack.Screen name='Activity' component={Activity} />
            <Stack.Screen name='NewActivity' component={NewActivity} options={{ headerTitle: "Nueva Actividad" }} />
            <Stack.Screen name="NewGroup" component={NewGroup} options={{ headerTitle: "Nuevo Grupo" }} />
            <Stack.Screen name='UserInit' component={UserInit} options={{ headerTitle: 'Personalizar Perfil' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ChoresAuthProvider>
  );
};