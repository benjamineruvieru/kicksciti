import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RegularTextB, SmallText, SmallTextB} from '../../../components/Text';

const Description = ({description}) => {
  return (
    <View>
      <RegularTextB style={{}}>Description</RegularTextB>
      <SmallText style={{marginBottom: 20, marginTop: 5}}>
        {description}
      </SmallText>
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({});
