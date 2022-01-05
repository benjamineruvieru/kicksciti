import {useRef} from 'react';
import {useMMKVObject} from 'react-native-mmkv';
import {addToServerCart, updateServerCart} from '../api/user';
import {restrictViewer} from '../utilis/Functions';
import {useNavigation} from '@react-navigation/native';

interface CartItem {
  _id: string;
  item: any;
  quantity: number;
  size: number;
}

interface CartHook {
  item: CartItem;
}

const useCart = ({item}: CartHook) => {
  const navigation = useNavigation();
  const [updatingCart, setUpdating] = useMMKVObject('updatingCart');
  const [cart, setCart] = useMMKVObject<CartItem[]>('cart');
  const index = cart?.findIndex(cart => cart?.item?._id === item._id) ?? -1;
  const isInCart = index !== -1;
  const data = cart?.[index] ?? {};
  const {quantity, size} = data;

  function addToCart({size, quantity}: {size: string; quantity: number}) {
    if (isInCart) {
    } else {
      const cartList = [...(cart ?? []), {item, size, quantity}];

      console.log(`Added ${item._id} to cart`);
      console.log('cartList', cartList);
      setCart(cartList);
      setUpdating(true);
      addToServerCart({_id: item._id, quantity, size})
        .then(data => {
          console.log('added', data.data);
        })
        .catch(err => {
          console.log('err', err);
          console.log('err2', err?.response?.data);
        })
        .finally(() => {
          setUpdating(false);
        });
    }
  }

  const removeFromCart = () => {
    if (isInCart) {
      setUpdating(true);
      addToServerCart({_id: item._id, add: false})
        .then(data => {
          console.log('removed', data.data);
        })
        .catch(err => {
          console.log('err', err);
          console.log('err2', err?.response?.data);
        })
        .finally(() => {
          setUpdating(false);
        });
      cart?.splice(index, 1);
      console.log(`Removed ${item._id} from cart`, cart);
      setCart([...cart]);
    }
  };

  const editSize = size => {
    setUpdating(true);
    updateServerCart({_id: item._id, size})
      .then(data => {
        console.log('added', data.data);
      })
      .catch(err => {
        console.log('err', err);
        console.log('err2', err?.response?.data);
      })
      .finally(() => {
        setUpdating(false);
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

  const editQuantity = (quantity: number) => {
    if (parseInt(quantity) > 0) {
      queueUpdate(() => {
        setUpdating(true);
        updateServerCart({_id: item._id, quantity})
          .then(data => {
            console.log('added', data.data);
          })
          .catch(err => {
            console.log('err', err);
            console.log('err2', err?.response?.data);
          })
          .finally(() => {
            setUpdating(false);
          });
      });
    }

    data.quantity = quantity;
    cart[index] = data;
    setCart([...cart]);
  };

  return {
    isInCart,
    addToCart: ({quantity, size}) => {
      restrictViewer({
        navigation,
        alt: () => {
          addToCart({quantity, size});
        },
      });
    },
    removeFromCart,
    cart,
    quantity,
    size,
    editSize,
    editQuantity,
  };
};

export default useCart;
