import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';

// Tabs Component
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';

import Home from '../screens/Home';
import GroupsScreen from '../screens/Groups';
import Settings from '../screens/Settings';
import MyHabits from '../screens/MyHabits';

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

const Tabs = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    borderRadius: 15,
                    backgroundColor: "#fff",
                    height: 70,
                    ...styles.shadow,
                },
                header: ({ navigation, route, options }) => <CustomHeader route={route} options={options} />
            }}
        >
            <Tab.Screen name='Home' component={Home} options={{
                headerShown: false,
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
                name='Groups'
                component={GroupsScreen}
                options={{
                    headerShown: true,
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
                    )
                }}
            />
            <Tab.Screen
                name='MyHabits'
                component={MyHabits}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.tabs.habits}
                                resizeMode="contain"
                                style={{
                                    width: 26,
                                    height: 26,
                                    tintColor: focused ? COLORS.btn_tab_primary : COLORS.btn_disabled
                                }}
                            />
                            <Text
                                style={{
                                    color: focused ? COLORS.btn_tab_primary : COLORS.btn_disabled, fontSize: 12
                                }}>
                                My Habits
                            </Text>
                        </View>
                    ),
                    title: "My Progress"
                }}
            />
            <Tab.Screen
                name='Settings'
                component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.tabs.settings}
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
                                Settings
                            </Text>
                        </View>
                    )
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