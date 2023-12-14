import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PermissionsAndroid, Platform} from 'react-native';
import ShopScreen from '../features/bottomtabs/shop/ShopScreen';
import ProfileScreen from '../features/bottomtabs/profile/ProfileScreen';
import FavouriteScreen from '../features/bottomtabs/favourite/FavouriteScreen';
import MarketplaceScreen from '../features/bottomtabs/marketplace/MarketplaceScreen';
import ShopSvg from '../assets/svg/bottomtab/shop.svg';
import ProfileSvg from '../assets/svg/bottomtab/profile.svg';
import MarketSvg from '../assets/svg/bottomtab/market.svg';
import LoveSvg from '../assets/svg/bottomtab/love.svg';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import messaging from '@react-native-firebase/messaging';
import {getItem, setItem} from '../utilis/storage';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator({name: 'BottomNav'});
const Stack2 = createSharedElementStackNavigator({name: 'BottomNav2'});

const StackShopScreen = () => (
  <Stack2.Navigator
    screenOptions={{
      header: () => null,
      cardStyle: {backgroundColor: 'transparent'},
      cardStyleInterpolator: ({current: {progress}}) => ({
        gestureEnabled: false,
        cardStyle: {opacity: progress},
      }),
    }}>
    <Stack2.Screen name="StackShopScreen" component={ShopScreen} />
  </Stack2.Navigator>
);

const StackFavouriteScreen = () => (
  <Stack.Navigator
    screenOptions={{
      header: () => null,
      cardStyle: {backgroundColor: 'transparent'},
      cardStyleInterpolator: ({current: {progress}}) => ({
        gestureEnabled: false,
        cardStyle: {opacity: progress},
      }),
    }}>
    <Stack.Screen name="StackFavouriteScreen" component={FavouriteScreen} />
  </Stack.Navigator>
);

export default function BottomNav() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  async function requestUserPermission() {
    await messaging().requestPermission();
  }

  async function requestPermissionAndroid() {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, // or POST_NOTIFICATIONS
      );
    } catch (err) {
      console.log(err);
    }
  }
  const getToken = () => {
    messaging().subscribeToTopic('newproduct');
    messaging()
      .getToken()
      .then(token => {
        console.log('token', token);
      });
  };

  useEffect(() => {
    const init = async () => {
      if (Platform.OS === 'android') {
        await requestPermissionAndroid();
      } else {
        await requestUserPermission();
      }
      getToken();
    };
    init();
  }, []);

  useEffect(() => {
    return messaging().onTokenRefresh(token => {
      console.log('token changed', token);
    });
  }, []);

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      const {action, product, order_id} = remoteMessage.data ?? {};
      switch (action) {
        case 'open-product': {
          console.log(product);
          if (product) {
            navigation.navigate('ProductScreen', JSON.parse(product));
          } else {
            navigation.navigate('NotificationsScreen');
          }
          break;
        }
        case 'open-order': {
          console.log(order_id);
          if (order_id) {
            navigation.navigate('OrderDetails', {order_id});
          } else {
            navigation.navigate('NotificationsScreen');
          }
          break;
        }
      }
      console.log('remoteMessage', remoteMessage.data);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      setItem('unreadNotification', 'true');
    });

    return unsubscribe;
  }, []);

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        header: () => null,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.tabBlur,
        tabBarLabelStyle: {
          fontFamily: 'Gilroy-Medium',
          fontSize: 12,
        },
        tabBarStyle: {
          height: Platform.OS === 'android' ? 60 : 55 + insets.bottom,
          paddingBottom: Platform.OS === 'android' ? 5 : insets.bottom - 5,
          paddingTop: Platform.OS === 'ios' ? 5 : 0,
          backgroundColor: Colors.tabColor,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <ShopSvg
              width={23}
              height={23}
              style={{
                color: color,
              }}
            />
          ),
        }}
        name="Shop"
        component={StackShopScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <MarketSvg
              width={21}
              height={21}
              style={{
                color: color,
              }}
            />
          ),
        }}
        name="Market Place"
        component={MarketplaceScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <LoveSvg
              width={22}
              height={22}
              style={{
                color: color,
              }}
            />
          ),
        }}
        name="Favourites"
        component={StackFavouriteScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <ProfileSvg
              width={23}
              height={23}
              style={{
                color: color,
              }}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
