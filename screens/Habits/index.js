import {
    View,
    Button
} from 'react-native';

import { Card, Title } from 'react-native-paper';

const HabitsScreen = ({ navigation }) => (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
        <Card style={{ marginBottom: 20 }}>
            <Card.Content>
                <Title>Habits Screen</Title>
            </Card.Content>
        </Card>
        <Button
            title="Go to Create Account Screen... again"
            onPress={() => navigation.push("Login")}
            style={{ backgroundColor: "#000fff" }}
        />
    </View>
)

export default HabitsScreen;