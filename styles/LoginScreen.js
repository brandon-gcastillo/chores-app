import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        padding: 15,
        paddingBottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontFamily: 'Cairo'
    },
    textStyle: {
        textAlign: 'left',
        marginBottom: 15,
        fontSize: 18,
        fontFamily: 'Cairo',
    },
    logoContainer: {
        marginTop: 100,
        width: 209.66,
        height: 170,
        marginBottom: 70,
    },
    textInputStyle: {
        borderRadius: 3,
        backgroundColor: "#F3F5F9",
        padding: 20,
        width: 330,
        height: 60
    },
    inputContainer: {
        marginTop: 20
    },
    creatAccountContainer: {
        marginTop: 50,
    },
    createAccountText: {
        textTransform: 'uppercase', 
        color: '#676DFF', 
        fontWeight: 'bold'
    }
});

export default styles;