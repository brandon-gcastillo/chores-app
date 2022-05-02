import {
    View,
    TouchableNativeFeedback,
    Alert,
    Text,
    ScrollView
} from 'react-native';

import { Title, Paragraph, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/GroupsHolderStyles';

const Groups = [
    {
        id: 1,
        groupName: "Lab. Dispositivos Moviles",
        openActivities: 10,
        lastActivity: "Pantalla Settings"
    },
    {
        id: 2,
        groupName: "Dispositivos Moviles",
        openActivities: 10,
        lastActivity: "Firebase to Custom API"
    },
    {
        id: 3,
        groupName: "Telecom",
        openActivities: 10,
        lastActivity: "PIA de Redes"
    },
    {
        id: 4,
        groupName: "Lab. Dispositivos Moviles",
        openActivities: 10,
        lastActivity: "Sacar la basura"
    },
    {
        id: 5,
        groupName: "Lab. Dispositivos Moviles",
        openActivities: 10,
        lastActivity: "Sacar la basura"
    },
    {
        id: 6,
        groupName: "Lab. Dispositivos Moviles",
        openActivities: 10,
        lastActivity: "Sacar la basura"
    },
    {
        id: 7,
        groupName: "Lab. Dispositivos Moviles",
        openActivities: 10,
        lastActivity: "Sacar la basura"
    }
]

const GroupItems = ({ groupName, lastActivity, openActivities }) => {
    const navigation = useNavigation();
    
    return(
        <TouchableNativeFeedback onPress={() => navigation.push("Group")}>
            <View style={styles.groupCard}>
                <View style={styles.thumbnailContainer}>
                    <View style={styles.thumbnail}>
                        <Text style={styles.thumbnailText}>G1</Text>
                    </View>
                    <Badge
                        size={25}
                        style={styles.thumbnailBadge}>
                        {openActivities}
                    </Badge>
                </View>
                <View style={styles.groupInfoContainer}>
                    <Title style={styles.title}>{groupName}</Title>
                    <Paragraph style={styles.text} numberOfLines={2}>{lastActivity}</Paragraph>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}

const GroupsScreen = ({ navigation }) => {

    return (
        <View style={styles.app_container}>
            <ScrollView>
                <View style={{ paddingHorizontal: 15, paddingTop: 15, paddingBottom: 80 }}>
                    {
                        Groups.map((group) => (
                            <GroupItems
                                key={group.id}
                                groupName={group.groupName}
                                lastActivity={group.lastActivity}
                                openActivities={group.openActivities}
                            />
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default GroupsScreen;