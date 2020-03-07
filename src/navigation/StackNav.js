import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import TabNavigation from './TabNav';
import {getData, StatusBarController} from '../constants';
import * as Screens from '../screens';
import {Platform} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {
  put_cartlist,
  put_delivery,
  put_subprice,
  put_name,
  put_phonenumber,
  put_login,
  put_gender,
  add_favorties,
} from '../redux/actions/headeraction';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {navToID} from '../constants/Functions';
const Stack = createStackNavigator();

export default function Navigation() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleDynamicLink = link => {
    navToID(link.url.split('id')[1].replace('=', ''), navigation);
  };
  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        handleDynamicLink(link);
      })
      .catch(e => {});
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const GetInitialdata = async () => {
      const [favList, cartList] = await Promise.all([
        getData('favorites'),
        getData('cart'),
      ]);
      if (cartList != null) {
        dispatch(put_cartlist(cartList));
      }
      if (favList != null) {
        dispatch(add_favorties(favList));
      }
      const [name, phone, gender, userdetails] = await Promise.all([
        getData('name', false),
        getData('phoneNumber', false),
        getData('gender', false),
        getData('userdetails', false),
      ]);
      dispatch(put_name(name));
      dispatch(put_phonenumber(phone));
      dispatch(put_gender(gender));
      if (userdetails === 'stored') {
        dispatch(put_login(false));
      } else {
        dispatch(put_login(true));
      }
      const [delivery, subprice] = await Promise.all([
        getData('delivery', false),
        getData('subprice', false),
      ]);

      if (delivery != null) {
        dispatch(put_delivery(parseInt(delivery)));
      }

      if (subprice != null) {
        dispatch(put_subprice(parseInt(subprice)));
      }
    };
    GetInitialdata();
  }, []);
  return (
    <Stack.Navigator
      screenListeners={({route}) => ({
        state: e => {
          {
            StatusBarController(route);
          }
        },
      })}
      initialRouteName="Tab"
      detachInactiveScreens={false}
      screenOptions={{header: () => null, gestureEnabled: true}}>
      <Stack.Group
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="Notifications"
          component={Screens.NotificationsScreen}
        />
        <Stack.Screen name="Search" component={Screens.SearchScreen} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          gestureDirection: Platform.OS === 'ios' ? 'horizontal' : 'vertical',
          cardStyleInterpolator:
            Platform.OS === 'ios'
              ? CardStyleInterpolators.forHorizontalIOS
              : CardStyleInterpolators.forBottomSheetAndroid,
        }}>
        <Stack.Screen name="Tab" component={TabNavigation} />
        <Stack.Screen name="Signin" component={Screens.SigninScreen} />
        <Stack.Screen name="Details" component={Screens.Details} />
        <Stack.Screen name="Cart" component={Screens.CartScreen} />
        <Stack.Screen name="Contact" component={Screens.ContactScreen} />
        <Stack.Screen
          name="OrderHistory"
          component={Screens.OrderHistoryScreen}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}>
        <Stack.Screen name="Checkout" component={Screens.CheckoutScreen} />
        <Stack.Screen name="EditProfile" component={Screens.EditProfile} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
