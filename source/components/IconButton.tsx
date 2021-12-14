import {Share, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Back from '../assets/svg/icons/back.svg';
import Cart from '../assets/svg/icons/cart.svg';
import Bell from '../assets/svg/icons/bell.svg';
import LoveOutline from '../assets/svg/icons/love-outline.svg';
import Love from '../assets/svg/icons/love.svg';
import Colors from '../constants/Colors';
import {useMMKVObject, useMMKVString} from 'react-native-mmkv';
import {SmallText, SmallTextB} from './Text';
import ShareSvg from '../assets/svg/icons/share.svg';
import {getItem} from '../utilis/storage';
import {updateFaveProduct} from '../api/products';
import {restrictViewer} from '../utilis/Functions';

export const ShareButton = ({id}) => {
  const isLoggedIn = !!getItem('token');

  const {username} = getItem('userdetails', true);
  const link = isLoggedIn
    ? `https://www.kicksciti.com/product/${id}?id=${username}`
    : `https://www.kicksciti.com/product/${id}`;

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
  const [unreadNotification, setunreadNotification] =
    useMMKVString('unreadNotification');
  console.log('unreadNotification', unreadNotification);
  return (
    <TouchableOpacity
      onPress={() => {
        restrictViewer({
          navigation,
          alt: () => {
            navigation.navigate('NotificationsScreen');
            setunreadNotification('false');
          },
        });
      }}
      style={{marginLeft: 18}}>
      <Bell height={26} width={26} />
      <View
        style={{
          backgroundColor:
            unreadNotification === 'true' ? 'red' : 'transparent',
          width: 10,
          height: 10,
          borderRadius: 360,
          position: 'absolute',
          right: 2,
          top: 0,
        }}
      />
    </TouchableOpacity>
  );
};

export const FavButton = ({color = Colors.primary, item, size = 23}) => {
  const navigation = useNavigation();
  const [favourites, setFavourites] = useMMKVObject('favourites');
  const index = favourites?.findIndex(fav => fav?._id === item._id) ?? -1;
  const isFav = index !== -1;

  function toggleFavorite() {
    // Check if the item exists in the favorites array
    console.log('index', index);
    if (isFav) {
      // If the item exists, remove it
      favourites?.splice(index, 1);
      console.log(`Removed ${item._id} from favorites`, favourites);
      setFavourites([...favourites]);
      updateFaveProduct({isIncrease: false, product_id: item._id}).then(d => {
        console.log('updated fav', d.data);
      });
    } else {
      restrictViewer({
        navigation,
        alt: () => {
          const fav = [...(favourites ?? []), item];

          console.log(`Added ${item._id} to favorites`);
          console.log('favourites', fav);
          setFavourites(fav);
          updateFaveProduct({isIncrease: true, product_id: item._id}).then(
            d => {
              console.log('updated fav', d.data);
            },
          );
        },
      });
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
        restrictViewer({
          navigation,
          alt: () => {
            navigation.navigate('CartScreen');
          },
        });
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
