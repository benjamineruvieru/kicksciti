import {Image, Linking, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import Mainbackground from '../../components/Mainbackground';
import LayoutAnimationComponent from '../../components/LayoutAnimationComponent';
import {getPercentWidth} from '../../utilis/Functions';
import {RegularTextB, SmallText} from '../../components/Text';
import Button from '../../components/Button';

const UpdateScreen = () => {
  return (
    <Mainbackground
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{flex: 1}} />
      <LayoutAnimationComponent delay={300}>
        <Image
          resizeMode="contain"
          style={{
            width: getPercentWidth(80),
            height: getPercentWidth(50),
            marginBottom: 10,
          }}
          source={require('../../assets/images/illustrations/update.png')}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={400}>
        <RegularTextB style={{marginBottom: 5}}>
          An Update Is Available
        </RegularTextB>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={500}>
        <SmallText style={{textAlign: 'center'}}>
          Discover new features and improvements by updating your app{'\n'}
          today.
        </SmallText>
      </LayoutAnimationComponent>
      <View style={{flex: 1}} />
      <LayoutAnimationComponent delay={600}>
        <Button
          title="Update Now"
          bottom={20}
          onPress={() => {
            if (Platform.OS === 'android') {
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.kicksciti.android',
              );
            } else {
            }
          }}
        />
      </LayoutAnimationComponent>
    </Mainbackground>
  );
};

export default UpdateScreen;

const styles = StyleSheet.create({});
