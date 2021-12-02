import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RegularTextB, SmallText} from '../../../components/Text';
import Mainbackground from '../../../components/Mainbackground';

const MarketplaceScreen = () => {
  return (
    <Mainbackground style={{justifyContent: 'center', alignItems: 'center'}}>
      <RegularTextB style={{marginBottom: 5}}>
        Marketplace is coming soon
      </RegularTextB>
      <SmallText>Buy, sell, or swap your favorite sneakers and wears</SmallText>
    </Mainbackground>
  );
};

export default MarketplaceScreen;

const styles = StyleSheet.create({});
