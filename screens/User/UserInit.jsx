import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { COLORS, DIMENS, icons } from '../../constants';
import { FAB, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

// Firebase API
import Firebase from '../../api/Firebase';

// ChoresAuth Context Providers
import { useChoresAuth } from '../../contexts/ChoresAuthContext';

// Loading Screen
import Loading from '../../components/Loading';

const UserInit = ({ navigation }) => {

    // AsyncStorage to get/set the value if the profile was edited
    const { getItem, setItem } = useAsyncStorage("@isProfileEdited");
    const writeItemToStorage = async newValue => {
        await setItem(newValue);
    }
    const readItemFromStorage = async () => {
        const item = await getItem();
        return item;
    }

    const [loading, setLoading] = useState(false);

    const [userStatus, setUserStatus] = useChoresAuth();

    const [nameValue, setNameValue] = useState("");
    const [nameFieldError, setNameFieldError] = useState(false);

    const [firstNameValue, setFirstNameValue] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);

    const [secondNameValue, setSecondNameValue] = useState("");
    const [secondNameError, setSecondNameError] = useState(false);

    const [userNameValue, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState(false);

    const [image, setImage] = useState(null);
    const [status, requestPermissions] = ImagePicker.useMediaLibraryPermissions();
    const [cameraStatus, requestCameraPermission] = ImagePicker.useCameraPermissions();

    const requestCameraPermissions = async () => {
        if (cameraStatus.status !== 'granted' || !cameraStatus.granted) {
            const response = await requestCameraPermission();
            if (response.granted) takePhoto();
        } else {
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

            if (!result.cancelled) setImage(result.uri);
        }
    }

    const TextInputProps = {
        inputName: {
            mode: 'outlined',
            outlineColor: COLORS.darkGray,
            activeOutlineColor: COLORS.blueMidTone,
            selectionColor: COLORS.lightBlue,
            style: styles.textInput.containerSingleLine,
            maxLength: 60,
            autoComplete: 'off',
            value: nameValue,
            error: nameFieldError,
            onChangeText: (text) => handleValue(text, "name"),
            onFocus: () => setNameFieldError(false),
            onBlur: () => setNameFieldError(false),
        },
        inputFirstName: {
            mode: 'outlined',
            outlineColor: COLORS.darkGray,
            activeOutlineColor: COLORS.blueMidTone,
            selectionColor: COLORS.lightBlue,
            style: styles.textInput.containerSingleLine,
            maxLength: 60,
            autoComplete: 'off',
            value: firstNameValue,
            error: firstNameError,
            onChangeText: (text) => handleValue(text, "firstname"),
            onFocus: () => setFirstNameError(false),
            onBlur: () => setFirstNameError(false)
        },
        inputSecondName: {
            mode: 'outlined',
            outlineColor: COLORS.darkGray,
            activeOutlineColor: COLORS.blueMidTone,
            selectionColor: COLORS.lightBlue,
            style: styles.textInput.containerSingleLine,
            maxLength: 60,
            autoComplete: 'off',
            value: secondNameValue,
            error: secondNameError,
            onChangeText: (text) => handleValue(text, "secondname"),
            onFocus: () => setSecondNameError(false),
            onBlur: () => setSecondNameError(false)
        },
        inputUserName: {
            mode: 'outlined',
            outlineColor: COLORS.darkGray,
            activeOutlineColor: COLORS.blueMidTone,
            selectionColor: COLORS.lightBlue,
            style: styles.textInput.containerSingleLine,
            maxLength: 60,
            autoComplete: 'off',
            value: userNameValue,
            error: userNameError,
            onChangeText: (text) => handleValue(text, "username"),
            onFocus: () => setUserNameError(false),
            onBlur: () => setUserNameError(false)
        }
    }

    const handleValue = (text, input) => {
        if (input === 'name') {
            setNameValue(text);
        } else if (input === 'firstname') {
            setFirstNameValue(text);
        } else if (input === 'secondname') {
            setSecondNameValue(text);
        } else if (input === 'username') {
            setUserName(text);
        }
    }

    const handleNameErrors = () => {
        if (nameValue.trim() === '') {
            setNameFieldError(true);
            return true;
        } else {
            setNameFieldError(false);
            return false;
        }
    }

    const handleFirstNameErrors = () => {
        if (firstNameValue.trim() === '') {
            setFirstNameError(true);
            return true;
        } else {
            setFirstNameError(false);
            return false;
        }
    }

    const handleSecondNameErrors = () => {
        if (secondNameValue.trim() === '') {
            setSecondNameError(true);
            return true;
        } else {
            setSecondNameError(false);
            return false;
        }
    }

    const handleUserNameErrors = () => {
        if (userNameValue.trim() === '') {
            setUserNameError(true);
            return true;
        } else {
            setSecondNameError(false);
            return false;
        }
    }

    const handleErrors = () => {
        if (
            handleNameErrors() || handleFirstNameErrors() ||
            handleSecondNameErrors() || handleUserNameErrors()
        ) {
            return false;
        } else {
            return true;
        }
    }

    const uploadImage = async () => {
        const response = await fetch(image);
        const blob = await response.blob();
        const reference = Firebase.storageRef.child(`images/profile-pictures/${userStatus.uid}/profile_picture.jpg`);
        await reference.put(blob);
    }

    const uploadUserInfo = async () => {
        await Firebase.db.ref(`users/${userStatus.uid}/profile_information`).set({
            username: userNameValue,
            name: nameValue,
            firstname: firstNameValue,
            lastname: secondNameValue,
            profileEdited: true
        })
        await Firebase.db.ref(`active_users/${userNameValue}`).set({
            uid: userStatus.uid
        })
    }

    const getPhotoUrl = () => {
        try {
            const url = await Firebase.storageRef.child(`images/profile-pictures/${userStatus.uid}/profile_picture.jpg`).getDownloadURL()

        } catch (error) {
            console.log(error.message)
        }
    }

    const updateProfile = async () => {
        const user = Firebase.auth.currentUser;
        await user.updateProfile({
            displayName: nameValue + firstNameValue + secondNameValue,
        })
        setUserStatus(user);
    }

    const submitForm = async () => {
        await writeItemToStorage(JSON.stringify(true));
        if (handleErrors()) {
            if (userStatus !== null) {
                try {
                    setLoading(true);
                    uploadImage();
                    uploadUserInfo();
                    updateProfile();
                    setLoading(false);
                    navigation.replace('Tabs');
                } catch (err) {
                    console.log(err.message);
                }
            }
        }
    }

    if (loading) {
        return <Loading />
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
                                                source={{ uri: image }}
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
                    {/* Input del Nombre */}
                    <View style={styles.inputContainer}>
                        {/* Field */}
                        <View>
                            <Text style={styles.textInput.text}>Nombre(s)</Text>
                            <TextInput {...TextInputProps.inputName} />
                        </View>
                        {/* Error message */}
                        {
                            nameFieldError &&
                            <Text style={styles.textInput.error}>Este campo es requerido.</Text>
                        }
                    </View>
                    {/* Input del First Name */}
                    <View style={styles.inputContainer}>
                        {/* Field */}
                        <View>
                            <Text style={styles.textInput.text}>Primer Apellido</Text>
                            <TextInput {...TextInputProps.inputFirstName} />
                        </View>
                        {/* Error message */}
                        {
                            firstNameError &&
                            <Text style={styles.textInput.error}>Este campo es requerido.</Text>
                        }
                    </View>
                    {/* Input del Second Name */}
                    <View style={styles.inputContainer}>
                        {/* Field */}
                        <View>
                            <Text style={styles.textInput.text}>Ultimo Apellido</Text>
                            <TextInput {...TextInputProps.inputSecondName} />
                        </View>
                        {/* Error message */}
                        {
                            secondNameError &&
                            <Text style={styles.textInput.error}>Este campo es requerido.</Text>
                        }
                    </View>
                    {/* Input del Username */}
                    <View style={styles.inputContainer}>
                        {/* Field */}
                        <View>
                            <Text style={styles.textInput.text}>Nombre de Usuario</Text>
                            <TextInput {...TextInputProps.inputUserName} />
                        </View>
                        {/* Error message */}
                        {
                            userNameError &&
                            <Text style={styles.textInput.error}>Este campo es requerido.</Text>
                        }
                    </View>
                    {/* Guardar Btn */}
                    <View style={styles.btnContainer.container}>
                        <View style={styles.btnContainer.wrapper}>
                            <TouchableNativeFeedback onPress={() => submitForm()}>
                                <View style={styles.btnContainer.btnStyles}>
                                    <Text style={styles.btnContainer.text}>Guardar Cambios</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

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
            maxHeight: 150,
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
            backgroundColor: COLORS.fabBtnColor,
            position: 'absolute',
            bottom: 0,
            right: 10,
        }
    }
}

export default UserInit;