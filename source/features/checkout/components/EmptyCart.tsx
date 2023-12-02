import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LayoutAnimationComponent from '../../../components/LayoutAnimationComponent';
import {RegularTextB, SmallText} from '../../../components/Text';
import {SCREEN_WIDTH} from '../../../constants/Variables';

const EmptyCart = () => {
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
          source={require('../../../assets/images/illustrations/emptycart.png')}
          style={{
            width: SCREEN_WIDTH / 1.5,
            height: SCREEN_WIDTH / 1.5,
            top: -10,
          }}
          resizeMode="contain"
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={400}>
        <RegularTextB>
          Your cart is feeling a bit light at the moment
        </RegularTextB>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={500}>
        <SmallText style={{textAlign: 'center', marginTop: 8}}>
          Start exploring our collection and fill it with your favorite finds!
          {'\n'}Happy shopping!
        </SmallText>
      </LayoutAnimationComponent>
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({});
