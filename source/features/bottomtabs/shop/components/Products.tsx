import {
  ActivityIndicator,
  DeviceEventEmitter,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {RegularTextB, SmallText, SmallTextB} from '../../../../components/Text';
import FastImage from 'react-native-fast-image';
import {
  formatNumberWithCommas,
  getPercentHeight,
  getPercentWidth,
} from '../../../../utilis/Functions';
import {SCREEN_WIDTH, isPhone} from '../../../../constants/Variables';
import Button from '../../../../components/Button';
import Colors from '../../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {Easing, FadeIn} from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';
import LayoutAnimationComponent from '../../../../components/LayoutAnimationComponent';
import {FavButton} from '../../../../components/IconButton';
import useCart from '../../../../hooks/useCart';
import LottieView from 'lottie-react-native';

export const PRODUCTIMGWIDTH =
  (SCREEN_WIDTH - 40 - (isPhone ? 10 : 20)) / (isPhone ? 2 : 3);

const EmptyComp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: getPercentHeight(60),
      }}>
      <LayoutAnimationComponent delay={300} exit={null}>
        <LottieView
          autoPlay
          loop
          source={require('../../../../assets/lottie/nosearch.json')}
          style={{
            width: getPercentWidth(55),
            height: getPercentWidth(55),
            maxWidth: 400,
            maxHeight: 400,
          }}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent exit={null} delay={400}>
        <RegularTextB style={{marginBottom: 5}}>
          It seems your search didn't return any matches.
        </RegularTextB>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent exit={null} delay={500}>
        <SmallText style={{textAlign: 'center'}}>
          Try broadening your search or changing your search terms to find the
          perfect fit
        </SmallText>
      </LayoutAnimationComponent>
    </View>
  );
};
const Wrapper = ({item, index, children}) => {
  const navigation = useNavigation();
  return (
    <LayoutAnimationComponent
      style={{width: '100%'}}
      exit={null}
      entering={FadeIn.delay(index * 100).easing(Easing.ease)}>
      <TouchableOpacity
        style={{
          marginBottom: 15,
          width: '100%',
          alignItems: isPhone
            ? index % 2 === 1
              ? 'flex-end'
              : 'flex-start'
            : null,
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
        width={isPhone ? 32 : 25}
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
const Products = ({
  results,
  refresh,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}) => {
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
        numColumns={isPhone ? 2 : 3}
        data={results}
        renderItem={ProductItem}
        estimatedItemSize={257}
        ListEmptyComponent={EmptyComp}
        ListFooterComponent={() =>
          isFetchingNextPage && (
            <View style={{paddingVertical: 15}}>
              <ActivityIndicator color={Colors.primary} />
            </View>
          )
        }
        onEndReached={() => {
          console.log('end oo');
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({});
