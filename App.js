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
import Login from './screens/LoginV2';

// Navigation Stack Initializer
const Stack = createNativeStackNavigator();

const Home = ({navigation}) => (
  <View style={{flex: 1, justifyContent: "center", padding: 24}}>
    <Card style={{marginBottom: 20}}>
      <Card.Content>
        <Title>Home Screen</Title>
      </Card.Content>
    </Card>
    <Button
      title="Go to Create Account Screen... again"
      onPress={() => navigation.push("CreateAccount")}
      style={{backgroundColor: "#000fff"}}
      />
  </View>
)

export default function App() {
  const [ loadFonts ] = useFonts({
      Cairo: require("./assets/fonts/cairo.ttf"),
      Montserrat: require("./assets/fonts/montserrat.ttf")
  });

  if (!loadFonts) {
    return <Loading />;
  }

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CreateAccount">
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="CreateAccount" component={CreateAccount} options={{title: "Crear Cuenta", headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
};