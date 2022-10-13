import { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Image,
    Pressable
} from 'react-native';

import { Card } from 'react-native-paper';

import { COLORS, DIMENS, backgrounds, icons } from '../../constants';
import Constants from 'expo-constants';
import { useChoresAuth, useChoresUserContext } from '../../contexts/ChoresAuthContext';

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
    <Card style={{ elevation: 2, marginBottom: 10 }}>
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
    };

    const [profileInfo, setProfileInfo] = useChoresUserContext();
    const [userStatus, setUserStatus] = useChoresAuth();

    useEffect(() => {
        console.log(userStatus);
        console.log(profileInfo);
    }, [userStatus, profileInfo])


    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ padding: DIMENS.paddingDefault }}>
                {/* Welcome section */}
                <View style={{
                    width: 300,
                    height: 90,
                    backgroundColor: COLORS.primary,
                    borderRadius: 100,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    elevation: 3
                }} >
                    <View style={{ marginLeft: 15 }}>
                        <Image source={require('../../assets/saturn.jpg')} style={{ width: 65, height: 65, borderRadius: 50 }} resizeMode='cover' />
                    </View>
                    <Pressable onPress={() => navigation.navigate("Mi Perfil")}>
                        <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                            <Text
                                style={{ fontFamily: 'Montserrat-semiBold', color: COLORS.secondary, textTransform: 'uppercase', fontSize: 21 }}>
                                Bienvenido
                            </Text>
                            <Text style={{ fontFamily: 'Montserrat-regular', color: COLORS.secondary, fontSize: 16 }}>Erick Garcia</Text>
                        </View>
                    </Pressable>
                </View>
                <View>
                    {/* **************** */}
                    <View style={styles.sections.header}>
                        <Text style={styles.sections.text}>Actividades Asignadas</Text>
                    </View>
                    <View style={styles.sections.noActivityContainer}>
                        <Text style={styles.sections.noActivityText}>
                            No hay ninguna tarea asignada por el momento, crea una o esperemos a que te asignen una.
                        </Text>
                        <View style={styles.simpleBtn.container}>
                            <Pressable
                                onPress={() => navigation.push('NewActivity')}
                                style={styles.simpleBtn.btn}>
                                <Image
                                    source={icons.header.plusIcon}
                                    style={styles.simpleBtn.icon}
                                />
                                <Text style={styles.simpleBtn.text}>Crear Actividad</Text>
                            </Pressable>
                        </View>
                    </View>
                    {/* *************** */}
                </View>
                <View>
                    <View style={styles.sections.header}>
                        <Text style={styles.sections.text}>Grupos activos</Text>
                    </View>
                    <View style={styles.sections.noActivityContainer}>
                        <Text style={styles.sections.noActivityText}>No hay grupos que mostrar. Puedes crear uno si prefieres!</Text>
                        <View style={styles.simpleBtn.container}>
                            <Pressable onPress={() => navigation.push('NewGroup')} style={styles.simpleBtn.btn}>
                                <Image
                                    source={icons.header.plusIcon}
                                    style={styles.simpleBtn.icon}
                                />
                                <Text style={styles.simpleBtn.text}>Crear Grupo</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                {/* <View style={styles.sectionContaier}>
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
                <View style={{paddingBottom: 70, ...styles.sectionContaier}}>
                    <View style={styles.cardLabel}><Text style={styles.cardLabelText}>Comunidades</Text></View>
                    <View style={styles.quickItemsContainer}>
                        {
                            GROUPS.map((item) => {
                                return (
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
                </View> */}
            </View>
        </ScrollView>
    )
}

const styles = {
    appContainer: {
        flex: 1,
    },
    sectionContaier: {
        paddingTop: 10
    },
    sections: {
        header: {
            height: 45,
            width: "100%",
            padding: 10,
            marginTop: DIMENS.mgVr,
            backgroundColor: COLORS.white,
            elevation: 3,
            borderRadius: 4
        },
        text: {
            fontFamily: 'Montserrat-medium',
            fontSize: 18
        },
        noActivityContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 150,
            marginHorizontal: 50
        },
        noActivityText: {
            color: COLORS.textGray,
            textAlign: 'center'
        },
    },
    simpleBtn: {
        container: {
            marginTop: 15
        },
        btn: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        icon: {
            tintColor: 'blue',
            height: 21,
            width: 21
        },
        text: {
            color: 'blue',
            fontSize: 14,
            marginLeft: 10
        }
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
}

export default Home;