import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import Mainbackground from '../../components/Mainbackground';
import {SCREEN_WIDTH} from '../../constants/Variables';
import {SharedElement} from 'react-navigation-shared-element';
import {MediumText, RegularTextB, SmallText} from '../../components/Text';
import Button from '../../components/Button';
import {BackButton, FavButton, ShareButton} from '../../components/IconButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import Colors from '../../constants/Colors';
import VariantPicker from './components/VariantPicker';
import Quantity from './components/Quantity';
import SizeSelector from './components/SizeSelector';
import AffilateLink from './components/AffilateLink';
import Description from './components/Description';
import {formatNumberWithCommas, showNotification} from '../../utilis/Functions';
import useCart from '../../hooks/useCart';
import {useNavigation} from '@react-navigation/native';
import {viewProduct} from '../../api/products';

const FullImages = ({pictures, flatListRef, scrollX, setActiveIndex}) => {
  const onViewRef = React.useRef(({viewableItems}: any) => {
    setActiveIndex(viewableItems[0].index);
  });

  return (
    <SharedElement id={pictures[0]}>
      <Animated.FlatList
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        // viewabilityConfig={viewConfigRef.current}
        data={pictures}
        renderItem={({item}) => (
          <FastImage
            source={{uri: item}}
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
            }}
          />
        )}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
      />
    </SharedElement>
  );
};

const Header = ({item, _id, id}) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        position: 'absolute',
        top: inset.top / 1.5,
        width: SCREEN_WIDTH,
        zIndex: 3,
      }}>
      <BackButton
        fallBack={() => {
          navigation.navigate('BottomNav');
        }}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <ShareButton id={id} />
        <SharedElement id={`favbutton${_id}`}>
          <FavButton color="white" item={item} />
        </SharedElement>
      </View>
    </View>
  );
};
const ProductScreen = ({route, navigation}) => {
  const {
    pictures,
    name,
    _id,
    id,
    sizes,
    description,
    price,
    discount,
    affiliate_commission,
  } = route.params ?? {};
  const [activeIndex, setActiveIndex] = useState(0);
  let flatListRef = useRef(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const displayPrice = price - (discount ?? 0);

  const goToIndex = i => {
    // @ts-ignore
    flatListRef.current.scrollToIndex({
      index: i,
      animated: true,
    });
  };
  const {
    isInCart,
    addToCart,
    editSize,
    quantity: cartQuan,
    size: cartSize,
    editQuantity,
    removeFromCart,
  } = useCart({item: route?.params ?? {}});

  const [size, setSize] = useState(cartSize);
  const [quantity, setQuantity] = useState(cartQuan ?? '1');

  const add = () => {
    if (isInCart) {
      navigation.navigate('CartScreen');
    } else {
      if (!size) {
        showNotification({error: true, msg: 'Please select a size'});
        return;
      }
      if (!quantity || parseInt(quantity) < 1) {
        showNotification({error: true, msg: 'Please input the quantity'});
        return;
      }
      addToCart({quantity, size});
    }
  };

  useEffect(() => {
    console.log('=========== VIEWING PRODUCT ============');
    viewProduct({product_id: _id}).then(d => {
      console.log(d.data);
    });
  }, []);
  return (
    <Mainbackground top={-1} avoid androidAvoid={'height'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Header {...{item: route?.params, _id, id}} />
        <FullImages
          {...{pictures, flatListRef, scrollX, activeIndex, setActiveIndex}}
        />
        <View>
          <ExpandingDot
            data={pictures}
            expandingDotWidth={30}
            scrollX={scrollX}
            inActiveDotOpacity={0.6}
            activeDotColor={Colors.primary}
            dotStyle={{
              width: 10,
              height: 6,
              borderRadius: 5,
              marginHorizontal: 5,
            }}
            containerStyle={{
              top: -17,
            }}
          />
        </View>
        <View style={{padding: 15, flex: 1}}>
          <VariantPicker data={pictures} {...{activeIndex, goToIndex}} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <SharedElement id={`name${_id}`}>
              <MediumText>{name}</MediumText>
            </SharedElement>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {!!discount && discount > 0 && (
                <SmallText
                  style={{
                    marginRight: 10,
                    textDecorationLine: 'line-through',
                    color: 'grey',
                  }}>
                  ₦ {formatNumberWithCommas(price)}
                </SmallText>
              )}
              <SharedElement id={`price${_id}`}>
                <RegularTextB>
                  ₦ {formatNumberWithCommas(displayPrice)}
                </RegularTextB>
              </SharedElement>
            </View>
          </View>
          {description && <Description description={description} />}
          <SizeSelector
            sizes={sizes}
            {...{size, setSize, editSize, isInCart}}
          />
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
          <AffilateLink id={id} affiliate_commission={affiliate_commission} />
        </View>
      </ScrollView>
      <SharedElement id={`cartbutton${_id}`}>
        <Button
          backgroundColor={isInCart ? 'transparent' : Colors.primary}
          title={isInCart ? 'Proceed to checkout' : 'Add to  cart'}
          bottom={20}
          width={93}
          onPress={add}
          style={{
            borderColor: Colors.primary,
            borderWidth: isInCart ? 2 : 0,
          }}
        />
      </SharedElement>
    </Mainbackground>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
