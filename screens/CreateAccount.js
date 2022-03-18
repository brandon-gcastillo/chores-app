import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Components
import Loading from '../components/Loading';
import Logo from '../components/Logo';
import BottomWaves from '../components/BottomWaves';

const CreateAccount = () => {
    return(
        <View style={styles.viewContainer}>
            
        </View>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        padding: 15,
        paddingBottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontFamily: 'Cairo'
    }
});

export default CreateAccount;