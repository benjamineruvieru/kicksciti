import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MediumText, RegularTextB, SmallText} from '../../../components/Text';
import Mainbackground from '../../../components/Mainbackground';
import MarketPlaceSvg from '../../../assets/svg/illustrations/marketplace.svg';
import {SCREEN_WIDTH} from '../../../constants/Variables';
import {getPercentWidth} from '../../../utilis/Functions';
import {CartButton, NotificationButton} from '../../../components/IconButton';

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
        <Image
          resizeMode="contain"
          style={{width: getPercentWidth(80), height: getPercentWidth(80)}}
          source={require('../../../assets/images/illustrations/marketplace.png')}
        />
        <RegularTextB style={{marginBottom: 5}}>
          Marketplace is coming soon
        </RegularTextB>
        <SmallText style={{marginBottom: 50, textAlign: 'center'}}>
          Buy, sell, or swap your favorite sneakers and wears
        </SmallText>
      </View>
    </Mainbackground>
  );
};

export default MarketplaceScreen;

const styles = StyleSheet.create({});
