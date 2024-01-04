import React from 'react';
import BottomNav from './BottomNav';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ProductScreen from '../features/productdetails/ProductScreen';
import NotificationsScreen from '../features/notifications/NotificationsScreen';
import CartScreen from '../features/checkout/CartScreen';

const Stack = createSharedElementStackNavigator();

const AniStackNav = () => {
  const sharedElements = (route: {params: any}) => {
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
        sharedElements={sharedElements}
      />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default AniStackNav;
