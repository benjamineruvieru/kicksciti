import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MediumText, RegularText} from './Text';
import {BackButton} from './IconButton';

const PageHeader = ({title, onPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingVertical: 15,
        marginBottom: 30,
        alignItems: 'center',
      }}>
      <BackButton onPress={onPress} />
      <MediumText>{title}</MediumText>
      <View style={{width: 20}} />
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({});
