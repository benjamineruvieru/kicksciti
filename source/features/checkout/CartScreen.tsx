import {Keyboard, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Mainbackground from '../../components/Mainbackground';
import PageHeader from '../../components/PageHeader';
import CartItemsList from './components/CartItemsList';
import Button from '../../components/Button';
import {MediumText, RegularTextB} from '../../components/Text';
import Input, {ModalSelector} from '../../components/Input';
import Colors from '../../constants/Colors';
import LayoutAnimationComponent from '../../components/LayoutAnimationComponent';
import {useMMKVObject} from 'react-native-mmkv';
import {
  formatNumberWithCommas,
  getCity,
  getDeliveryFee,
  getState,
  showNotification,
} from '../../utilis/Functions';
import EmptyCart from './components/EmptyCart';
import {getCart, makePayment} from '../../api/products';
import PaymentModal from './components/PaymentModal';
import useRecentAddresses from '../../hooks/useRecentAddresses';
import RecentAddress from './components/RecentAddress';
import HighlightSelector from './components/HighlightSelector';
import useKeyboardOpen from '../../hooks/useKeyboardOpen';

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
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
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
    </ScrollView>
  );
};

const PaymentType = ({paymentOnDelivery, setpaymentOnDelivery}) => {
  return (
    <View style={{flex: 1}}>
      <LayoutAnimationComponent rightInOut delay={350}>
        <HighlightSelector
          setSelected={() => {
            setpaymentOnDelivery(true);
          }}
          selected={paymentOnDelivery}
          title={'Pay on Delivery'}
          sub={
            'Shop now and pay when your order arrives at your doorstep. Please note that the delivery fee must be paid in advance.'
          }
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent rightInOut delay={550}>
        <HighlightSelector
          setSelected={() => {
            setpaymentOnDelivery(false);
          }}
          selected={paymentOnDelivery === false}
          title={'Pay Now'}
          sub={'Debit/Credit Card • Transfer • USSD'}
        />
      </LayoutAnimationComponent>
    </View>
  );
};
const CartScreen = ({navigation}) => {
  const {recentAddress, addAddress} = useRecentAddresses();
  const [cart, setCart] = useMMKVObject('cart');
  const [updatingCart] = useMMKVObject('updatingCart');

  useEffect(() => {
    console.log('updatingCart', updatingCart);
    if (!updatingCart) {
      getCart().then(data => {
        console.log('data cart', data?.data?.cart);
        setCart(data?.data?.cart ?? []);
      });
    }
  }, [updatingCart]);

  const [pos, setPos] = useState(0);
  const [state, setState] = useState('Lagos');
  const [lga, setLga] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState('+234');
  const [deliveryfee, setDeliveryfee] = useState(0);
  const [load, setLoad] = useState(false);
  const [link, setLink] = useState();
  const [order_id, setorder_id] = useState();
  const [paymentOnDelivery, setpaymentOnDelivery] = useState();
  const [keyboardOpen, setKeyboardOpen] = useState();

  useEffect(() => {
    if (state && lga) {
      setDeliveryfee(getDeliveryFee({lga, state}));
    }
  }, [state, lga]);

  useKeyboardOpen(
    () => {
      setKeyboardOpen(true);
    },
    () => {
      setKeyboardOpen(false);
    },
    [],
  );
  const modalRef = useRef();
  const openModal = () => {
    modalRef.current.open();
  };

  const initPayment = () => {
    if (!address) {
      showNotification({
        error: true,
        msg: 'Please enter the products delivery address',
      });
      return;
    }
    if (!phone && phone.length < 10) {
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
    if (!lga) {
      showNotification({
        error: true,
        msg: 'Please select the delivery local government',
      });
      return;
    }
    setLoad(true);
    Keyboard.dismiss();
    makePayment({address, lga, phone, state, paymentOnDelivery})
      .then(data => {
        const {link, order} = data.data ?? {};

        console.log('order link', link);
        if (link) {
          setorder_id(order?.order_id);
          setLink(link);
          openModal();
        } else {
          navigation.navigate('OrderDetails', {order_id: order?.order_id});
        }
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
  };

  const next = () => {
    if (pos === 0) {
      setPos(1);
    } else if (pos === 1) {
      if (state === 'Lagos') {
        setPos(2);
      } else {
        initPayment();
      }
    } else if (pos === 2) {
      if (paymentOnDelivery === true || paymentOnDelivery === false) {
        initPayment();
      } else {
        showNotification({msg: 'Please select a payment method', error: true});
      }
    }
  };
  return (
    <>
      <Mainbackground avoid keyboard padding={20}>
        <PageHeader
          onPress={() => {
            if (pos > 0) {
              setPos(p => p - 1);
            } else {
              navigation.goBack();
            }
          }}
          title={
            pos === 0
              ? 'Cart'
              : pos === 1
              ? 'Delivery Details'
              : pos === 2
              ? 'Payment Method'
              : ''
          }
        />
        {cart && cart?.length > 0 ? (
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
            {pos === 2 && (
              <PaymentType {...{paymentOnDelivery, setpaymentOnDelivery}} />
            )}
            {!keyboardOpen && <Amount {...{cart, deliveryfee}} />}
            <LayoutAnimationComponent delay={300}>
              <Button
                title={pos === 0 ? 'Next' : 'Make Payment'}
                onPress={next}
                disable={updatingCart}
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
