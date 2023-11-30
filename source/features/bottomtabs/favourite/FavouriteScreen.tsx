import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Mainbackground from '../../../components/Mainbackground';
import {MediumText} from '../../../components/Text';
import {CartButton, NotificationButton} from '../../../components/IconButton';
import Search from '../../../components/Search';
import Products from '../shop/components/Products';
import {useMMKVObject} from 'react-native-mmkv';

const FavouriteScreen = () => {
  const [favourites, setFavourites] = useMMKVObject('favourites');

  return (
    <Mainbackground padding={20} paddingBottom={0} insetsBottom={-1}>
      <View
        style={{
          marginBottom: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <MediumText>Favourites</MediumText>
        <View style={{flexDirection: 'row'}}>
          <CartButton />
          <NotificationButton />
        </View>
      </View>
      <Search />
      <View style={{height: 20}} />
      <Products results={favourites} />
    </Mainbackground>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({});
