import React, { useState } from 'react';
import {
    View,
    Button,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';

import { COLORS, DIMENS, icons } from '../../constants';

const User = ({ navigation }) => {

    return (
        <ScrollView style={styles.screenContainer} keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView behavior='position'>
                <View style={styles.mainContent}>
                    <Button
                        title='Personalizar Perfil'
                        onPress={() => navigation.navigate("UserInit")}
                    />
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
    }   
}

export default User;