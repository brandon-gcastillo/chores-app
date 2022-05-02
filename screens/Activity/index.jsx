import {
    View,
    Text,
    TouchableNativeFeedback
} from 'react-native';
import Constants from 'expo-constants';
import { COLORS, DIMENS } from '../../constants';
import { Paragraph } from 'react-native-paper';

const Activity = () => {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.activityContainer}>
                <View style={styles.activityCardContainer}>
                    <TouchableNativeFeedback onPress={() => navigation.push('Activity')}>
                        <View style={styles.activityInnerCard}>
                            <View style={styles.thumbnailContainer}>
                                <Text style={styles.thumbnailContainer.text}>
                                    EC
                                </Text>
                            </View>
                            <View style={styles.activityDescription}>
                                <Text style={styles.activityDescription.title} numberOfLines={2}>
                                    Cambiar la Api a Firestore
                                </Text>
                                <Paragraph style={styles.activityDescription.text} numberOfLines={2}>
                                    Fecha de creación: 01/05/2022
                                </Paragraph>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
            {/* Description Field */}
            <View>
                <View style={styles.descriptionField.container}>
                    <Text style={styles.descriptionField.text}>Description</Text>
                    <Text style={styles.descriptionField.text}>Actualizado: 01/05/2022</Text>
                </View>
            </View>
        </View>
    )
}

const styles = {
    appContainer: {
        flex: 1,
    },
    activityContainer: {
        marginHorizontal: 10,
        marginVertical: 15
    },
    activityCardContainer: {
        borderRadius: 3,
        overflow: 'hidden',
        elevation: 3,
        width: "100%",
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
        width: "70%",
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
            justifyContent: 'space-between', 
            marginHorizontal: 10
        },
        text: {
            fontFamily: 'Montserrat-regular',
            fontSize: 14
        }
    }
}

export default Activity;