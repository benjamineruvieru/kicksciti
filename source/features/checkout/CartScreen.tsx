import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Mainbackground from '../../components/Mainbackground';
import PageHeader from '../../components/PageHeader';
import CartItemsList from './components/CartItemsList';
import Button from '../../components/Button';
import {
  MediumText,
  RegularTextB,
  SmallText,
  SmallTextB,
} from '../../components/Text';
import Input, {ModalSelector} from '../../components/Input';
import Colors from '../../constants/Colors';
import LayoutAnimationComponent from '../../components/LayoutAnimationComponent';
import {useMMKVObject} from 'react-native-mmkv';
import {
  formatNumberWithCommas,
  getCity,
  getState,
} from '../../utilis/Functions';
import {SCREEN_WIDTH} from '../../constants/Variables';
import EmptyCart from './components/EmptyCart';
import {useApi} from '../../hooks/useApi';
import {getCart} from '../../api/products';

const Amount = ({deliveryFee = 0, cart}) => {
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
      <LayoutAnimationComponent>
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
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={200}>
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
      </LayoutAnimationComponent>
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

const Delivery = ({
  state,
  setState,
  lga,
  setLga,
  address,
  setAddress,
  phone,
  setPhone,
}) => {
  return (
    <View style={{flex: 1}}>
      <LayoutAnimationComponent rightInOut delay={350}>
        <Input
          placeholderText="Delivery Address"
          text={address}
          setText={setAddress}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent rightInOut delay={550}>
        <Input
          placeholderText="Contact Phone Number"
          text={phone}
          setText={setPhone}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent rightInOut delay={750}>
        <ModalSelector
          placeholderText="State"
          search
          data={getState({country: 'Nigeria'})}
          text={state}
          setText={setState}
        />
      </LayoutAnimationComponent>
      {state && (
        <LayoutAnimationComponent rightInOut delay={50}>
          <ModalSelector
            placeholderText="Local government area"
            text={lga}
            setText={setLga}
            search
            data={getCity({state, country: 'Nigeria'})}
          />
        </LayoutAnimationComponent>
      )}
      <LayoutAnimationComponent rightInOut delay={950}>
        <SmallTextB>Recents</SmallTextB>
      </LayoutAnimationComponent>
    </View>
  );
};
const CartScreen = () => {
  const [cart, setCart] = useMMKVObject('cart');
  useApi({
    queryFn: getCart,
    queryKey: ['getCart'],
    onSuccess: data => {
      console.log('data cart', data?.cart);
      setCart(data?.cart ?? []);
    },
  });
  const [pos, setPos] = useState(0);
  const [state, setState] = useState();
  const [lga, setLga] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

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
      {cart && cart.length > 0 ? (
        <>
          {pos === 0 && <CartItems />}
          {pos === 1 && (
            <Delivery
              {...{
                state,
                setState,
                lga,
                setLga,
                address,
                setAddress,
                phone,
                setPhone,
              }}
            />
          )}
          <Amount {...{cart}} />
          <LayoutAnimationComponent delay={300}>
            <Button
              title={pos === 0 ? 'Next' : 'Make Payment'}
              onPress={next}
              // disable={true}
            />
          </LayoutAnimationComponent>
        </>
      ) : (
        <EmptyCart />
      )}
    </Mainbackground>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
