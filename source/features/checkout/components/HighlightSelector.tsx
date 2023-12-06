import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RegularTextB, SmallText} from '../../../components/Text';
import Colors from '../../../constants/Colors';

const RadioButton = ({selected}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: selected ? Colors.primary : Colors.highlight,
        width: 20,
        height: 20,
        borderRadius: 360,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {selected && (
        <View
          style={{
            backgroundColor: Colors.primary,
            width: 10,
            height: 10,
            borderRadius: 360,
          }}
        />
      )}
    </View>
  );
};

const HighlightSelector = ({title, sub, selected, setSelected}) => {
  return (
    <TouchableOpacity
      onPress={setSelected}
      style={{
        marginBottom: 20,
        borderWidth: 1,
        borderColor: selected ? Colors.primary : Colors.highlight,
        flexDirection: 'row',
        padding: 15,
        borderRadius: 10,
      }}>
      <RadioButton selected={selected} />
      <View style={{marginLeft: 10, flex: 1}}>
        <RegularTextB>{title}</RegularTextB>
        <SmallText style={{marginTop: 4}}>{sub}</SmallText>
      </View>
    </TouchableOpacity>
  );
};

export default HighlightSelector;

const styles = StyleSheet.create({});
