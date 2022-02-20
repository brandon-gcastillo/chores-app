import { Text, TextInput } from 'react-native';

const PasswordInput = ({textStyle, textInputStyle}) => (
    <>
        <Text style={textStyle}>Contraseña</Text>
        <TextInput 
            autoComplete='off'
            textAlign='left'
            textContentType='password'
            autoCapitalize="none"
            secureTextEntry={true}
            style={textInputStyle}
        />
    </>
);

export default PasswordInput;