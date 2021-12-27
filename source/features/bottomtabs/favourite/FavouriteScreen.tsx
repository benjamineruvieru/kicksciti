import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Mainbackground from '../../../components/Mainbackground';
import {MediumText, RegularTextB, SmallText} from '../../../components/Text';
import {CartButton, NotificationButton} from '../../../components/IconButton';
import Search from '../../../components/Search';
import Products from '../shop/components/Products';
import {useMMKVObject} from 'react-native-mmkv';
import {getPercentWidth} from '../../../utilis/Functions';
import LayoutAnimationComponent from '../../../components/LayoutAnimationComponent';

function searchFave(products, searchString) {
  const searchWords = searchString.toLowerCase().split(' ');

  let results = [];
  let maxScore = 0;

  for (const product of products) {
    // Calculate a relevance score based on name, keywords, and category
    let score = 0;

    // Check for partial matches in the name
    if (searchWords.some(word => product.name.toLowerCase().includes(word))) {
      score += 3;
    }

    // Check for partial matches in keywords
    for (const keyword of product.keywords) {
      if (searchWords.some(word => keyword.toLowerCase().includes(word))) {
        score += 1;
      }
    }

    // Check for partial matches in the category
    if (
      searchWords.some(word => product.category.toLowerCase().includes(word))
    ) {
      score += 2;
    }

    // Update results if a better match is found
    if (score > 0) {
      if (score > maxScore) {
        results = [product];
        maxScore = score;
      } else if (score === maxScore) {
        results.push(product);
      }
    }
  }

  return results;
}

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
            maxWidth: 400,
            maxHeight: 400,
          }}
          source={require('../../../assets/images/illustrations/emptyfave.png')}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={400}>
        <RegularTextB style={{marginBottom: 5}}>
          Your favorites is looking a bit lonely!
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
  const [search, setSearch] = useState();
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
      <Search {...{search, setSearch}} />
      {!favourites || favourites?.length === 0 ? (
        <EmptyFave />
      ) : (
        <Products
          results={
            search ? searchFave(favourites, search) : favourites.reverse()
          }
        />
      )}
    </Mainbackground>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({});
