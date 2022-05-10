import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { StackActions } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Divider } from "react-native-paper";

import Banner from "../../components/Banner";
import inputStyles from "../../styles/InputStyles";
import Loading from "../../components/Loading";
import { COLORS } from "../../constants";

// API Call to Create a New Account
import firebase from "../../api/Firebase";

// ChoresAuthApp Contexts
import { useChoresAuth } from "../../contexts/ChoresAuthContext";

const CreateAccount = ({ navigation }) => {

  // Context for update the user status
  const { setUserStatus } = useChoresAuth();

  // AsyncStorage to store when the profile was edited or not
  const { setItem } = useAsyncStorage("@isProfileEdited");

  const writeItemToStorage = async newValue => {
    await setItem(newValue);
  }

  const accountDetails = {
    username: "",
    email: "",
    password: "",
    password_confirmation: ""
  };

  const fieldErrors = {
    username: true,
    email: true,
    password: true,
    password_confirmation: true
  }

  const [account, setAccount] = useState(accountDetails);

  const [secureEntryPass, setSecureEntryPass] = useState(true)

  const [secureEntryPassConfirm, setSecureEntryPassConfirm] = useState(true);

  const [formErrors, setFormErrors] = useState(fieldErrors);

  const [loading, setLoading] = useState(false);

  const validateField = (name, text) => {
    switch (name) {
      case 'username':
        if (text != '') {
          setAccount({ ...account, [name]: text })
          setFormErrors({ ...formErrors, [name]: false })
        } else {
          setAccount({ ...account, [name]: text })
          setFormErrors({ ...formErrors, [name]: true })
        }
        break;
      case 'email':
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) == true) {
          setAccount({ ...account, [name]: text })
          setFormErrors({ ...formErrors, [name]: false })
        } else {
          setAccount({ ...account, [name]: text })
          setFormErrors({ ...formErrors, [name]: true })
        }
        break;
      case 'password':
        if (text === account.password_confirmation || text != '') {
          setAccount({ ...account, [name]: text })
          setFormErrors({ ...formErrors, [name]: false })
        } else {
          setAccount({ ...account, [name]: text })
          setFormErrors({ ...formErrors, [name]: true })
        }
        break;
      case 'password_confirmation':
        if (text === account.password || text != '') {
          setAccount({ ...account, [name]: text })
          setFormErrors({ ...formErrors, [name]: false })
        } else {
          setAccount({ ...account, [name]: text })
          setFormErrors({ ...formErrors, [name]: true })
        }
        break;
      default:
        break;
    }
  }

  const validateForm = async () => {
    let accountErrors = Object.values(formErrors);
    const formHasErrors = accountErrors.some(value => value == true);

    if (account.password != account.password_confirmation) {
      return Alert.alert(null, 'Verifica que las contraseñas coincidan.')
    } else if (formHasErrors) {
      return Alert.alert(null, 'Verifica los campos del formulario nuevamente.')
    } else {
      setLoading(true);
      const auth = firebase.auth;
      try {
        const userCredentials = await auth.createUserWithEmailAndPassword(account.email, account.password);
        
        if (!userCredentials.user.emailVerified) {
          setAccount(accountDetails);
          setFormErrors(fieldErrors);
          await auth.currentUser.sendEmailVerification();
          await auth.signOut();
          await writeItemToStorage(JSON.stringify(false));
          setLoading(false);

          Alert.alert(
            "Verifica tu cuenta.",
            "Correo de verificacion enviado.",
            [
              {
                text: 'Ok',
                onPress: () => false
              }
            ]
          );
        }

      } catch (err) {
        await auth.signOut();
        console.log(err.message);
        setLoading(false);
      }
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "position"}>
          <Banner />
          <View style={{ marginHorizontal: 25 }}>
            <Text style={{ marginBottom: 20, fontFamily: "Montserrat-semiBold", fontSize: 21 }}>Registrate</Text>

            <TextInput
              mode='outlined'
              label="Usuario"
              value={account.username}
              autoCapitalize="none"
              textContentType="username"
              style={inputStyles.textInput}
              onChangeText={(currentText) => validateField('username', currentText)}
              left={
                <TextInput.Icon
                  name='account'
                  color={COLORS.secondary} />
              } />

            <TextInput
              mode='outlined'
              label="Correo"
              value={account.email}
              autoCapitalize="none"
              textContentType="emailAddress"
              style={inputStyles.textInput}
              onChangeText={(currentText) => validateField('email', currentText)}
              left={
                <TextInput.Icon
                  name='email'
                  color={COLORS.secondary} />
              }
            />

            <TextInput
              mode='outlined'
              label="Contraseña"
              value={inputStyles.password}
              autoCapitalize="none"
              textContentType="newPassword"
              style={inputStyles.textInput}
              secureTextEntry={secureEntryPass}
              onChangeText={(currentText) => validateField('password', currentText)}
              right={
                <TextInput.Icon
                  color={COLORS.secondary}
                  name="eye" onPressOut={() => setSecureEntryPass(!secureEntryPass)} onPressIn={() => setSecureEntryPass(!secureEntryPass)} forceTextInputFocus={false} />
              }
            />

            <TextInput
              mode='outlined'
              label="Confirmar Contraseña"
              value={account.password_confirmation}
              autoCapitalize="none"
              textContentType="newPassword"
              style={inputStyles.textInput}
              secureTextEntry={secureEntryPassConfirm}
              onChangeText={(currentText) => validateField('password_confirmation', currentText)}
              right={
                <TextInput.Icon
                  color={COLORS.secondary}
                  name="eye"
                  onPressOut={() => setSecureEntryPassConfirm(!secureEntryPassConfirm)} onPressIn={() => setSecureEntryPassConfirm(!secureEntryPassConfirm)} forceTextInputFocus={false} />
              }
            />

            <TouchableOpacity
              style={inputStyles.buttonStyles}
              onPress={() => validateForm()}
            >
              <Text style={inputStyles.textStyles}>Entrar</Text>
            </TouchableOpacity>

            <View style={{ alignItems: 'center' }}>
              <Divider style={{ height: 1, width: "70%", backgroundColor: "gray", borderRadius: 4, marginTop: 50, marginBottom: 15 }} />
              <Text style={{ color: COLORS.btn_primary }} onPress={() => navigation.dispatch(StackActions.replace('Login'))}>¿Tienes una cuenta? Inicia sesión.</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: COLORS.lightBlue
  }
});

export default CreateAccount;
