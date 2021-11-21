import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Mainbackground from '../../components/Mainbackground';
import {MediumText} from '../../components/Text';

const CollectEmailScreen = () => {
  return (
    <Mainbackground padding={20}>
      <MediumText>Please enter your email address</MediumText>
    </Mainbackground>
  );
};

export default CollectEmailScreen;

const styles = StyleSheet.create({});
