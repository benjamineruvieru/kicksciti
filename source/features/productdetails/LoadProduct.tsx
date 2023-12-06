import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Mainbackground from '../../components/Mainbackground';
import {addReferredby, getProduct} from '../../api/products';
import Colors from '../../constants/Colors';
import {deleteItem} from '../../utilis/storage';

const LoadProduct = ({route, navigation}) => {
  const {product_id, username} = route.params ?? {};
  console.log('rout', product_id, username);
  useEffect(() => {
    getProduct({product_id}).then(res => {
      console.log('res', res.data.product);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'AniStackNav',
            params: {screen: 'ProductScreen', params: res?.data?.product},
          },
        ],
      });
    });

    if (username) {
      addReferredby({product_id, username})
        .then(res => {
          console.log('add refer res', res.data);
        })
        .catch(err => {
          console.log('error refer', err?.response?.data);
        })
        .finally(() => {
          deleteItem('affilateRefer');
        });
    }
  }, []);
  return (
    <Mainbackground style={{justifyContent: 'center'}}>
      <ActivityIndicator color={Colors.primary} />
    </Mainbackground>
  );
};

export default LoadProduct;

const styles = StyleSheet.create({});
