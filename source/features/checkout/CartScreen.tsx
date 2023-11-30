import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Mainbackground from '../../components/Mainbackground';
import PageHeader from '../../components/PageHeader';
import CartItemsList from './components/CartItemsList';
import Button from '../../components/Button';
import {MediumText, RegularTextB, SmallTextB} from '../../components/Text';
import Input from '../../components/Input';
import Colors from '../../constants/Colors';
import LayoutAnimationComponent from '../../components/LayoutAnimationComponent';
import {useMMKVObject} from 'react-native-mmkv';
import {formatNumberWithCommas} from '../../utilis/Functions';

const Amount = ({deliveryFee = 0}) => {
  const [cart] = useMMKVObject('cart');
  let totalPrice = 0;

  cart.forEach(item => {
    const {price, discount} = item.item;
    const discountedPrice = discount ? price - discount : price;
    const totalItemPrice = discountedPrice * item.quantity;
    totalPrice += totalItemPrice;
  });
  return (
    <View>
      {!!deliveryFee && deliveryFee > 0 && (
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 20,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <RegularTextB style={{color: Colors.tabBlur}}>
            Delivery Fee
          </RegularTextB>
          <RegularTextB style={{color: Colors.tabBlur}}>
            ₦ {formatNumberWithCommas(deliveryFee)}
          </RegularTextB>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 20,
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <RegularTextB style={{color: Colors.tabBlur}}>Sub-Total</RegularTextB>
        <RegularTextB style={{color: Colors.tabBlur}}>
          ₦ {formatNumberWithCommas(totalPrice)}
        </RegularTextB>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 20,
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <RegularTextB>Total</RegularTextB>
        <MediumText>
          ₦ {formatNumberWithCommas(totalPrice + deliveryFee)}
        </MediumText>
      </View>
    </View>
  );
};
const CartItems = () => {
  return (
    <View style={{flex: 1}}>
      <CartItemsList />
    </View>
  );
};

const Delivery = () => {
  return (
    <View style={{flex: 1}}>
      <LayoutAnimationComponent rightInOut delay={350}>
        <Input placeholderText="Address" />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent rightInOut delay={550}>
        <Input placeholderText="Contact Phone Number" />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent rightInOut delay={750}>
        <SmallTextB>Recents</SmallTextB>
      </LayoutAnimationComponent>
    </View>
  );
};
const CartScreen = () => {
  const [pos, setPos] = useState(0);
  const next = () => {
    if (pos === 0) {
      setPos(1);
    }
  };
  return (
    <Mainbackground avoid keyboard padding={20}>
      <PageHeader
        title={pos === 0 ? 'Cart' : pos === 1 ? 'Delivery Details' : ''}
      />
      {pos === 0 && <CartItems />}
      {pos === 1 && <Delivery />}
      <Amount />
      <Button title={pos === 0 ? 'Next' : 'Make Payment'} onPress={next} />
    </Mainbackground>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
