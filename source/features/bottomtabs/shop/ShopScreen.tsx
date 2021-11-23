import {StyleSheet, View} from 'react-native';
import React from 'react';
import Mainbackground from '../../../components/Mainbackground';
import {MediumText, RegularText} from '../../../components/Text';
import {TypeAnimation} from 'react-native-type-animation';
import Search from '../../../components/Search';
import {CartButton, NotificationButton} from '../../../components/IconButton';
import Catergoies from './components/Catergoies';
import Products from './components/Products';
const sequence = [
  {text: 'Welcome, Ben Dev 👋'},
  {text: 'Kaabo, Ben Dev 👋'},
  {text: 'Nnooo, Ben Dev 👋', deleteCount: 5},
  {text: 'Sannu, Ben Dev 👋'},
];

const ShopScreen = () => {
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
      <Catergoies />
      <Products />
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
