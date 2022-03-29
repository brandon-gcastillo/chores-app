import React from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';

// Tabs Component
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';

import { Home, TaskScreen} from '../screens/Home';
import { COLORS, icons } from '../constants'

const Tab = createBottomTabNavigator();

const Tabs = () => (
    <Tab.Navigator
        screenOptions={{
            headerShown: false
            }}
            sceneContainerStyle={{backgroundColor: 'none'}}>
        <Tab.Screen 
            name='Home' 
            component={Home}
            options={{
                tabBarIcon: ({focused}) => (
                    <Image
                        source={icons.tabs.home}
                        resizeMode='contain'
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: focused ? COLORS.btn_tab_primary : COLORS.btn_disabled
                        }}
                    />
                )
            }}/>
        <Tab.Screen
            name='Task Screen'
            component={TaskScreen}
            options={{
                tabBarIcon: ({focused}) => (
                    <Image
                        source={icons.tabs.tasks}
                        resizeMode='contain'
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: focused ? COLORS.btn_tab_primary : COLORS.btn_disabled
                        }}/>
                )
            }}/>
    </Tab.Navigator>
)

export default Tabs;