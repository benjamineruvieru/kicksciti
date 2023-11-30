import {Alert, DeviceEventEmitter, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Modalize} from 'react-native-modalize';
import SizeSelector from '../productdetails/components/SizeSelector';
import useCart from '../../hooks/useCart';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';
import {showNotification} from '../../utilis/Functions';
import Quantity from '../productdetails/components/Quantity';
import {MediumText, RegularTextB} from '../../components/Text';

const AddToCartModal = () => {
  const modalRef = useRef();
  const [item, setItem] = useState({});
  useEffect(() => {
    const myEvent = DeviceEventEmitter.addListener('openCartModal', event => {
      console.log('event', event);
      setItem({...event});
      modalRef.current.open();
    });
    return () => myEvent.remove();
  }, []);

  const {sizes} = item ?? {};
  const {
    isInCart,
    addToCart,
    editSize,
    quantity: cartQuan,
    size: cartSize,
    editQuantity,
    removeFromCart,
  } = useCart({item});

  const [size, setSize] = useState(cartSize);
  const [quantity, setQuantity] = useState(cartQuan ?? '1');

  const add = () => {
    if (isInCart) {
    } else {
      if (!size) {
        Alert.alert('Please select a size');
        // showNotification({error: true, msg: 'Please select a size'});
        return;
      }
      if (!quantity || parseInt(quantity) < 1) {
        Alert.alert('Please input the quantity');
        // showNotification({error: true, msg: 'Please input the quantity'});
        return;
      }
      addToCart({quantity, size});

      modalRef.current.close();
      setSize();
      setQuantity('1');
      setItem({});
    }
  };
  return (
    <Modalize
      modalStyle={{backgroundColor: Colors.bg, padding: 20}}
      ref={modalRef}
      adjustToContentHeight>
      <RegularTextB style={{marginBottom: 15}}>Add to cart</RegularTextB>
      <SizeSelector sizes={sizes} {...{size, setSize, editSize, isInCart}} />
      <Quantity
        {...{
          quantity,
          setQuantity,
          editQuantity,
          isInCart,
          cartQuan,
          removeFromCart,
        }}
      />
      <Button
        backgroundColor={isInCart ? 'transparent' : Colors.primary}
        title={isInCart ? 'Proceed to checkout' : 'Add to  cart'}
        bottom={30}
        top={20}
        width={90}
        onPress={add}
        style={{
          borderColor: Colors.primary,
          borderWidth: isInCart ? 2 : 0,
        }}
      />
    </Modalize>
  );
};

export default AddToCartModal;

const styles = StyleSheet.create({});
