import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RegularTextB} from '../../../components/Text';

const Quantity = () => {
  return (
    <View>
      <RegularTextB>Quantity</RegularTextB>
      <View
        style={{
          marginTop: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity>
          <RegularTextB>-</RegularTextB>
        </TouchableOpacity>
        <TextInput
          value="1"
          style={{color: 'white', fontFamily: 'Gilroy-SemiBold', fontSize: 18}}
        />
        <TouchableOpacity>
          <RegularTextB>+</RegularTextB>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Quantity;

const styles = StyleSheet.create({});
