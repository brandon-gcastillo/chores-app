import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Card, Title, Paragraph } from "react-native-paper";

const CreateAccount = () => {

  const accountDetails = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  const [account, setAccount] = useState(accountDetails);

  const [confirmEmail, setConfirmEmail] = useState("");

  const handleTextchange = (name, value) => {
      setAccount({
          ...account,
          [name]: value
      })
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Card style={{ padding: 15, elevation: 4 }}>
          <Card.Content>
            <Title style={{ marginBottom: 20 }}>Registrate</Title>
            <TextInput
              label="Usuario"
              value={account.username}
              autoCapitalize="none"
              textContentType="username"
              style={styles.textInput}
              onChangeText={(currentText) => handleTextchange('username', currentText)}
            />
            <TextInput
              label="Correo"
              value={account.email}
              autoCapitalize="none"
              textContentType="emailAddress"
              style={styles.textInput}
              onChangeText={(currentText) => handleTextchange('email', currentText)}
            />
            <TextInput
              label="Contraseña"
              value={account.password}
              autoCapitalize="none"
              textContentType="newPassword"
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={(currentText) => handleTextchange('password', currentText)}
            />
            <TextInput
              label="Confirmar Contraseña"
              value={account.passwordConfirmation}
              autoCapitalize="none"
              textContentType="newPassword"
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={(currentText) => handleTextchange('passwordConfirmation', currentText)}
            />
            <TouchableOpacity
              style={styles.buttonStyles}
              onPress={() => console.log("button pressed!")}
            >
              <Text style={styles.textStyles}>Entrar</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
        <Card style={{ marginTop: 15, padding: 15 }}>
          <Card.Content>
            <Title>Results</Title>
            <Paragraph>
              Correo: {account.email} {"\n"}
              Confirmacion de Correo: {confirmEmail} {"\n"}
              Password: {account.password} {"\n"}
            </Paragraph>
          </Card.Content>
        </Card>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 15,
    fontFamily: "Montserrat",
    justifyContent: "space-around",
  },
  textInput: {
    marginBottom: 15,
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
    fontWeight: "bold",
  },
});

export default CreateAccount;
