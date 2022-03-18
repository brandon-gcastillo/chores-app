import React, { useEffect } from 'react';
import { 
    View,
    Text,
    Button,
    Alert,
    Platform
} from 'react-native';

// Components
import Logo from '../components/Logo';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import BottomWaves from '../components/BottomWaves';

// API Calls
import getUsers from '../api/getUsers';

// Styles
import loginStyles from '../styles/LoginScreen';

const Login = () => {

    // useEffect(() => {
    //     getUsers();
    // }, [])
    
    return (
        <View style={loginStyles.loginContainer}>
            <Logo resizeMode="contain" styleClass={loginStyles.logoContainer} />
            <View>
                <EmailInput textStyle={loginStyles.textStyle} textInputStyle={loginStyles.textInputStyle}/>
            </View>
            <View style={loginStyles.inputContainer}>
                <PasswordInput textStyle={loginStyles.textStyle} textInputStyle={loginStyles.textInputStyle} />
            </View>
            <View style={loginStyles.inputContainer}>
                {
                    Platform.OS == 'web' ?
                        <Button title='Iniciar Sesion' color='#676DFF' onPress={() => alert("Hola!")}/> :
                        <Button title='Iniciar Sesion' color='#676DFF' onPress={() => getUsers()}/>
                }
            </View>
            <View style={loginStyles.creatAccountContainer}>
                <Text style={loginStyles.createAccountText}>Crea una cuenta</Text>
            </View>
            <BottomWaves />
        </View>
    );
};

export default Login;