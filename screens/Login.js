import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';

// Banner, Styles and Loading Screen
import Banner from "../components/Banner";
import inputStyles from "../styles/InputStyles";
import Loading from "../components/Loading";

// Login Account API Call
import authenticateUser from '../api/LoginAccount';

const Login = ({ navigation }) => {

    const userDetails = {
        email: '',
        password: ''
    }

    const [userAccount, setUserAccount] = useState(userDetails);

    const [loading, setLoading] = useState(false);

    const handleTextChange = (inputName, value) => (
        setUserAccount({
            ...userAccount,
            [inputName]: value
        })
    );

    const [secureEntryPass, setSecureEntryPass] = useState(true);

    const submitForm = async () => {
        try {
            const { statusValue, data } = await authenticateUser(userAccount.email, userAccount.password);

            const loginError = statusValue === 400 || statusValue !== 200 && data.message !== "Login successful" ? true : false;

            if (loginError) {
                Alert.alert(
                    "Inicio de Sesión incorrecto",
                    'Vuelve a iniciar sesión.',
                    [
                        {
                            text: 'Ok',
                            onPress: () => console.log('')
                        }
                    ]
                )
            } else {
                setLoading(true);
                setUserAccount(userDetails);
                setLoading(false)
                navigation.navigate('Home');
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <SafeAreaView style={styles.screenContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Banner  */}
                    <Banner />
                    {/* Form Fields */}
                    <View style={styles.formMargin}>
                        <Text style={styles.formTitle}>
                            Inicia Sesión
                        </Text>
                        <TextInput
                            label='Correo Electrónico'
                            value={userAccount.email}
                            autoCapitalize='none'
                            textContentType='emailAddress'
                            style={inputStyles.textInput}
                            onChangeText={(currentText) => handleTextChange('email', currentText)}
                            left={<TextInput.Icon name='email' />}
                        />
                        <TextInput
                            label="Contraseña"
                            style={inputStyles.textInput}
                            autoCapitalize="none"
                            textContentType="password"
                            secureTextEntry={secureEntryPass}
                            value={inputStyles.password}
                            onChangeText={(currentText) => handleTextChange('password', currentText)}
                            right={<TextInput.Icon name="eye" onPressOut={() => setSecureEntryPass(!secureEntryPass)} onPressIn={() => setSecureEntryPass(!secureEntryPass)} forceTextInputFocus={false} />}
                        />

                        <TouchableOpacity
                            style={inputStyles.buttonStyles}
                            onPress={() => submitForm()}>
                            <Text style={inputStyles.textStyles}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: '#FFFCFC'
    },
    formMargin: {
        marginHorizontal: 25
    },
    formTitle: {
        marginBottom: 20,
        fontFamily: "Montserrat-semiBold",
        fontSize: 21
    }
});

export default Login;