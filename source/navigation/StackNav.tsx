import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from '../features/onboarding/OnboardingScreen';
import CollectEmailScreen from '../features/auth/CollectEmailScreen';
import CartScreen from '../features/checkout/CartScreen';
import NotificationsScreen from '../features/notifications/NotificationsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AniStackNav from './AniStack';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // screenListeners={({route}) => ({
        //   state: e => {
        //     {
        //       StatusBarController(route,);
        //     }
        //   },
        // })}
        initialRouteName={'AniStackNav'}
        screenOptions={{
          header: () => null,
        }}>
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen
          name="CollectEmailScreen"
          component={CollectEmailScreen}
        />
        <Stack.Screen name="AniStackNav" component={AniStackNav} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
