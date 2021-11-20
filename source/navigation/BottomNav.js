import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform} from 'react-native';

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        header: () => null,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.tabBlur,
        tabBarLabelStyle: {
          fontFamily: 'Quicksand-Medium',
          fontSize: 11,
        },
        tabBarStyle: {
          height: Platform.OS === 'android' ? 60 : 55 + insets.bottom,
          paddingBottom: Platform.OS === 'android' ? 5 : insets.bottom - 5,
          paddingTop: Platform.OS === 'ios' ? 5 : 0,
        },
      }}>
      {/* <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Home
              width={25}
              height={25}
              style={{
                color: color,
              }}
            />
          ),
        }}
        name="Heim"
        component={HomeScreen}
      /> */}
    </Tab.Navigator>
  );
}
