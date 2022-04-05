import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView
} from 'react-native';

import { Card } from 'react-native-paper';

import { COLORS } from '../../constants';

const DATA = [
    {
        id: 1,
        text: 'H1'
    },
    {
        id: 2,
        text: 'H2'
    },
    {
        id: 3,
        text: 'H3'
    },
    {
        id: 4,
        text: 'H4'
    },
    {
        id: 5,
        text: 'H5'
    },
    {
        id: 6,
        text: 'H6'
    },
    {
        id: 7,
        text: 'H7'
    },
    {
        id: 8,
        text: 'H8'
    },
    {
        id: 9,
        text: 'H9'
    },
]

const GROUPS = [
    {
        id: 1,
        groupName: 'grupo familia',
        labelLastMessage: 'Ultimo Mensaje',
        lastMessage: 'Acabo de publicar una nueva tarea.'
    },
    {
        id: 2,
        groupName: 'grupo juegos',
        labelLastMessage: 'Ultimo Mensaje',
        lastMessage: 'Acabo de publicar una nueva tarea.'
    },
    {
        id: 3,
        groupName: 'grupo trabajo',
        labelLastMessage: 'Ultimo Mensaje',
        lastMessage: 'Acabo de publicar una nueva tarea.'
    },
    {
        id: 4,
        groupName: 'grupo iglesia',
        labelLastMessage: 'Ultimo Mensaje',
        lastMessage: 'Acabo de publicar una nueva tarea.'
    },
    {
        id: 5,
        groupName: 'grupo fut',
        labelLastMessage: 'Ultimo Mensaje',
        lastMessage: 'Acabo de publicar una nueva tarea.'
    },
]

const Group = ({ groupName, labelLastMessage, lastMessage }) => (
    <Card style={{elevation: 2, marginBottom: 10}}>
        <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
                style={{
                    backgroundColor: "#CA0913",
                    width: 70,
                    height: 70,
                    marginEnd: 10
                }}
            ></View>
            <View
                style={{
                    flexDirection: 'column',
                    padding: 10
                }}
            >
                <Text style={styles.groupName}>{groupName.toUpperCase()}</Text>
                <Text style={styles.groupLabel}>{`${labelLastMessage}:`}</Text>
                <Text style={styles.groupText}>{lastMessage}</Text>
            </View>
        </Card.Content>
    </Card>
)

const Item = ({ text }) => (
    <View style={{
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        width: 70,
        height: 70
    }}>
        <Text style={{
            fontFamily: 'Montserrat-semiBold',
            fontSize: 18,
            color: COLORS.white,
            elevation: 2
        }}>
            {text}
        </Text>
    </View>
)

const Home = ({ navigation }) => {

    const renderItem = ({ item }) => {
        return (
            <Item text={item.text} />
        )
    }

    return (
        <View style={styles.appContainer}>
            <ScrollView>
                <View style={styles.sectionContaier}>
                    <View style={styles.cardLabel}><Text style={styles.cardLabelText}>Habit Tracker</Text></View>
                    <View style={styles.quickItemsContainer}>
                        <FlatList
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                <View style={styles.sectionContaier}>
                    <View style={styles.cardLabel}><Text style={styles.cardLabelText}>Comunidades</Text></View>
                    <View style={styles.quickItemsContainer}>
                        {
                            GROUPS.map((item) => {
                                return(
                                    <Group 
                                        key={item.id} 
                                        groupName={item.groupName} 
                                        labelLastMessage={item.labelLastMessage}
                                        lastMessage={item.lastMessage}
                                    />
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        fontFamily: 'Montserrat'
    },
    sectionContaier: {
        paddingTop: 10
    },
    cardLabel: {
        backgroundColor: COLORS.white,
        padding: 15,
        elevation: 3
    },
    cardLabelText: {
        fontSize: 21,
        fontFamily: 'Montserrat-semiBold',
        letterSpacing: 0.6
    },
    quickItemsContainer: {
        padding: 15,
    },
    quickItems: {
        flexDirection: 'column',
        flexGrow: 1
    },
    groupName: {
        fontSize: 21,
        fontFamily: "Montserrat-semiBold",
        color: COLORS.textGray
    },
    groupLabel: {
        fontSize: 18,
        fontFamily: "Montserrat-semiBold",
        color: COLORS.textGray
    },
    groupText: {
        fontSize: 16,
        color: COLORS.textGray,
        width: 200
    }
})

export default Home;