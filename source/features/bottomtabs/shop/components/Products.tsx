import {
  DeviceEventEmitter,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {SmallText, SmallTextB} from '../../../../components/Text';
import FastImage from 'react-native-fast-image';
import {
  formatNumberWithCommas,
  getPercentWidth,
} from '../../../../utilis/Functions';
import {SCREEN_WIDTH} from '../../../../constants/Variables';
import Button from '../../../../components/Button';
import LoveOutline from '../../../../assets/svg/icons/love-outline.svg';
import Love from '../../../../assets/svg/icons/love.svg';
import Colors from '../../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {Easing, FadeIn, SlideInRight} from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';
import LayoutAnimationComponent from '../../../../components/LayoutAnimationComponent';
import {FavButton} from '../../../../components/IconButton';
import useCart from '../../../../hooks/useCart';

const DATA = [
  {
    _id: '656647c0eb97e8d09c8309a2',
    avaliable: true,
    bias: 0,
    category: 'adidas',
    createdAt: '2023-11-28T20:04:17.056Z',
    favourites: 0,
    id: '59515902',
    keywords: [
      'adidas',
      'grey',
      'brown',
      'white',
      'fashion',
      '20000',
      '20k',
      'blue',
    ],
    name: 'Adidas',
    owner_id: '6563aba3060d671516bd4018',
    pictures: [
      'https://kicksciti.s3.us-east-1.amazonaws.com/shoe_images/ba884ea4-15c4-4ebb-b1a4-c5bd797c9907.jpeg',
      'https://kicksciti.s3.us-east-1.amazonaws.com/shoe_images/bfeccbe2-1a09-4295-842c-3fa0e49f5cef.jpeg',
    ],
    price: 20000,
    quantity: 10,
    sizes: [40, 41, 42, 43, 44, 45],
    type: 'sneaker',
    updatedAt: '2023-11-28T20:04:17.056Z',
    views: 0,
    discount: 2000,
  },
  {
    _id: '6565ff8d02dd559ae1030a22',
    avaliable: true,
    bias: 0,
    category: 'prada',
    createdAt: '2023-11-28T14:56:13.412Z',
    favourites: 0,
    id: '90264898',
    keywords: ['prada', 'grey', 'black', 'white', 'high sole', 'camo', 'sole'],
    name: 'Prada',
    owner_id: '6563aba3060d671516bd4018',
    pictures: [
      'https://kicksciti.s3.us-east-1.amazonaws.com/shoe_images/78d419fa-77d8-447a-904c-64fbf24ff146.jpeg',
      'https://kicksciti.s3.us-east-1.amazonaws.com/shoe_images/806b50ab-da1f-4f9a-ab6e-cfd7a7f0caa2.jpeg',
    ],
    price: 18000,
    quantity: 10,
    sizes: [40, 41, 42, 43, 44, 45, 46],
    type: 'sneaker',
    updatedAt: '2023-11-28T14:56:13.412Z',
    views: 0,
  },
];
export const PRODUCTIMGWIDTH = (SCREEN_WIDTH - 40 - 10) / 2;
const Wrapper = ({item, index, children}) => {
  const navigation = useNavigation();
  return (
    <LayoutAnimationComponent
      style={{width: '100%'}}
      entering={FadeIn.delay(index * 100).easing(Easing.ease)}>
      <TouchableOpacity
        style={{
          marginBottom: 15,
          width: '100%',
          alignItems: index % 2 === 1 ? 'flex-end' : 'flex-start',
        }}
        onPress={() => {
          navigation.navigate('ProductScreen', item);
        }}>
        {children}
      </TouchableOpacity>
    </LayoutAnimationComponent>
  );
};

const AddToCart = ({item}) => {
  const {_id} = item;
  const {isInCart, removeFromCart} = useCart({item});

  return (
    <SharedElement id={`cartbutton${_id}`}>
      <Button
        onPress={() => {
          if (isInCart) {
            removeFromCart();
          } else {
            DeviceEventEmitter.emit('openCartModal', item);
          }
        }}
        backgroundColor={isInCart ? 'transparent' : Colors.primary}
        style={{
          borderColor: Colors.primary,
          borderWidth: isInCart ? 1 : 0,
        }}
        title={isInCart ? 'Remove from cart' : 'Add to cart'}
        width={32}
        small
      />
    </SharedElement>
  );
};

const ProductItem = ({item, index}) => {
  const {name, pictures, price, _id, discount} = item ?? {};
  const displayPrice = price - (discount ?? 0);
  return (
    <Wrapper {...{index, item}}>
      <SharedElement id={pictures[0]}>
        <FastImage
          source={{uri: pictures[0]}}
          style={{
            height: PRODUCTIMGWIDTH,
            width: PRODUCTIMGWIDTH,
            borderRadius: 10,
          }}
        />
      </SharedElement>
      <View style={{width: PRODUCTIMGWIDTH, paddingLeft: 3}}>
        <View style={{paddingVertical: 10}}>
          <View>
            <SharedElement id={`name${_id}`}>
              <SmallTextB style={{marginBottom: 10, fontSize: 14}}>
                {name}
              </SmallTextB>
            </SharedElement>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SharedElement id={`price${_id}`}>
                <SmallText>₦ {formatNumberWithCommas(displayPrice)}</SmallText>
              </SharedElement>
              {!!discount && discount > 0 && (
                <SmallText
                  style={{
                    marginLeft: 10,
                    textDecorationLine: 'line-through',
                    color: 'grey',
                    fontSize: 11,
                  }}>
                  ₦ {formatNumberWithCommas(price)}
                </SmallText>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 5,
          }}>
          <AddToCart {...{item}} />
          <SharedElement id={`favbutton${_id}`}>
            <FavButton item={item} size={25} />
          </SharedElement>
        </View>
      </View>
    </Wrapper>
  );
};
const Products = ({results, refresh}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    if (refresh) {
      setRefreshing(true);
      refresh();
      setRefreshing(false);
    }
  };
  return (
    <View style={{flex: 1}}>
      <FlashList
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={results}
        renderItem={ProductItem}
        estimatedItemSize={257}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({});
