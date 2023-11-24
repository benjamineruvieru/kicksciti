import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {MediumText, RegularTextB, SmallTextB} from '../../../components/Text';
import Colors from '../../../constants/Colors';

function range(start, end, step = 1) {
  if (
    typeof start !== 'number' ||
    typeof end !== 'number' ||
    typeof step !== 'number'
  ) {
    throw new Error('Arguments must be numbers');
  }

  const result = [];

  if (step > 0) {
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
  } else if (step < 0) {
    for (let i = start; i >= end; i += step) {
      result.push(i);
    }
  } else {
    throw new Error('Step must be a non-zero number');
  }

  return result;
}

const SizeSelector = ({min = 40, max = 46}) => {
  console.log(range(min, max));
  return (
    <View style={{marginBottom: 20}}>
      <RegularTextB>Size</RegularTextB>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 10}}
        horizontal>
        {range(min, max).map(data => {
          return (
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: Colors.highlight,
                marginRight: 10,
                padding: 11,
                borderRadius: 5,
              }}>
              <RegularTextB>{data}</RegularTextB>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SizeSelector;

const styles = StyleSheet.create({});
