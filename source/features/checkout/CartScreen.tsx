import {Image, Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
  showNotification,
} from '../../utilis/Functions';
import {SCREEN_WIDTH} from '../../constants/Variables';
import EmptyCart from './components/EmptyCart';
import {useApi} from '../../hooks/useApi';
import {getCart, makePayment} from '../../api/products';
import PaymentModal from './components/PaymentModal';
import useRecentAddresses from '../../hooks/useRecentAddresses';
import RecentAddress from './components/RecentAddress';

const Amount = ({deliveryfee = 0, cart}) => {
  let totalPrice = 0;

  cart.forEach(item => {
    const {price, discount} = item.item;
    const discountedPrice = discount ? price - discount : price;
    const totalItemPrice = discountedPrice * item.quantity;
    totalPrice += totalItemPrice;
  });
  return (
    <View>
      {!!deliveryfee && deliveryfee > 0 && (
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
            ₦ {formatNumberWithCommas(deliveryfee)}
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
            ₦ {formatNumberWithCommas(totalPrice + deliveryfee)}
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
  recentAddress,
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
          keyboard="phone-pad"
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
        <LayoutAnimationComponent rightInOut delay={950}>
          <ModalSelector
            placeholderText="Local government area"
            text={lga}
            setText={setLga}
            search
            data={getCity({state, country: 'Nigeria'})}
          />
        </LayoutAnimationComponent>
      )}
      <RecentAddress
        {...{
          recentAddress,
          setState,

          setLga,

          setAddress,

          setPhone,
        }}
      />
    </View>
  );
};
const CartScreen = () => {
  const {recentAddress, addAddress} = useRecentAddresses();
  const [cart, setCart] = useMMKVObject('cart');
  useEffect(() => {
    getCart().then(data => {
      console.log('data cart', data?.data?.cart);
      setCart(data?.data?.cart ?? []);
    });
  }, []);

  const [pos, setPos] = useState(0);
  const [state, setState] = useState('Lagos');
  const [lga, setLga] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [deliveryfee, setDeliveryfee] = useState(2000);
  const [load, setLoad] = useState(false);
  const [link, setLink] = useState();
  const [order_id, setorder_id] = useState();
  const modalRef = useRef();
  const openModal = () => {
    modalRef.current.open();
  };

  const next = () => {
    if (pos === 0) {
      setPos(1);
    } else if (pos === 1) {
      if (!address) {
        showNotification({
          error: true,
          msg: 'Please enter the products delivery address',
        });
        return;
      }
      if (!phone) {
        showNotification({
          error: true,
          msg: 'Please enter contact phone number',
        });
        return;
      }
      if (!state) {
        showNotification({
          error: true,
          msg: 'Please select the delivery state',
        });
        return;
      }
      if (!state) {
        showNotification({
          error: true,
          msg: 'Please select the delivery local government',
        });
        return;
      }
      setLoad(true);
      Keyboard.dismiss();
      makePayment({address, lga, phone, state})
        .then(data => {
          const {link, order} = data.data ?? {};
          console.log('order', order.products);
          setorder_id(order?.order_id);
          setLink(link);
          openModal();
          setCart([]);
          setPos(0);
          addAddress({address, lga, phone, state});
        })
        .catch(err => {
          console.log('err', err?.response?.data);
          showNotification({error: true, msg: err?.response?.data?.error});
        })
        .finally(() => {
          setLoad(false);
        });
    }
  };
  return (
    <>
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
                  recentAddress,
                }}
              />
            )}
            <Amount {...{cart, deliveryfee}} />
            <LayoutAnimationComponent delay={300}>
              <Button
                title={pos === 0 ? 'Next' : 'Make Payment'}
                onPress={next}
                // disable={true}
                load={load}
              />
            </LayoutAnimationComponent>
          </>
        ) : (
          <EmptyCart />
        )}
      </Mainbackground>
      <PaymentModal {...{modalRef, link, order_id}} />
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
