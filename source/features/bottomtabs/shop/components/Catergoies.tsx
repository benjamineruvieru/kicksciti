import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SmallText, SmallTextB} from '../../../../components/Text';
import Colors from '../../../../constants/Colors';
import Button from '../../../../components/Button';

const DATA = ['Hottest Products', 'Just In', 'Nike'];
const Catergoies = () => {
  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{marginBottom: 15, marginTop: 15}}>
        {DATA.map(data => {
          return (
            <TouchableOpacity
              style={{
                marginRight: 15,
                backgroundColor: Colors.highlight,
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
