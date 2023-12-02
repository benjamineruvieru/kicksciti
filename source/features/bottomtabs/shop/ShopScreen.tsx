import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Mainbackground from '../../../components/Mainbackground';
import {TypeAnimation} from 'react-native-type-animation';
import Search from '../../../components/Search';
import {CartButton, NotificationButton} from '../../../components/IconButton';
import Catergoies from './components/Catergoies';
import Products from './components/Products';
import {useInfiniteApi} from '../../../hooks/useApi';
import {getProducts} from '../../../api/products';
import ProductsLoading from './components/ProductsLoading';
import {getItem} from '../../../utilis/storage';

const ShopScreen = () => {
  const [category, setCategory] = useState('hottest products');
  const {name} = getItem('userdetails', true);
  const sequence = [
    {text: `Welcome, ${name} 👋`},
    {text: `Kaabo, ${name} 👋`},
    {text: `Nnooo, ${name} 👋`, deleteCount: 5},
    {text: `Sannu, ${name} 👋`},
  ];
  const {data, isLoading, refetch} = useInfiniteApi({
    queryFunction: getProducts,
    queryKey: ['getProducts', category],
  });
  const results = data?.pages.flatMap(data => data?.products) ?? [];

  return (
    <Mainbackground padding={20} paddingBottom={0} insetsBottom={-1}>
      <View
        style={{
          marginBottom: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <TypeAnimation
            preRenderText={`Welcome, ${name} 👋`}
            sequence={sequence}
            style={styles.typeAni}
            loop
            direction="back"
            delayBetweenSequence={10000}
            cursor={false}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <CartButton />
          <NotificationButton />
        </View>
      </View>
      <Search />
      <Catergoies setCategory={setCategory} category={category} />
      {isLoading ? (
        <ProductsLoading />
      ) : (
        <Products results={results} refresh={refetch} />
      )}
    </Mainbackground>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  typeAni: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 27,
    color: 'white',
    includeFontPadding: false,
  },
});
