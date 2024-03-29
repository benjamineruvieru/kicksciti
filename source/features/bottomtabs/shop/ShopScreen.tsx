import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import useDebounce from '../../../hooks/useDebounce';
import crashlytics from '@react-native-firebase/crashlytics';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/BottomNav';
import analytics from '@react-native-firebase/analytics';

interface ShopScreenProps {
  route: RouteProp<RootStackParamList, 'Shop'>;
}

const ShopScreen: React.FC<ShopScreenProps> = ({route}) => {
  const [category, setCategory] = useState('hottest products');
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const {searchPassed} = route?.params ?? {};
  const {name: rawName, email, username} = getItem('userdetails', true);

  useEffect(() => {
    crashlytics().log('App mounted.');
    if (email) {
      crashlytics().setAttributes({
        email,
        name: rawName,
        username,
      });
    }
  }, []);

  useEffect(() => {
    console.log('searchPassed', searchPassed);
    if (searchPassed) {
      setSearch(searchPassed);
      setQuery(searchPassed);
    }
  }, [searchPassed]);

  useDebounce(
    async () => {
      if (search) {
        console.log('sa', search);
        setQuery(search);
        await analytics().logSearch({search_term: search});
      } else {
        if (query) {
          setQuery('');
        }
      }
    },
    [search],
    600,
  );
  const name = rawName?.split(' ')[0] ?? 'User';
  const sequence = [
    {text: `Welcome, ${name} 👋`},
    {text: `Kaabo, ${name} 👋`},
    {text: `Nnooo, ${name} 👋`, deleteCount: 5},
    {text: `Sannu, ${name} 👋`},
  ];
  const {
    data,
    isLoading,
    refetch,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteApi({
    queryFunction: getProducts,
    queryKey: ['getProducts', category, query],
  });

  const results = data?.pages.flatMap((data: any) => data?.products) ?? [];
  return (
    <Mainbackground padding={20} paddingBottom={0} insetsBottom={-1}>
      <View style={styles.mainView}>
        <View style={{flex: 1}} testID="welcome_text">
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
      <Search {...{search, setSearch}} />
      {!query && <Catergoies setCategory={setCategory} category={category} />}
      {isError ? null : isLoading ? (
        <ProductsLoading />
      ) : (
        <Products
          results={results}
          refresh={refetch}
          {...{fetchNextPage, isFetchingNextPage, hasNextPage}}
        />
      )}
    </Mainbackground>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  typeAni: {
    color: 'white',
    fontFamily: 'Gilroy-Bold',
    fontSize: 25,
    includeFontPadding: false,
  },
});
