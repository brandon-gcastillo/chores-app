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

import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";

import Banner from "../components/Banner";
import inputStyles from "../styles/InputStyles";
import Loading from "../components/Loading";

// API Call to Create a New Account
import CreateAccountAPI from "../api/CreateAccount";


const CreateAccount = ({ navigation }) => {

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
    console.log(name)
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

    console.log("Errores ", accountErrors);
    console.log(formHasErrors)

    if (account.password != account.password_confirmation) {
      return Alert.alert(null, 'Verifica que las contraseñas coincidan.')
    } else if (formHasErrors) {
      return Alert.alert(null, 'Verifica los campos del formulario nuevamente.')
    } else {
      try {
        setLoading(true);
        await CreateAccountAPI(account);
        setAccount(accountDetails);
        setFormErrors(fieldErrors)
        setLoading(false);
        navigation.navigate('Tabs');
      } catch (err) {
        console.log(err);
      }
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Banner />
          <View style={{ marginHorizontal: 25 }}>
            <Text style={{ marginBottom: 20, fontFamily: "Montserrat-semiBold", fontSize: 21 }}>Registrate</Text>

            <TextInput
              label="Usuario"
              value={account.username}
              autoCapitalize="none"
              textContentType="username"
              style={inputStyles.textInput}
              onChangeText={(currentText) => validateField('username', currentText)}
              left={<TextInput.Icon name='account' />}
            />

            <TextInput
              label="Correo"
              value={account.email}
              autoCapitalize="none"
              textContentType="emailAddress"
              style={inputStyles.textInput}
              onChangeText={(currentText) => validateField('email', currentText)}
              left={<TextInput.Icon name='email' />}
            />

            <TextInput
              label="Contraseña"
              value={inputStyles.password}
              autoCapitalize="none"
              textContentType="newPassword"
              style={inputStyles.textInput}
              secureTextEntry={secureEntryPass}
              onChangeText={(currentText) => validateField('password', currentText)}
              right={<TextInput.Icon name="eye" onPressOut={() => setSecureEntryPass(!secureEntryPass)} onPressIn={() => setSecureEntryPass(!secureEntryPass)} forceTextInputFocus={false} />}
            />

            <TextInput
              label="Confirmar Contraseña"
              value={account.password_confirmation}
              autoCapitalize="none"
              textContentType="newPassword"
              style={inputStyles.textInput}
              secureTextEntry={secureEntryPassConfirm}
              onChangeText={(currentText) => validateField('password_confirmation', currentText)}
              right={<TextInput.Icon name="eye" onPressOut={() => setSecureEntryPassConfirm(!secureEntryPassConfirm)} onPressIn={() => setSecureEntryPassConfirm(!secureEntryPassConfirm)} forceTextInputFocus={false} />}
            />

            <TouchableOpacity
              style={inputStyles.buttonStyles}
              onPress={() => validateForm()}
            >
              <Text style={inputStyles.textStyles}>Entrar</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: '#FFFCFC'
  }
});

export default CreateAccount;
