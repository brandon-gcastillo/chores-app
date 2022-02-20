import { Text, TextInput } from 'react-native';

const EmailInput = ({textStyle, textInputStyle}) => (
    <>
        <Text style={textStyle}>Correo</Text>
        <TextInput 
            autoComplete='off'
            textAlign='left'
            textContentType='emailAddress'
            keyboardType='email-address'
            autoCapitalize="none"
            style={textInputStyle}
        />
    </>
);

export default EmailInput;