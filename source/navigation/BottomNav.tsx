import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
import ShopScreen from '../features/bottomtabs/shop/ShopScreen';
import ProfileScreen from '../features/bottomtabs/profile/ProfileScreen';
import FavouriteScreen from '../features/bottomtabs/favourite/FavouriteScreen';
import MarketplaceScreen from '../features/bottomtabs/marketplace/MarketplaceScreen';

import ShopSvg from '../assets/svg/bottomtab/shop.svg';
import ProfileSvg from '../assets/svg/bottomtab/profile.svg';
import MarketSvg from '../assets/svg/bottomtab/market.svg';
import LoveSvg from '../assets/svg/bottomtab/love.svg';

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
        component={ShopScreen}
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
        component={FavouriteScreen}
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
