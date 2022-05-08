import { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableNativeFeedback,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import { COLORS, DIMENS, icons } from '../../constants/index';
import { FAB, TextInput } from 'react-native-paper';

const NewGroup = () => {

    const [titleChars, setTitleChars] = useState(0);
    const [titleValue, setTitleValue] = useState("");
    const [usersValue, setUsersValue] = useState({});


    const TextInputProps = {
        inputTitle: {
            mode: 'outlined',
            outlineColor: COLORS.darkGray,
            activeOutlineColor: COLORS.blueMidTone,
            selectionColor: COLORS.lightBlue,
            maxLength: 45,
            autoComplete: 'off',
            value: titleValue,
            onChangeText: (text) => handleValue(text, "title"),
        },
        inputUsers: {
            mode: 'outlined',
            selectionColor: COLORS.lightBlueLink,
            activeOutlineColor: COLORS.blueMidTone,
            outlineColor: COLORS.darkGray,
            multiline: true,
            numberOfLines: 8,
            placeholder: "Nombre de usuario",
            autoCapitalize: "none",
            onChangeText: (text) => handleValue(text, "users")
        }
    }

    const handleValue = (text, input) => {
        if (input === 'title') {
            setTitleChars(text.length);
            setTitleValue(text);
        } else if (input === 'users') {
            let users = []
            let splitValues = text.split("\n")
            splitValues.forEach(item => {
                if (item !== '') {
                    users.push(item.trim())
                }
            })
            setUsersValue(users);
        }
    }


    return (
        <ScrollView style={styles.screenContainer}>
            <KeyboardAvoidingView behavior='position'>
                <View style={styles.mainContent}>
                    <View
                        style={{
                            width: 128,
                            height: 128,
                            marginBottom: 60,
                            alignSelf: 'center'
                        }}
                    >
                        <View
                            style={{
                                width: 128,
                                height: 128,
                                borderRadius: 100,
                                elevation: 3,
                                overflow: 'hidden'
                            }}
                        >
                            <TouchableNativeFeedback onPress={() => console.log("Hi!")}>
                                <View
                                    style={{ backgroundColor: 'lightgray', height: 128, width: 128, borderRadius: 100 }}
                                >
                                    <Image
                                        source={require('../../assets/saturn.jpg')}
                                        resizeMode='cover'
                                        style={{ width: 128, height: 128 }}
                                    />
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <FAB
                            style={{ backgroundColor: COLORS.lightBlueMidTone, position: 'absolute', bottom: 0, right: 10 }}
                            small
                            animated
                            accessibilityLabel="Take a photo or pick image from gallery."
                            icon={icons.others.camera}
                            onPress={() => console.log("Hi!")}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textInput.text}>Nombre</Text>
                        <TextInput {...TextInputProps.inputTitle} />
                        <Text style={styles.charCounter}>{`${titleChars} / ${TextInputProps.inputTitle.maxLength}`}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textInput.text}>Usuarios del grupo (uno por linea)</Text>
                        <TextInput {...TextInputProps.inputUsers}/>
                    </View>
                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: 'column',
                            justifyContent: 'flex-start'
                        }}
                    >
                        <View style={{borderRadius: 4, backgroundColor: COLORS.blueMidTone, alignSelf: 'flex-end', overflow: 'hidden', elevation: 3}}>
                            <TouchableNativeFeedback onPress={() => console.log("hi!")}>
                                <View style={{width: 180, height: 45, justifyContent: 'center'}}>
                                    <Text style={{color: "white", fontSize: 14, textAlign: 'center', fontFamily: 'Montserrat-semiBold', textTransform: 'uppercase'}}>Crear Grupo</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
};

const styles = {
    screenContainer: {
        backgroundColor: "white",
        flex: 1
    },
    mainContent: {
        padding: DIMENS.paddingDefault,
    },
    inputContainer: {
        marginBottom: 15
    },
    textInput: {
        containerSingleLine: {
            backgroundColor: COLORS.lightBlue,
            position: 'relative',
            maxHeight: 150
        },
        containerMultiLine: {
            backgroundColor: COLORS.lightBlue,
            position: 'relative',
        },
        text: {
            fontFamily: 'Montserrat-medium',
            fontSize: 16
        }
    },
    charCounter: {
        textAlign: 'right',
        color: COLORS.lightGray,
        position: 'absolute',
        bottom: 5,
        right: 10
    }
}

export default NewGroup;