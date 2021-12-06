import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import OnboardingScreen from '../features/onboarding/OnboardingScreen';
import CollectEmailScreen from '../features/auth/CollectEmailScreen';
import CartScreen from '../features/checkout/CartScreen';
import NotificationsScreen from '../features/notifications/NotificationsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AniStackNav from './AniStack';
import {getItem, setItem} from '../utilis/storage';
import OrderDetails from '../features/checkout/OrderDetails';
import OrderHistory from '../features/bottomtabs/profile/OrderHistory';
import {Linking} from 'react-native';
import LoadProduct from '../features/productdetails/LoadProduct';
import AffilateEarnings from '../features/bottomtabs/profile/AffilateEarnings';

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

  function parseLink(link) {
    const pattern = /\/product\/(\d+)(?:\?id=([a-zA-Z0-9]+))?$/;
    const match = link.match(pattern);
    if (match) {
      const [, productId, username] = match;

      // Create an object with the extracted information
      const result = {product_id: productId};

      if (username) {
        result.username = username;
      }

      return result;
    }

    return null;
  }

  const handleDeepLink = prop => {
    const {url} = prop ?? {};
    if (url) {
      console.log('initialUrl', url);
      const result = parseLink(url);
      console.log('result1', result);
      if (getItem('token') && result?.product_id) {
        navigation.navigate('LoadProduct', result);
      } else {
        setItem('affilateRefer', result, true);
      }
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
      <Stack.Screen name="LoadProduct" component={LoadProduct} />
      <Stack.Screen name="AffilateEarnings" component={AffilateEarnings} />
    </Stack.Navigator>
  );
};

export default StackNav;
