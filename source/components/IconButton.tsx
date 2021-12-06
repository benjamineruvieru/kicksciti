import {Share, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Back from '../assets/svg/icons/back.svg';
import Cart from '../assets/svg/icons/cart.svg';
import Bell from '../assets/svg/icons/bell.svg';
import LoveOutline from '../assets/svg/icons/love-outline.svg';
import Love from '../assets/svg/icons/love.svg';
import Colors from '../constants/Colors';
import {useMMKVObject} from 'react-native-mmkv';
import {SmallText, SmallTextB} from './Text';
import ShareSvg from '../assets/svg/icons/share.svg';
import {getItem} from '../utilis/storage';

export const ShareButton = ({id}) => {
  const {username} = getItem('userdetails', true);
  const link = `https://www.kicksciti.com/product/${id}?id=${username}`;

  return (
    <TouchableOpacity
      onPress={async () => {
        await Share.share({
          message: link,
        });
      }}
      style={{marginRight: 15}}>
      <ShareSvg color={'white'} height={25} width={25} />
    </TouchableOpacity>
  );
};

export const BackButton = ({fallBack}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          fallBack && fallBack();
        }
      }}
      style={{}}>
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

export const FavButton = ({color = Colors.primary, item, size = 23}) => {
  const [favourites, setFavourites] = useMMKVObject('favourites');
  const index = favourites?.findIndex(fav => fav?._id === item._id) ?? -1;
  const isFav = index !== -1;
  console.log('favourites', favourites);

  function toggleFavorite() {
    // Check if the item exists in the favorites array
    console.log('index', index);
    if (isFav) {
      // If the item exists, remove it
      favourites?.splice(index, 1);
      console.log(`Removed ${item._id} from favorites`, favourites);
      setFavourites([...favourites]);
    } else {
      const fav = [...(favourites ?? []), item];

      console.log(`Added ${item._id} to favorites`);
      console.log('favourites', fav);
      setFavourites(fav);
    }
  }
  return (
    <TouchableOpacity onPress={toggleFavorite} style={{}}>
      {isFav ? (
        <Love height={size} width={size} color={color} />
      ) : (
        <LoveOutline height={size} width={size} color={color} />
      )}
    </TouchableOpacity>
  );
};

export const CartButton = () => {
  const navigation = useNavigation();
  const [cart] = useMMKVObject('cart');

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('CartScreen');
      }}
      style={{}}>
      <Cart height={26} width={26} />
      {cart && cart.length > 0 && (
        <View
          style={{
            backgroundColor: 'red',
            width: 17,
            height: 17,
            borderRadius: 360,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: -(17 / 2),
            top: -5,
          }}>
          <SmallTextB style={{fontSize: 11}}>{cart?.length}</SmallTextB>
        </View>
      )}
    </TouchableOpacity>
  );
};
