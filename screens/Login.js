import React from 'react';
import { 
    View,
    Text,
    Button,
    Alert,
    Platform
} from 'react-native';

// Font Loading
import { useFonts } from 'expo-font';

// Components
import Loading from '../components/Loading';
import Logo from '../components/Logo';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import BottomWaves from '../components/BottomWaves';

// Styles
import loginStyles from '../styles/LoginScreen';

const Login = () => {

    const [ loadFonts ] = useFonts({
        Cairo: require("../assets/fonts/cairo.ttf"),
        Montserrat: require("../assets/fonts/montserrat.ttf")
    })
    
    if (!loadFonts) {
        return <Loading />;
    }

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
                        <Button title='Iniciar Sesion' color='#676DFF' onPress={() => alert("Button pressed!")}/> :
                        <Button title='Iniciar Sesion' color='#676DFF' onPress={() => Alert.alert("Button pressed!")}/>
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