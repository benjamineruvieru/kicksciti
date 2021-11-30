import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RegularText, RegularTextB} from '../../../../components/Text';
import Colors from '../../../../constants/Colors';

const ListItem = ({title}) => {
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: Colors.highlight,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: 45,
          width: 45,
          backgroundColor: Colors.highlight,
          borderRadius: 360,
          marginRight: 15,
        }}></View>
      <RegularText>{title}</RegularText>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
