import React, { useState } from 'react';
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
import { StackActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Divider } from 'react-native-paper';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

// Banner, Styles and Loading Screen
import Banner from "../../components/Banner";
import inputStyles from "../../styles/InputStyles";
import Loading from "../../components/Loading";
import { COLORS } from '../../constants';

// Login Account API Call
import Firebase from '../../api/Firebase';

// App Auth Context
import { useChoresAuth, useChoresAuthUpdateContext, useChoresUserContext } from '../../contexts/ChoresAuthContext';

const Login = ({ navigation }) => {

    // Auth Context Consumers
    const [userStatus, setUserStatus] = useChoresAuth();
    const [isLoggedIn, setIsLoggedIn] = useChoresAuthUpdateContext();
    const [profileInfo, setProfileInfo] = useChoresUserContext();

    // AsyncStorage for profile edited
    const { setItem } = useAsyncStorage("@isProfileEdited");
    const writeItemToStorage = async newValue => {
        await setItem(newValue);
    }

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
        setLoading(true);
        try {
            const auth = Firebase.auth;
            const userCredentials = await auth.signInWithEmailAndPassword(userAccount.email, userAccount.password);

            if (!userCredentials.user.emailVerified) {
                setLoading(false);
                Alert.alert(
                    "Verifica tu cuenta.",
                    'Email enviado al correo introducido',
                    [
                        {
                            text: 'Ok',
                            onPress: () => console.log('')
                        },
                        {
                            text: "Reenviar correo",
                            onPress: async () => {
                                await auth.currentUser.reload();
                                await auth.currentUser.sendEmailVerification();
                            }
                        }
                    ]
                )
            } else {
                if (profileInfo.profilePhotoPath == "") {
                    setUserStatus(userCredentials.user);
                    setIsLoggedIn(true);
                    await writeItemToStorage(JSON.stringify(true));
                    setUserAccount(userDetails);
                    setLoading(false);
                    navigation.replace('UserInit');
                } else {
                    setUserStatus(userCredentials.user);
                    setIsLoggedIn(true);
                    await writeItemToStorage(JSON.stringify(true));
                    setUserAccount(userDetails);
                    setLoading(false);
                    navigation.replace('Tabs');
                }
            }

        } catch (error) {
            console.log(error.code);
            console.log(error.message);
            setLoading(false);
            Alert.alert(
                "Inicio de Sesión incorrecto",
                'Vuelve a iniciar sesión.',
                [
                    {
                        text: 'Ok',
                        onPress: () => false
                    }
                ]
            )
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <SafeAreaView style={styles.screenContainer}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
                    {/* Banner  */}
                    <Banner />
                    {/* Form Fields */}
                    <View style={styles.formMargin}>
                        <Text style={styles.formTitle}>
                            Inicia Sesión
                        </Text>
                        <TextInput
                            mode='outlined'
                            label='Correo Electrónico'
                            value={userAccount.email}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            textContentType='emailAddress'
                            style={inputStyles.textInput}
                            onChangeText={(currentText) => handleTextChange('email', currentText)}
                            left={<TextInput.Icon name='email' color={COLORS.secondary} />}
                            underlineColor={COLORS.secondary}
                        />
                        <TextInput
                            mode='outlined'
                            label="Contraseña"
                            style={inputStyles.textInput}
                            autoCapitalize="none"
                            textContentType="password"
                            secureTextEntry={secureEntryPass}
                            value={inputStyles.password}
                            onChangeText={(currentText) => handleTextChange('password', currentText)}
                            right={
                                <TextInput.Icon name="eye" onPressOut={() => setSecureEntryPass(!secureEntryPass)} onPressIn={() => setSecureEntryPass(!secureEntryPass)} forceTextInputFocus={false}
                                    color={COLORS.secondary} />
                            }
                        />
                        <TouchableOpacity
                            style={inputStyles.buttonStyles}
                            onPress={() => submitForm()}>
                            <Text style={inputStyles.textStyles}>Entrar</Text>
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center' }}>
                            <Divider style={{ height: 1, width: "70%", backgroundColor: "gray", borderRadius: 4, marginTop: 50, marginBottom: 15 }} />
                            <Text style={{ color: COLORS.btn_primary }} onPress={() => navigation.dispatch(StackActions.replace('CreateAccount'))}>Crea una cuenta si no tienes una.</Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
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