import React, { useState, useEffect } from 'react';

import { 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform 
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Card, Title, Paragraph } from 'react-native-paper';

// Login Account API Call
import authenticateUser from '../api/loginAccount'

const Login = ({navigation}) => {

    const loginDetails = {
        data: {
            message: ""
        },
        statusValue: ""
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loginStatus, setLoginStatus] = useState(loginDetails)

    // TODO: Test the API to login
    // TODO: Apply a Snackbar or errors on inputs when the values entered are wrong

    useEffect(() => {

        if(loginStatus.data.message === "Login successful" && loginStatus.statusValue === '200') navigation.navigate("Home")

    }, [loginStatus])
    
    return(
        <SafeAreaView style={styles.app_container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding": "height"}
            >
                <TextInput
                    label="Correo"
                    value={email}
                    onChangeText={currentText => setEmail(currentText)}
                    style={styles.textInput}
                    autoCapitalize="none"
                    textContentType='emailAddress'
                />
                <TextInput
                    label="Contraseña"
                    value={password}
                    onChangeText={currentPassword => setPassword(currentPassword)}
                    style={styles.textInput}
                    autoCapitalize="none"
                    textContentType='password'
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.buttonStyles}
                    onPress={ async () => {
                        const { statusValue, data } = await authenticateUser(email, password);
                        setLoginStatus({
                            statusValue,
                            data
                        });
                        console.log(JSON.stringify(loginStatus));
                    }}
                >
                    <Text style={styles.textStyles}>Log in</Text>
                </TouchableOpacity>
                <Card style={{marginTop: 20}}>
                    <Card.Content>
                        <Title>Results</Title>
                        <Paragraph>
                            Usuario: {email}
                        </Paragraph>
                        <Paragraph>
                            Password: {password}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  app_container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 20,
    justifyContent: "space-around"
  },
  textInput: {
    marginBottom: 15
  },
  buttonStyles: {
    alignItems: "center",
    backgroundColor: "#6b6bff",
    padding: 10,
    borderRadius: 4,
    width: 150,
  },
  textStyles: {
    color: "#fff",
    fontWeight: "bold"
  }
});

export default Login;