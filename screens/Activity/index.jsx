import { useState } from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import Constants from 'expo-constants';
import { COLORS, DIMENS } from '../../constants';
import { Paragraph, TextInput, Divider } from 'react-native-paper';

const Activity = ({ navigation, route }) => {

    const { title, description, createdBy, createdAt, lastUpdate, urgencyLevel } = route.params;

    // Description field
    const [descriptionValue, setDescriptionValue] = useState(description !== "" ? description : "");
    const [descriptionChars, setDescriptionChars] = useState( description.length > 0 && description !== "" ? description.length : 0 );
    
    const [messageValue, setMessageValue] = useState("");
    const [messageChars, setMessageChars] = useState(0);

    const handleDescriptionText = (text) => {
        setDescriptionValue(text);
        setDescriptionChars(text.length);
    }

    const handleMessageText = (text) => {
        setMessageValue(text);
        setMessageChars(text.length)
    }

    const TextInputProps = {
        inputDescription: {
            mode: 'outlined',
            label: "Description",
            numberOfLines: 5,
            multiline: true,
            style: styles.textInput,
            autoComplete: "off",
            autoCapitalize: "sentences",
            maxLength: 350,
            selectionColor: "lightblue",
            editable: true,
            value: descriptionValue,
            onChangeText: (text) => handleDescriptionText(text)
        },
        inputMessage: {
            mode: 'outlined',
            label: "Message",
            numberOfLines: 5,
            multiline: true,
            style: styles.textInput,
            autoComplete: "off",
            autoCapitalize: "sentences",
            maxLength: 350,
            selectionColor: "lightblue",
            value: messageValue,
            onChangeText: (text) => handleMessageText(text)
        }
    }

    return (
        <ScrollView style={styles.appContainer}>
            <KeyboardAvoidingView style={{ padding: DIMENS.paddingDefault }} behavior='position'>
                <View style={styles.activityContainer}>
                    <View style={styles.activityCardContainer}>
                        <TouchableNativeFeedback onPress={() => navigation.push('Activity')}>
                            <View style={styles.activityInnerCard}>
                                <View style={styles.activityDescription}>
                                    <Text style={styles.activityDescription.title}>
                                        {title}
                                    </Text>
                                    <Paragraph style={styles.activityDescription.text} numberOfLines={2}>
                                        Creado por: {createdBy}
                                    </Paragraph>
                                    <Paragraph style={styles.activityDescription.text} numberOfLines={2}>
                                        Fecha de creación: {createdAt}
                                    </Paragraph>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                {/* Description Field */}
                <View>
                    {
                        lastUpdate !== "" ?
                            <View style={styles.descriptionField.container}>
                                <Text style={styles.descriptionField.text}>
                                    {`Actualizado: ${lastUpdate}`}
                                </Text>
                            </View>
                            :
                            <View></View>
                    }
                    <View>
                        <TextInput {...TextInputProps.inputDescription} />
                        <Text style={styles.charCounter}>{descriptionChars} / 350</Text>
                    </View>
                    <View style={styles.urgencySection}>
                        <Text style={styles.outerText}>Nivel de Urgencia</Text>
                        {
                            urgencyLevel !== "" ?
                                urgencyLevel === "High" ?
                                    <View style={styles.pillsLabels.redPill}>
                                        <Text style={styles.pillsLabels.text}>
                                            High
                                        </Text>
                                    </View>
                                    :
                                    urgencyLevel === "Medium" ?
                                        <View style={styles.pillsLabels.bluePill}>
                                            <Text style={styles.pillsLabels.text}>
                                                Medium
                                            </Text>
                                        </View>
                                        :
                                        <View style={styles.pillsLabels.greenPill}>
                                            <Text style={styles.pillsLabels.text}>
                                                Low
                                            </Text>
                                        </View>
                                :
                                false
                        }
                    </View>
                </View>
                {/* Chat Section */}
                <View style={{position: 'relative'}}>
                    <View style={{ marginBottom: DIMENS.mgBt }}>
                        <Text style={styles.textTitle}>Conversación con {createdBy}</Text>
                        <Divider style={styles.divider} />
                        {/* <View style={{ alignItems: 'flex-end' }}>
                            <View style={{ marginVertical: 15, backgroundColor: COLORS.lightBlueMidTone, padding: 12, width: "60%", borderRadius: 8 }}>
                                <Text style={{ fontFamily: 'Montserrat-regular', textAlign: 'left' }}>Tengo una duda sobre la actividad.</Text>
                            </View>
                        </View> */}
                        {/* Message Field */}
                        <TextInput {...TextInputProps.inputMessage} />
                        <Text style={styles.charCounter}>{messageChars} / 350</Text>
                    </View>
                    <View style={{marginHorizontal: 0, borderRadius: 5, elevation: 3, overflow: 'hidden', width: 160, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                        <TouchableNativeFeedback onPress={() => console.log("Hi")}>
                            <View style={styles.sendMessageBtn.container}>
                                <Text style={styles.sendMessageBtn.text}>Enviar Mensaje</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = {
    appContainer: {
        flex: DIMENS.defaultFlex,
        backgroundColor: COLORS.white
    },
    activityContainer: {
        marginBottom: DIMENS.mgBt
    },
    activityCardContainer: {
        overflow: 'hidden',
        width: "100%",
        borderColor: COLORS.black,
        borderBottomWidth: 1,
        backgroundColor: COLORS.white,
    },
    activityInnerCard: {
        height: 120,
        width: "100%",
        flexDirection: 'row',
    },
    thumbnailContainer: {
        height: "100%",
        width: "30%",
        position: 'relative',
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        text: {
            fontFamily: 'Montserrat-semiBold',
            fontSize: 32,
            textAlign: 'center',
            color: COLORS.white,
            letterSpacing: 1,
            elevation: 3
        }
    },
    activityDescription: {
        flexDirection: 'column',
        paddingVertical: 8,
        paddingHorizontal: 10,
        width: "100%",
        justifyContent: 'space-between',
        title: {
            fontFamily: 'Montserrat-medium',
            fontSize: 20,
            textTransform: 'uppercase'
        },
        text: {
            fontWeight: '400',
            fontSize: 14,
        }
    },
    descriptionField: {
        container: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
        text: {
            fontFamily: 'Montserrat-medium',
            fontSize: 14
        }
    },
    textInput: {
        backgroundColor: COLORS.lightBlue,
        position: 'relative'
    },
    charCounter: {
        textAlign: 'right',
        color: COLORS.lightGray,
        position: 'absolute',
        bottom: 5,
        right: 5
    },
    urgencySection: {
        marginVertical: DIMENS.mgVr,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    outerText: {
        fontSize: 14,
        fontFamily: 'Montserrat-medium',
        marginRight: 10
    },
    pillsLabels: {
        redPill: {
            backgroundColor: '#ff0000',
            width: 100,
            padding: 5, borderRadius: 50, justifyContent: 'center', alignItems: 'center'
        },
        bluePill: {
            backgroundColor: COLORS.blueMidTone,
            width: 100,
            padding: 5, borderRadius: 50, justifyContent: 'center', alignItems: 'center'
        },
        greenPill: {
            backgroundColor: 'green',
            width: 100,
            padding: 5, borderRadius: 50, justifyContent: 'center', alignItems: 'center'
        },
        text: {
            fontSize: 14,
            fontFamily: 'Montserrat-semiBold',
            textTransform: 'uppercase',
            color: COLORS.white
        }
    },
    textTitle: {
        fontSize: 14,
        fontFamily: 'Montserrat-semiBold',
        textTransform: 'uppercase',
        marginBottom: 10
    },
    divider: {
        height: 2,
        width: "100%",
        borderRadius: 50,
        marginBottom: 10
    },
    sendMessageBtn: {
        container: {
            backgroundColor: COLORS.blueMidTone,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5, 
            elevation: 3, 
            overflow: 'hidden',
            width: 160,
            height: 40
        },
        text: {
            color: COLORS.white,
            fontSize: 14,
            fontFamily: "Montserrat-medium",
            textAlign: 'center',
            textTransform: 'uppercase'
        }
    }
}

export default Activity;