import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {Colors} from '../constants';

export const NoInternetLottie = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        source={require('../assets/lottie/Lurking_Cat.json')}
        style={{width: 150, height: 150}}
        autoPlay={true}
        loop
      />
      <Text
        style={{
          color: Colors.textGrey,
          fontFamily: 'Gilroy-SemiBold',
        }}>
        No Internet Connection. Tap To Retry
      </Text>
    </View>
  );
};
