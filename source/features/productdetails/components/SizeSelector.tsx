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

const SizeSelector = ({sizes, size, setSize, editSize, isInCart}) => {
  return (
    <View style={{marginBottom: 30}}>
      <RegularTextB>Size</RegularTextB>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 10}}
        horizontal>
        {sizes?.map(data => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSize(data);
                if (isInCart) {
                  editSize(data);
                }
              }}
              key={data}
              style={{
                borderWidth: 2,
                borderColor: size === data ? Colors.primary : Colors.highlight,
                marginRight: 10,
                padding: 12,
                borderRadius: 8,
                backgroundColor: size === data ? Colors.primary : 'transparent',
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
