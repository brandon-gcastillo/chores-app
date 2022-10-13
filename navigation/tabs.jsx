import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Pressable
} from 'react-native';

// Tabs Component
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';

import Home from '../screens/Home';
import GroupsScreen from '../screens/Groups';
import Settings from '../screens/Settings';
import User from '../screens/User';

import { COLORS, icons } from '../constants';
import Constants from 'expo-constants';

const Tab = createBottomTabNavigator();

const CustomHeader = (props) => {
    const title = getHeaderTitle(props.options, props.route.name);

    return (
        <>
            <View
                style={{
                    paddingHorizontal: 15,
                    height: 70,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    paddingTop: Constants.statusBarHeight,
                    elevation: 5
                }}
            >
                <Text
                    style={{
                        fontSize: 21,
                        textTransform: 'uppercase',
                        fontFamily: 'Montserrat-semiBold',
                        letterSpacing: 0.4,
                    }}
                >
                    {title}
                </Text>
            </View>
        </>
    )
}

const Tabs = ({ navigation }) => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 15,
                    left: 20,
                    right: 20,
                    borderRadius: 15,
                    backgroundColor: "#fff",
                    height: 60,
                    ...styles.shadow,
                },
            }}
        >
            <Tab.Screen
                name='Inicio'
                component={Home}
                options={{
                    headerTitle: "Inicio",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.tabs.home}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.btn_tab_primary : COLORS.btn_disabled
                                }}
                            />
                            <Text
                                style={{
                                    color: focused ? COLORS.btn_tab_primary : COLORS.btn_disabled, fontSize: 12
                                }}>
                                Home
                            </Text>
                        </View>
                    )
                }} />
            <Tab.Screen
                name='Grupos'
                component={GroupsScreen}
                options={{
                    headerTitle: 'Grupos',
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Image
                                source={icons.tabs.activity}
                                resizeMode="contain"
                                style={{
                                    width: 28,
                                    height: 28,
                                    tintColor: focused ? COLORS.btn_tab_primary : COLORS.btn_disabled
                                }}
                            />
                            <Text
                                style={{
                                    color: focused ? COLORS.btn_tab_primary : COLORS.btn_disabled, fontSize: 12
                                }}>
                                Groups
                            </Text>
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ paddingRight: 15 }}>
                            <Pressable onPress={() => navigation.push('NewGroup')} style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Image
                                    source={icons.header.plusIcon}
                                    style={{ tintColor: COLORS.bluePill, height: 21, width: 21 }}
                                />
                                <Text style={{ color: 'blue', fontSize: 14, marginLeft: 10 }}>Crear Grupo</Text>
                            </Pressable>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name='Mi Perfil'
                component={User}
                options={{
                    headerTitle: "Mi Perfil",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Image
                                source={icons.tabs.user}
                                resizeMode="contain"
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: focused ? COLORS.btn_tab_primary : COLORS.btn_disabled
                                }}
                            />
                            <Text
                                style={{
                                    color: focused ? COLORS.btn_tab_primary : COLORS.btn_disabled, fontSize: 12
                                }}>
                                Mi Perfil
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

export default Tabs;