import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Mainbackground from '../../components/Mainbackground';
import {
  BigText,
  MediumText,
  RegularText,
  SmallText,
} from '../../components/Text';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/Variables';
import Button from '../../components/Button';

const bg = require('../../assets/images/onboarding/bg.webp');
const OnboardingScreen = () => {
  return (
    <Mainbackground style={styles.mainBg}>
      <Image source={bg} resizeMode="cover" style={styles.bgImg} />
      <View style={styles.dimBg} />
      <BigText style={{marginBottom: 5}}>Welcome to Kicks Citi</BigText>

      <RegularText>
        Your one-stop shop for all things sneakers.{'\n'}Step into a world of
        style and comfort with our wide selection of exclusive footwears.
      </RegularText>
      <View style={{alignItems: 'center', paddingBottom: 30}}>
        <Button title={'Get Started'} bottom={15} top={20} />
        <SmallText>View as a guest</SmallText>
      </View>
    </Mainbackground>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  dimBg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  mainBg: {
    justifyContent: 'flex-end',
    padding: 20,
  },
});
