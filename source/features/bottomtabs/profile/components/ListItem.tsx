import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RegularText, RegularTextB} from '../../../../components/Text';
import Colors from '../../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';

const ListItem = ({title, screen, Svg}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        if (screen) {
          navigation.navigate(screen);
        }
      }}
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
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {Svg && (
          <Svg
            // style={{backgroundColor: 'red'}}
            width={23}
            height={23}
            color="white"
          />
        )}
      </View>
      <RegularText>{title}</RegularText>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
