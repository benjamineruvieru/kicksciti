import React from 'react';
import BottomNav from './BottomNav';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ProductScreen from '../features/productdetails/ProductScreen';

const Stack = createSharedElementStackNavigator();

const AniStackNav = () => {
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
    <Stack.Navigator
      screenOptions={{
        header: () => null,
        cardStyle: {backgroundColor: 'transparent'},
        cardStyleInterpolator: ({current: {progress}}) => ({
          gestureEnabled: false,
          cardStyle: {opacity: progress},
        }),
      }}>
      <Stack.Screen name="BottomNav" component={BottomNav} />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        sharedElements={route => {
          const {pictures, _id} = route.params;
          return [
            pictures[0],
            {
              id: `cartbutton${_id}`,
              animation: 'fade',
              resize: 'clip',
            },
            `favbutton${_id}`,
            {
              id: `name${_id}`,
              animation: 'fade',
              resize: 'clip',
            },
            {
              id: `price${_id}`,
              animation: 'fade',
              resize: 'clip',
            },
          ];
        }}
      />
    </Stack.Navigator>
  );
};

export default AniStackNav;
