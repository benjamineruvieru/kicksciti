import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import {SCREEN_WIDTH} from '../../../constants/Variables';
import {
  formatNumberWithCommas,
  getPercentWidth,
} from '../../../utilis/Functions';
import {QuantityCounter} from '../../productdetails/components/Quantity';
import {
  MediumText,
  RegularText,
  RegularTextB,
  SmallText,
} from '../../../components/Text';
import LayoutAnimationComponent from '../../../components/LayoutAnimationComponent';
import {useMMKVObject} from 'react-native-mmkv';
import useCart from '../../../hooks/useCart';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';

const QuantityWrapper = ({product}) => {
  const {
    isInCart,

    quantity: cartQuan,

    editQuantity,
    removeFromCart,
  } = useCart({item: product ?? {}});

  const [quantity, setQuantity] = useState(cartQuan ?? '1');

  return (
    <QuantityCounter
      {...{
        quantity,
        cartQuan,
        setQuantity,
        editQuantity,
        isInCart,
        removeFromCart,
      }}
    />
  );
};

const Wrapper = ({item, children, index}) => {
  const navigation = useNavigation();
  return (
    <LayoutAnimationComponent
      rightInOut
      delay={100 + index * 150}
      exitDelay={100 + index * 150}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductScreen', item);
        }}
        style={{flexDirection: 'row', marginBottom: 20}}>
        {children}
      </TouchableOpacity>
    </LayoutAnimationComponent>
  );
};
const RenderItem = ({item, index}) => {
  const {item: product, size} = item ?? {};
  const {pictures, name, price, discount, _id} = product ?? {};
  const displayPrice = price - (discount ?? 0);

  return (
    <Wrapper {...{index}} item={product}>
      <SharedElement id={pictures[0]}>
        <FastImage
          source={{uri: pictures[0]}}
          style={{
            width: getPercentWidth(40),
            height: getPercentWidth(40),
            borderRadius: 10,
          }}
        />
      </SharedElement>
      <View style={{flex: 1, paddingLeft: 15, paddingTop: 5}}>
        <View style={{flex: 1}}>
          <SharedElement id={`name${_id}`}>
            <MediumText>{name}</MediumText>
          </SharedElement>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              marginBottom: 15,
              alignItems: 'center',
            }}>
            <SharedElement id={`price${_id}`}>
              <RegularText>
                ₦ {formatNumberWithCommas(displayPrice)}
              </RegularText>
            </SharedElement>
            {!!discount && discount > 0 && (
              <SmallText
                style={{
                  marginLeft: 10,
                  textDecorationLine: 'line-through',
                  color: 'grey',
                }}>
                ₦ {formatNumberWithCommas(price)}
              </SmallText>
            )}
          </View>
          <RegularText>Size: {size}</RegularText>
        </View>
        <QuantityWrapper {...{product}} />
      </View>
    </Wrapper>
  );
};
const CartItemsList = () => {
  const [cart] = useMMKVObject('cart');
  console.log('local cart', cart);
  return (
    <View style={{flex: 1}}>
      <FlashList
        estimatedItemSize={157}
        data={cart?.reverse()}
        renderItem={RenderItem}
      />
    </View>
  );
};

export default CartItemsList;
