import { useState } from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';

import { COLORS, DIMENS } from '../../constants';
import { Paragraph, TextInput, Divider } from 'react-native-paper';

const NewActivity = () => {

    const [titleChars, setTitleChars] = useState(0);

    const handleTextTileChars = (text) => setTitleChars(text);

    const TextInputProps = {
        inputTitle: {
            mode: "outlined",
            numberOfLines: 2,
            maxLength: 140,
            selectionColor: COLORS.lightBlueLink,
            style: styles.textInput,
            autoComplete: "off",
            autoCapitalize: "sentences",
            onChangeText: (text) => handleTextTileChars(text)
        }
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView>
                <View style={{padding: DIMENS.paddingDefault}}>
                    <View>
                        <Text style={{ fontFamily: 'Montserrat-medium', fontSize: 21 }}>
                            Titulo
                        </Text>
                        <TextInput
                            {...TextInputProps.inputTitle}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = {
    textInput: {
        backgroundColor: COLORS.lightBlue,
        position: 'relative'
    }
}

export default NewActivity;