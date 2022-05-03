import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableNativeFeedback,
    Alert,
    Image
} from 'react-native';
import Constants from 'expo-constants';
import { icons } from '../../constants';
import { Divider, Paragraph } from 'react-native-paper';

// Stylesheet
import { GroupStyles as styles } from '../../styles/GroupStyles';

const ACTIVITIES = [
    {
        id: 1,
        createdAt: "01/05/2022",
        createdBy: "Erick Garcia",
        deadline: "01/05/2022",
        lastUpdate: "",
        title: "Change API",
        description: "Change API to Firebase",
        urgencyLevel: "Medium",
        reward: ""
    },
    {
        id: 2,
        createdAt: "01/05/2022",
        createdBy: "John Doe",
        deadline: "01/05/2022",
        lastUpdate: "",
        title: "Finish Settings Screen",
        description: "Build Settings UI Screen",
        urgencyLevel: "Low",
        reward: ""
    },
    {
        id: 3,
        createdAt: "01/05/2022",
        createdBy: "Erick Garcia",
        deadline: "01/05/2022",
        lastUpdate: "",
        title: "Change API",
        description: "Change API to Firebase",
        urgencyLevel: "Medium",
        reward: ""
    },
    {
        id: 4,
        createdAt: "01/05/2022",
        createdBy: "Erick Garcia",
        deadline: "01/05/2022",
        lastUpdate: "",
        title: "Change API",
        description: "Change API to Firebase",
        urgencyLevel: "Medium",
        reward: ""
    },
    {
        id: 5,
        createdAt: "01/05/2022",
        createdBy: "Erick Garcia",
        deadline: "01/05/2022",
        lastUpdate: "",
        title: "Change API",
        description: "Change API to Firebase",
        urgencyLevel: "Medium",
        reward: ""
    },
    {
        id: 6,
        createdAt: "01/05/2022",
        createdBy: "Erick Garcia",
        deadline: "01/05/2022",
        lastUpdate: "",
        title: "Change API",
        description: "Change API to Firebase",
        urgencyLevel: "Medium",
        reward: ""
    },
    {
        id: 7,
        createdAt: "01/05/2022",
        createdBy: "Erick Garcia",
        deadline: "01/05/2022",
        lastUpdate: "",
        title: "Change API",
        description: "Change API to Firebase",
        urgencyLevel: "Medium",
        reward: ""
    },
    {
        id: 8,
        createdAt: "01/05/2022",
        createdBy: "Erick Garcia",
        deadline: "01/05/2022",
        lastUpdate: "",
        title: "Change API",
        description: "Change API to Firebase",
        urgencyLevel: "Medium",
        reward: ""
    }
]

const Activities = ({ navigation, activity, alignmentStyles }) => {

    const { title, description, createdBy } = activity;

    const initials = createdBy.split(' ')
    const initialsFormat = initials[0][0] + initials[1][0];

    return (
        <View style={alignmentStyles}>
            <TouchableNativeFeedback onPress={() => navigation.push('Activity', activity)}>
                <View style={styles.activityInnerCard}>
                    <View style={styles.thumbnailContainer}>
                        <Text style={styles.thumbnailContainer.text}>
                            {initialsFormat}
                        </Text>
                    </View>
                    <View style={styles.activityDescription}>
                        <Text style={styles.activityDescription.title} numberOfLines={1}>
                            {title}
                        </Text>
                        <Paragraph style={styles.activityDescription.text} numberOfLines={2}>
                            {description}
                        </Paragraph>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

const GroupScreen = ({navigation}) => {

    const [rangeMode, setRangeMode] = useState("today");

    const checkIndexIsEven = (n) => n % 2 == 0;

    return (
        <View style={styles.appContainer}>
            <View style={styles.rangeHeaderContainer}>
                <View style={styles.activityRangeBtnsContainer}>
                    <View style={styles.rangeBtnWrapper}>
                        <TouchableNativeFeedback onPress={() => setRangeMode("today")}>
                            <View style={
                                rangeMode === "today" ?
                                    styles.rangeBtn : styles.rangeBtnAlt
                            }>
                                <Text style={
                                    rangeMode === "today" ?
                                        styles.rangeBtn.text : styles.rangeBtnAlt.text
                                }>Today</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.rangeBtnWrapper}>
                        <TouchableNativeFeedback onPress={() => setRangeMode("week")}>
                            <View style={
                                rangeMode === "week" ?
                                    styles.rangeBtn : styles.rangeBtnAlt
                            }>
                                <Text style={
                                    rangeMode === "week" ?
                                        styles.rangeBtn.text : styles.rangeBtnAlt.text
                                }>Week</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={{ ...styles.rangeBtnWrapper, marginRight: 0 }}>
                        <TouchableNativeFeedback onPress={() => setRangeMode("all")}>
                            <View
                                style={
                                    rangeMode === "all" ?
                                        styles.rangeBtn : styles.rangeBtnAlt
                                }
                            >
                                <Text
                                    style={
                                        rangeMode === "all" ?
                                            styles.rangeBtn.text : styles.rangeBtnAlt.text
                                    }>All</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <Divider style={styles.divider} />
            </View>
            <ScrollView>
                <View style={{ marginBottom: 70 }}>
                    {
                        ACTIVITIES.map((activity, index) => {
                            return (
                                <Activities
                                    key={activity.id}
                                    activity={activity}
                                    alignmentStyles={[styles.activityCardContainer, {
                                        alignSelf: checkIndexIsEven(index) ? 'flex-start' : 'flex-end'
                                    }]}
                                    navigation={navigation}
                                />
                            )
                        })
                    }
                </View>
            </ScrollView>
            <View style={styles.publishBtn.wrapper}>
                <TouchableNativeFeedback onPress={() => navigation.navigate('NewActivity')}>
                    <View style={styles.publishBtn}>
                        <Image
                            source={icons.groupScreen.editPencil}
                            style={styles.publishBtn.trailingIcon}
                            resizeMode='cover'
                        />
                        <Text style={styles.publishBtn.text}>
                            Publicar Actividad
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    )
}

export default GroupScreen;