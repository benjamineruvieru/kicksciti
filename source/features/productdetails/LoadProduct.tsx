import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Mainbackground from '../../components/Mainbackground';
import {addReferredby, getProduct} from '../../api/products';
import Colors from '../../constants/Colors';
import {deleteItem} from '../../utilis/storage';
import {RegularTextB, SmallText} from '../../components/Text';
import Button from '../../components/Button';
import LayoutAnimationComponent from '../../components/LayoutAnimationComponent';
import {getPercentWidth} from '../../utilis/Functions';

const LoadProduct = ({route, navigation}) => {
  const [error, setError] = useState(false);
  const {product_id, username} = route.params ?? {};
  console.log('rout', product_id, username);
  useEffect(() => {
    getProduct({product_id})
      .then(res => {
        console.log('res', res.data.product);
        if (res.data.product) {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'AniStackNav',
                params: {screen: 'ProductScreen', params: res?.data?.product},
              },
            ],
          });
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
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
      {error ? (
        <View style={{flex: 1, paddingVertical: 20, alignItems: 'center'}}>
          <View style={{flex: 1}} />
          <LayoutAnimationComponent delay={300}>
            <Image
              resizeMode="contain"
              style={{
                width: getPercentWidth(80),
                height: getPercentWidth(75),
              }}
              source={require('../../assets/images/illustrations/notfound.png')}
            />
          </LayoutAnimationComponent>
          <LayoutAnimationComponent delay={400}>
            <RegularTextB style={{marginBottom: 5}}>
              Product Not Found!
            </RegularTextB>
          </LayoutAnimationComponent>
          <LayoutAnimationComponent delay={500}>
            <SmallText style={{textAlign: 'center'}}>
              Oops! It looks like the product you're trying to find is not
              available. Please double-check the link or browse our collections
              to discover other products.
            </SmallText>
          </LayoutAnimationComponent>

          <View style={{flex: 1}} />
          <LayoutAnimationComponent delay={600}>
            <Button
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'AniStackNav',
                      params: {screen: 'BottomNav'},
                    },
                  ],
                });
              }}
              top={15}
              title="Go Home"
            />
          </LayoutAnimationComponent>
        </View>
      ) : (
        <ActivityIndicator color={Colors.primary} />
      )}
    </Mainbackground>
  );
};

export default LoadProduct;

const styles = StyleSheet.create({});
