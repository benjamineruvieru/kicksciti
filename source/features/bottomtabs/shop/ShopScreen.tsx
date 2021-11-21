import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Mainbackground from '../../../components/Mainbackground';
import {MediumText, RegularText} from '../../../components/Text';

const ShopScreen = () => {
  return (
    <Mainbackground padding={20}>
      <MediumText>Welcome, Ben Dev 👋</MediumText>
    </Mainbackground>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({});
