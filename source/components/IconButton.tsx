import {TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Back from '../assets/svg/icons/back.svg';
import Cart from '../assets/svg/icons/cart.svg';
import Bell from '../assets/svg/icons/bell.svg';
import LoveOutline from '../assets/svg/icons/love-outline.svg';
import Love from '../assets/svg/icons/love.svg';
import Colors from '../constants/Colors';

export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
      <Back color={'white'} height={20} width={20} />
    </TouchableOpacity>
  );
};

export const NotificationButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('NotificationsScreen');
      }}
      style={{marginLeft: 18}}>
      <Bell height={26} width={26} />
    </TouchableOpacity>
  );
};

export const FavButton = ({color = Colors.primary}) => {
  return (
    <TouchableOpacity onPress={() => {}} style={{}}>
      <LoveOutline height={23} width={23} color={color} />
    </TouchableOpacity>
  );
};

export const CartButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('CartScreen');
      }}
      style={{}}>
      <Cart height={26} width={26} />
    </TouchableOpacity>
  );
};
