import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SmallTextB} from '../../../../components/Text';
import Colors from '../../../../constants/Colors';

const DATA = ['Hottest Products', 'Just In', 'Nike'];
const Catergoies = ({pos}) => {
  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{marginBottom: 15, marginTop: 15}}>
        {DATA.map((data, i) => {
          return (
            <TouchableOpacity
              key={data}
              style={{
                marginRight: 15,
                backgroundColor: i === pos ? Colors.highlight : 'transparent',
                paddingHorizontal: 20,
                paddingVertical: 13,
                borderRadius: 5,
              }}>
              <SmallTextB>{data}</SmallTextB>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Catergoies;

const styles = StyleSheet.create({});
