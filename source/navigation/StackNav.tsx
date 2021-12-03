import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import OnboardingScreen from '../features/onboarding/OnboardingScreen';
import CollectEmailScreen from '../features/auth/CollectEmailScreen';
import CartScreen from '../features/checkout/CartScreen';
import NotificationsScreen from '../features/notifications/NotificationsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AniStackNav from './AniStack';
import {getItem} from '../utilis/storage';
import OrderDetails from '../features/checkout/OrderDetails';
import OrderHistory from '../features/bottomtabs/profile/OrderHistory';
import {Linking} from 'react-native';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();
    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  function extractUsernameFromUrl(url) {
    const regex = /\/channel\/([^/]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }

  const handleDeepLink = prop => {
    const {url} = prop ?? {};
    if (url) {
      console.log('initialUrl', url);

      // if (username) {
      //   navigation.navigate('LoadChannel', {username});
      // }
    }
  };
  return (
    <Stack.Navigator
      // screenListeners={({route}) => ({
      //   state: e => {
      //     {
      //       StatusBarController(route,);
      //     }
      //   },
      // })}
      initialRouteName={getItem('token') ? 'AniStackNav' : 'OnboardingScreen'}
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="CollectEmailScreen" component={CollectEmailScreen} />
      <Stack.Screen name="AniStackNav" component={AniStackNav} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
