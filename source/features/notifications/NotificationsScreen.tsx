import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Mainbackground from '../../components/Mainbackground';
import PageHeader from '../../components/PageHeader';
import {getPercentWidth} from '../../utilis/Functions';
import {RegularTextB, SmallText, SmallTextB} from '../../components/Text';
import LayoutAnimationComponent from '../../components/LayoutAnimationComponent';

const EmptyNoti = () => {
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
          resizeMode="contain"
          style={{
            width: getPercentWidth(70),
            height: getPercentWidth(70),
            top: -5,
          }}
          source={require('../../assets/images/illustrations/emptynoti.png')}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={400}>
        <RegularTextB style={{marginBottom: 5}}>
          No notifications at the moment.
        </RegularTextB>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={500}>
        <SmallText style={{textAlign: 'center'}}>
          Stay tuned for updates, amazing deals and exciting news!
        </SmallText>
      </LayoutAnimationComponent>
    </View>
  );
};

const NotificationsScreen = () => {
  return (
    <Mainbackground padding={20}>
      <PageHeader title={'Notifications'} />
      <EmptyNoti />
    </Mainbackground>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({});
