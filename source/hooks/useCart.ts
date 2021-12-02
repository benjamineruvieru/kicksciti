import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {useMMKVObject} from 'react-native-mmkv';
import {addToServerCart, updateServerCart} from '../api/user';

const useCart = ({item}) => {
  const [cart, setCart] = useMMKVObject('cart');
  const index = cart?.findIndex(cart => cart?.item?._id === item._id) ?? -1;
  const isInCart = index !== -1;
  const data = cart?.[index] ?? {};
  const {quantity, size} = data;

  function addToCart({size, quantity}) {
    if (isInCart) {
    } else {
      addToServerCart({_id: item._id, quantity, size})
        .then(data => {
          console.log('added', data.data);
        })
        .catch(err => {
          console.log('err', err);
          console.log('err2', err?.response?.data);
        });
      const cartList = [...(cart ?? []), {item, size, quantity}];

      console.log(`Added ${item._id} to cart`);
      console.log('cartList', cartList);
      setCart(cartList);
    }
  }

  const removeFromCart = () => {
    if (isInCart) {
      addToServerCart({_id: item._id, add: false})
        .then(data => {
          console.log('removed', data.data);
        })
        .catch(err => {
          console.log('err', err);
          console.log('err2', err?.response?.data);
        });
      cart?.splice(index, 1);
      console.log(`Removed ${item._id} from cart`, cart);
      setCart([...cart]);
    }
  };

  const editSize = size => {
    updateServerCart({_id: item._id, size})
      .then(data => {
        console.log('added', data.data);
      })
      .catch(err => {
        console.log('err', err);
        console.log('err2', err?.response?.data);
      });
    data.size = size;
    cart[index] = data;
    setCart([...cart]);
  };
  const timer = useRef();

  const queueUpdate = action => {
    console.log(timer.current);
    clearTimeout(timer.current);
    timer.current = setTimeout(action, 1000);
  };

  const editQuantity = quantity => {
    if (parseInt(quantity) > 0) {
      queueUpdate(() => {
        updateServerCart({_id: item._id, quantity})
          .then(data => {
            console.log('added', data.data);
          })
          .catch(err => {
            console.log('err', err);
            console.log('err2', err?.response?.data);
          });
      });
    }

    data.quantity = quantity;
    cart[index] = data;
    setCart([...cart]);
  };

  return {
    isInCart,
    addToCart,
    removeFromCart,
    cart,
    quantity,
    size,
    editSize,
    editQuantity,
  };
};

export default useCart;
