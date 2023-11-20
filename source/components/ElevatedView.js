import {StyleSheet, View} from 'react-native';
import React from 'react';

const ElevatedView = ({
  children,
  r = 15,
  padding = 15,
  margin = 20,
  style,
  bottom = 0,
}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: r,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {height: 2, width: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        padding: padding,
        margin: margin,
        marginBottom: bottom,
        ...style,
      }}>
      {children}
    </View>
  );
};

export default ElevatedView;

const styles = StyleSheet.create({});
