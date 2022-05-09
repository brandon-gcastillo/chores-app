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

import * as ImagePicker from 'expo-image-picker';

const NewGroup = () => {

    const [titleChars, setTitleChars] = useState(0);
    const [titleValue, setTitleValue] = useState("");
    const [usersValue, setUsersValue] = useState([]);
    const [titleFieldError, setTitleFieldError] = useState(false);
    const [usersFieldError, setUsersFieldError] = useState(false);

    const [image, setImage] = useState(null);
    const [status, requestPermissions] = ImagePicker.useMediaLibraryPermissions();
    const [cameraStatus, requestCameraPermission] = ImagePicker.useCameraPermissions();

    const requestCameraPermissions = async () => {
        if ( cameraStatus.status !== 'granted' || !cameraStatus.granted) {
            const response = await requestCameraPermission();
            if(response.granted) takePhoto();
        } else {
            console.log("Permission for Camera is granted!");
            takePhoto();
        }
    }

    const takePhoto = async () => {
        if (cameraStatus.granted) {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8
            });

            console.log(result);

            if (!result.cancelled) setImage(result.uri);
        }
    }
    
    const requestMediaPermissions = async () => {
        if (status.status !== 'granted' || !status.granted) {
            const response = await requestPermissions();
            if (response.granted) pickImage();
        } else {
            console.log("Permission is granted!");
            pickImage();
        }
    }

    const pickImage = async () => {
        // Permissions to MediaLibrary request is necessary for launching the image library
        if (status.granted) {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8
            });

            console.log(result);

            if (!result.cancelled) setImage(result.uri);
        }
    }

    const TextInputProps = {
        inputTitle: {
            mode: 'outlined',
            outlineColor: COLORS.darkGray,
            activeOutlineColor: COLORS.blueMidTone,
            selectionColor: COLORS.lightBlue,
            maxLength: 45,
            autoComplete: 'off',
            value: titleValue,
            error: titleFieldError,
            onChangeText: (text) => handleValue(text, "title"),
            onFocus: () => setTitleFieldError(false)
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
            error: usersFieldError,
            onChangeText: (text) => handleValue(text, "users"),
            onFocus: () => setUsersFieldError(false)
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
                item && users.push(item.trim())
            })
            setUsersValue(users);
        }
    }

    const handleErrors = () => {
        if (
            (usersValue.length === 0 || usersValue === null) && (titleValue === '' || titleValue == null)
        ) {
            setTitleFieldError(true);
            setUsersFieldError(true);
            TextInputProps.inputTitle.error = true;
            TextInputProps.inputUsers.error = true;
        } else if (titleValue === '' || titleValue == null) {
            setTitleFieldError(true);
            TextInputProps.inputTitle.error = true;
        } else if (usersValue.length === 0 || usersValue === null) {
            setUsersFieldError(true);
            TextInputProps.inputUsers.error = true;
        } else {
            setTitleFieldError(false);
            setUsersFieldError(false);
            TextInputProps.inputTitle.error = false;
            TextInputProps.inputUsers.error = false;
        }
    }

    return (
        <ScrollView style={styles.screenContainer} keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView behavior='position'>
                <View style={styles.mainContent}>
                    <View style={styles.imageContainer.container}>
                        <View style={styles.imageContainer.maskedView}>
                            <TouchableNativeFeedback onPress={() => requestMediaPermissions()}>
                                <View
                                    style={styles.imageContainer.innerView}
                                >
                                    {
                                        image === null ?
                                            <Image
                                                source={require('../../assets/saturn.jpg')}
                                                resizeMode='cover'
                                                style={styles.imageContainer.imageOptions}
                                            />
                                            :
                                            <Image
                                                source={{uri: image}}
                                                resizeMode='cover'
                                                style={styles.imageContainer.imageOptions}
                                            />
                                    }
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <FAB
                            style={styles.imageContainer.fabBtn}
                            small
                            animated
                            accessibilityLabel="Take a photo or pick image from gallery."
                            icon={icons.others.camera}
                            onPress={() => requestCameraPermissions()}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        {/* Field */}
                        <View>
                            <Text style={styles.textInput.text}>Nombre</Text>
                            <TextInput {...TextInputProps.inputTitle} />
                            <Text style={styles.charCounter}>{`${titleChars} / ${TextInputProps.inputTitle.maxLength}`}</Text>
                        </View>
                        {
                            titleFieldError &&
                            <Text style={styles.textInput.error}>Porfavor completa este campo. Introduce un titulo no mayor a 45 caracteres.</Text>
                        }
                    </View>
                    <View style={styles.inputContainer}>
                        <View>
                            <Text style={styles.textInput.text}>Usuarios del grupo (uno por linea)</Text>
                            <TextInput {...TextInputProps.inputUsers} />
                        </View>
                        {
                            usersFieldError &&
                            <Text style={styles.textInput.error}>Porfavor completa este campo. Un usuario por linea.</Text>
                        }
                    </View>
                    <View style={styles.btnContainer.container}>
                        <View style={styles.btnContainer.wrapper}>
                            <TouchableNativeFeedback onPress={() => handleErrors()}>
                                <View style={styles.btnContainer.btnStyles}>
                                    <Text style={styles.btnContainer.text}>Crear Grupo</Text>
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
        },
        error: {
            color: '#ff0000',
            fontFamily: 'Montserrat-medium'
        }
    },
    charCounter: {
        textAlign: 'right',
        color: COLORS.lightGray,
        position: 'absolute',
        bottom: 5,
        right: 10
    },
    btnContainer: {
        container: {
            marginTop: 20,
            flexDirection: 'column',
            justifyContent: 'flex-start'
        },
        wrapper: {
            borderRadius: 4,
            backgroundColor: COLORS.blueMidTone,
            alignSelf: 'flex-end',
            overflow: 'hidden',
            elevation: 3
        },
        btnStyles: {
            width: 180,
            height: 45,
            justifyContent: 'center'
        },
        text: {
            color: "white",
            fontSize: 14,
            textAlign: 'center',
            fontFamily: 'Montserrat-semiBold',
            textTransform: 'uppercase'
        }
    },
    imageContainer: {
        container: {
            width: 128,
            height: 128,
            marginBottom: 60,
            alignSelf: 'center'
        },
        maskedView: {
            width: 128,
            height: 128,
            borderRadius: 100,
            elevation: 3,
            overflow: 'hidden'
        },
        innerView: { 
            backgroundColor: 'lightgray', 
            height: 128, 
            width: 128, 
            borderRadius: 100 
        },
        imageOptions: { 
            width: 128, 
            height: 128 
        },
        fabBtn: { 
            backgroundColor: COLORS.lightBlueMidTone, 
            position: 'absolute', 
            bottom: 0, 
            right: 10 
        }
    }
}

export default NewGroup;