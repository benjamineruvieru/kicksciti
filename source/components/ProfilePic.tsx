import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

const no_img = require('../assets/images/no.png');
const ProfilePic = () => {
  return (
    <View>
      <FastImage
        source={no_img}
        style={{height: 80, width: 80, borderRadius: 360}}
      />
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({});
