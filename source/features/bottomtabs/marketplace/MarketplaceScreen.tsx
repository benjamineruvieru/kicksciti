import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MediumText, RegularTextB, SmallText} from '../../../components/Text';
import Mainbackground from '../../../components/Mainbackground';
import MarketPlaceSvg from '../../../assets/svg/illustrations/marketplace.svg';
import {SCREEN_WIDTH} from '../../../constants/Variables';
import {getPercentWidth} from '../../../utilis/Functions';
import {CartButton, NotificationButton} from '../../../components/IconButton';
import LayoutAnimationComponent from '../../../components/LayoutAnimationComponent';

const MarketplaceScreen = () => {
  return (
    <Mainbackground padding={20}>
      <View
        style={{
          marginBottom: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <MediumText>Marketplace</MediumText>
        <View style={{flexDirection: 'row'}}>
          <CartButton />
          <NotificationButton />
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <LayoutAnimationComponent delay={300}>
          <Image
            resizeMode="contain"
            style={{
              width: getPercentWidth(80),
              height: getPercentWidth(80),
              maxWidth: 400,
              maxHeight: 400,
            }}
            source={require('../../../assets/images/illustrations/marketplace.png')}
          />
        </LayoutAnimationComponent>
        <LayoutAnimationComponent delay={400}>
          <RegularTextB style={{marginBottom: 5}}>
            Marketplace is coming soon
          </RegularTextB>
        </LayoutAnimationComponent>
        <LayoutAnimationComponent delay={500}>
          <SmallText style={{marginBottom: 50, textAlign: 'center'}}>
            Buy, sell, or swap your favorite sneakers and wears
          </SmallText>
        </LayoutAnimationComponent>
      </View>
    </Mainbackground>
  );
};

export default MarketplaceScreen;

const styles = StyleSheet.create({});
