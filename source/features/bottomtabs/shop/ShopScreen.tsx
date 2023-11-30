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
const sequence = [
  {text: 'Welcome, Ben Dev 👋'},
  {text: 'Kaabo, Ben Dev 👋'},
  {text: 'Nnooo, Ben Dev 👋', deleteCount: 5},
  {text: 'Sannu, Ben Dev 👋'},
];

const ShopScreen = () => {
  const [category, setCategory] = useState('hottest products');

  // const {data} = useInfiniteApi({
  //   queryFunction: getProducts,
  //   queryKey: ['getProducts', category],
  // });
  // const results = data?.pages.flatMap(data => data?.products) ?? [];
  return (
    <Mainbackground padding={20} paddingBottom={0} insetsBottom={-1}>
      <View
        style={{
          marginBottom: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TypeAnimation
          preRenderText="Welcome, Ben Dev 👋"
          sequence={sequence}
          style={styles.typeAni}
          loop
          direction="back"
          delayBetweenSequence={10000}
          cursor={false}
        />
        <View style={{flexDirection: 'row'}}>
          <CartButton />
          <NotificationButton />
        </View>
      </View>
      <Search />
      <Catergoies setCategory={setCategory} category={category} />
      {/* <ProductsLoading /> */}
      <Products
      //  results={results}
      />
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
