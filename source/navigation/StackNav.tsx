import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from '../features/onboarding/OnboardingScreen';
import CollectEmailScreen from '../features/auth/CollectEmailScreen';
import BottomNav from './BottomNav';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ProductScreen from '../features/productdetails/ProductScreen';
import CartScreen from '../features/checkout/CartScreen';
import NotificationsScreen from '../features/notifications/NotificationsScreen';

const Stack = createSharedElementStackNavigator();

const StackNav = () => {
  // const navigation = useNavigation();
  // useEffect(() => {
  //   const getUrlAsync = async () => {
  //     const initialUrl = await Linking.getInitialURL();
  //     handleDeepLink(initialUrl);
  //   };

  //   getUrlAsync();
  //   Linking.addEventListener('url', handleDeepLink);

  //   return () => {
  //     Linking.removeAllListeners('url');
  //   };
  // }, []);

  // function extractUsernameFromUrl(url) {
  //   const regex = /\/channel\/([^/]+)/;
  //   const match = url.match(regex);
  //   if (match && match[1]) {
  //     return match[1];
  //   }
  //   return null;
  // }

  const handleDeepLink = prop => {
    const {url} = prop ?? {};
    if (url) {
      const username = extractUsernameFromUrl(url);
      console.log('initialUrl', username);

      if (username) {
        navigation.navigate('LoadChannel', {username});
      }
    }
  };

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
        initialRouteName={'BottomNav'}
        screenOptions={{
          header: () => null,
          cardStyle: {backgroundColor: 'transparent'},
          cardStyleInterpolator: ({current: {progress}}) => ({
            gestureEnabled: false,
            cardStyle: {opacity: progress},
          }),
        }}>
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen
          name="CollectEmailScreen"
          component={CollectEmailScreen}
        />
        <Stack.Screen name="BottomNav" component={BottomNav} />
        <Stack.Screen
          name="ProductScreen"
          component={ProductScreen}
          sharedElements={route => {
            const {link1} = route.params;
            return [link1];
          }}
        />
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
