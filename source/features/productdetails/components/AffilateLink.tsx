import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RegularTextB, SmallText, SmallTextB} from '../../../components/Text';

const AffilateLink = ({id}) => {
  return (
    <View style={{marginTop: 20, marginBottom: 10}}>
      <RegularTextB>Affilate Link</RegularTextB>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          borderRadius: 5,
          borderWidth: 0.7,
          borderColor: 'white',
          paddingVertical: 10,
          marginTop: 10,
          paddingHorizontal: 10,
        }}>
        <SmallText>www.kicksciti.com/product/bendev/{id}</SmallText>
      </TouchableOpacity>
    </View>
  );
};

export default AffilateLink;

const styles = StyleSheet.create({});
