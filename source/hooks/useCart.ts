import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useMMKVObject} from 'react-native-mmkv';

const useCart = ({item}) => {
  const [cart, setCart] = useMMKVObject('cart');
  const index = cart?.findIndex(cart => cart?.item?._id === item._id) ?? -1;
  const isInCart = index !== -1;
  const data = cart[index] ?? {};
  const {quantity, size} = data;
  function addToCart({size, quantity}) {
    if (isInCart) {
    } else {
      const cartList = [...(cart ?? []), {item, size, quantity}];

      console.log(`Added ${item._id} to cart`);
      console.log('cartList', cartList);
      setCart(cartList);
    }
  }

  const removeFromCart = () => {
    if (isInCart) {
      cart?.splice(index, 1);
      console.log(`Removed ${item._id} from cart`, cart);
      setCart([...cart]);
    }
  };

  const editSize = size => {
    data.size = size;
    cart[index] = data;
    setCart([...cart]);
  };

  const editQuantity = quantity => {
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
