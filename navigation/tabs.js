import React from 'react';
import {
    View,
    Image,
    Text,
    StatusBar
} from 'react-native';

// Tabs Component
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';

import Home from '../screens/Home';
import HabitsScreen from '../screens/Habits';
import { COLORS, icons } from '../constants'

const Tab = createBottomTabNavigator();

const Tabs = () => (
    
    <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
        }}
    >
        <Tab.Screen
            name='Home'
            component={Home}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icons.tabs.home}
                        resizeMode='contain'
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: focused ? COLORS.btn_tab_primary : COLORS.btn_disabled
                        }}
                    />
                ),
                header: ({ navigation, route, options, back }) => {

                    const title = getHeaderTitle(options, route.name);

                    return (
                        <>
                            <StatusBar backgroundColor={COLORS.primary} />
                            <View
                                style={{
                                    alignItems: 'center',
                                    backgroundColor: COLORS.primary,
                                    padding: 15
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 21,
                                        fontWeight: 'bold'
                                    }}
                                >{title}</Text>
                            </View>
                        </>
                    )
                }
            }} />
        <Tab.Screen
            name='Task Screen'
            component={HabitsScreen}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icons.tabs.tasks}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: focused ? COLORS.btn_tab_primary : COLORS.btn_disabled
                        }} />
                )
            }} />
    </Tab.Navigator>
)

export default Tabs;