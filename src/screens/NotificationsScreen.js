import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, Image} from 'react-native';
import Colors from '../constants/Colors';
import img from '../assets/img/nonot.png';

const NotificationsScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={{backgroundColor: Colors.bag1Bg, flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            paddingBottom: 90,
          }}>
          <Image source={img} style={{width: 250, height: 250}} />
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              color: Colors.white,
              fontSize: 16,
              marginTop: 20,
            }}>
            No Notifications Yet!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bag1Bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotificationsScreen;
