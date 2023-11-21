import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../features/onboarding/OnboardingScreen';
import CollectEmailScreen from '../features/auth/CollectEmailScreen';
import BottomNav from './BottomNav';

const Stack = createNativeStackNavigator();

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
        initialRouteName={''}
        screenOptions={{
          header: () => null,
        }}>
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen
          name="CollectEmailScreen"
          component={CollectEmailScreen}
        />
        <Stack.Screen name="BottomNav" component={BottomNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
