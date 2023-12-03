import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Mainbackground from '../../../components/Mainbackground';
import {MediumText, RegularTextB, SmallText} from '../../../components/Text';
import {CartButton, NotificationButton} from '../../../components/IconButton';
import Search from '../../../components/Search';
import Products from '../shop/components/Products';
import {useMMKVObject} from 'react-native-mmkv';
import {getPercentWidth} from '../../../utilis/Functions';
import LayoutAnimationComponent from '../../../components/LayoutAnimationComponent';

const EmptyFave = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
      }}>
      <LayoutAnimationComponent delay={300}>
        <Image
          resizeMode="contain"
          style={{
            width: getPercentWidth(70),
            height: getPercentWidth(70),
            top: -5,
          }}
          source={require('../../../assets/images/illustrations/emptyfave.png')}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={400}>
        <RegularTextB style={{marginBottom: 5}}>
          Your favorites list is looking a bit lonely!
        </RegularTextB>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={500}>
        <SmallText>
          {' '}
          Explore our collection and save your top picks here.{' '}
        </SmallText>
      </LayoutAnimationComponent>
    </View>
  );
};

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
      {!favourites || favourites?.length === 0 ? (
        <EmptyFave />
      ) : (
        <Products results={favourites} />
      )}
    </Mainbackground>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({});
