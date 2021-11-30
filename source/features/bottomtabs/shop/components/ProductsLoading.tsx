import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Shimmer from '../../../../components/Shimmer';
import {PRODUCTIMGWIDTH} from './Products';
import {getPercentWidth} from '../../../../utilis/Functions';

const Product = () => {
  return (
    <View style={{marginBottom: 15, width: PRODUCTIMGWIDTH}}>
      <Shimmer
        style={{
          width: PRODUCTIMGWIDTH,
          height: PRODUCTIMGWIDTH,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />
      <Shimmer
        style={{
          width: PRODUCTIMGWIDTH / 1.7,
          borderRadius: 5,
          marginBottom: 7,
        }}
      />
      <Shimmer
        style={{
          width: PRODUCTIMGWIDTH / 2.5,
          borderRadius: 5,
          marginBottom: 10,
        }}
      />
      {/* <Shimmer
        style={{
          width: PRODUCTIMGWIDTH / 4,
          borderRadius: 5,
          marginBottom: 12,
        }}
      /> */}
    </View>
  );
};

const ProductsLoading = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Product />
        <Product />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Product />
        <Product />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Product />
        <Product />
      </View>
    </ScrollView>
  );
};

export default ProductsLoading;

const styles = StyleSheet.create({});
