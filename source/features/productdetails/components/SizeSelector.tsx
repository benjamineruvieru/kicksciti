import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RegularTextB} from '../../../components/Text';
import Colors from '../../../constants/Colors';

const SizeSelector = ({sizes, size, setSize, editSize, isInCart}) => {
  return (
    <View style={{marginBottom: 30}}>
      <RegularTextB>Size</RegularTextB>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 10}}
        horizontal>
        {sizes?.map(data => {
          const styles = StyleSheet.create({
            touch: {
              backgroundColor: size === data ? Colors.primary : 'transparent',
              borderColor: size === data ? Colors.primary : Colors.highlight,
              borderRadius: 8,
              borderWidth: 2,
              marginRight: 10,
              padding: 12,
            },
          });

          return (
            <TouchableOpacity
              onPress={() => {
                setSize(data);
                if (isInCart) {
                  editSize(data);
                }
              }}
              key={data}
              style={styles.touch}>
              <RegularTextB>{data}</RegularTextB>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SizeSelector;
