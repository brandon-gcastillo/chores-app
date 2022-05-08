import { useState } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableNativeFeedback,
    ScrollView
} from 'react-native';

import { COLORS, DIMENS } from '../../constants';
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';


const urgencyLevels = [
    { label: 'Bajo', value: 'Bajo' },
    { label: 'Medio', value: 'Medio' },
    { label: 'Alto', value: 'Alto' }
]

const NewActivity = () => {

    const [titleChars, setTitleChars] = useState(0);
    const [descriptionChars, setDescriptionChars] = useState(0);

    const [urgencyValue, setUrgencyValue] = useState(null);
    const [isUrgencyFocus, setIsUrgencyFocus] = useState(false);

    const handleTextTileChars = (text) => setTitleChars(text.length);
    const handleTextDescriptionChars = (text) => setDescriptionChars(text.length);

    const TextInputProps = {
        inputTitle: {
            mode: "outlined",
            numberOfLines: 2,
            multiline: true,
            maxLength: 60,
            selectionColor: COLORS.lightBlueLink,
            outlineColor: COLORS.darkGray,
            style: styles.textInput.containerSingleLine,
            autoComplete: "off",
            placeholder: "Nueva actividad",
            onChangeText: (text) => handleTextTileChars(text)
        },
        inputDescription: {
            mode: "outlined",
            numberOfLines: 8,
            multiline: true,
            maxLength: 250,
            selectionColor: COLORS.lightBlueLink,
            outlineColor: COLORS.darkGray,
            style: styles.textInput.containerMultiLine,
            autoComplete: "off",
            autoCapitalize: "sentences",
            onChangeText: (text) => handleTextDescriptionChars(text)
        }
    }

    return (
        <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
            <KeyboardAvoidingView behavior='position'>
                <View style={{ padding: DIMENS.paddingDefault }}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textInput.text}>
                            Titulo
                        </Text>
                        <TextInput
                            {...TextInputProps.inputTitle}
                        />
                        <Text style={styles.charCounter}>{`${titleChars} / ${TextInputProps.inputTitle.maxLength}`}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textInput.text}>
                            Descripción
                        </Text>
                        <TextInput {...TextInputProps.inputDescription} />
                        <Text style={styles.charCounter}>{`${descriptionChars} / ${TextInputProps.inputDescription.maxLength}`}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textInput.text}>Nivel de Urgencia</Text>
                        <Dropdown
                            style={[styles.dropdown.container, isUrgencyFocus && { borderColor: COLORS.blueMidTone, borderWidth: 2 }]}
                            placeholderStyle={styles.dropdown.placeholder}
                            data={urgencyLevels}
                            value={urgencyValue}
                            onFocus={() => setIsUrgencyFocus(true)}
                            onBlur={() => setIsUrgencyFocus(false)}
                            onChange={item => {
                                setUrgencyValue(item.value);
                                setIsUrgencyFocus(false);
                            }}
                            labelField="label"
                            valueField="value"
                            placeholder="Selecciona una opcion..."
                            activeColor={COLORS.lightBlue}
                            containerStyle={styles.dropdown.listContainer}
                            selectedTextStyle={styles.dropdown.selectedText}
                        />
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
                                    <Text style={{color: "white", fontSize: 14, textAlign: 'center', fontFamily: 'Montserrat-semiBold', textTransform: 'uppercase'}}>Crear Actividad</Text>
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
    },
    dropdown: {
        container: {
            backgroundColor: COLORS.lightBlue,
            borderWidth: 1,
            borderColor: COLORS.lightGray,
            paddingTop: 5,
            paddingLeft: 10,
            paddingBottom: 10,
            borderRadius: 4,
            marginTop: 5,
        },
        listContainer: {
            position: 'absolute',
            top: -20,
            borderRadius: 4
        },
        placeholder: {
            color: COLORS.placeholderColor,
            fontSize: 15
        },
        selectedText: {
            color: COLORS.textGray
        }
    }
}

export default NewActivity;