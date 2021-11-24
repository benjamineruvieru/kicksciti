import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import Mainbackground from '../../components/Mainbackground';
import {SCREEN_WIDTH} from '../../constants/Variables';
import {SharedElement} from 'react-navigation-shared-element';
import {MediumText, RegularTextB, SmallText} from '../../components/Text';
import Button from '../../components/Button';
import LoveOutline from '../../assets/svg/icons/love-outline.svg';
import Love from '../../assets/svg/icons/love.svg';
import {BackButton, FavButton} from '../../components/IconButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import Colors from '../../constants/Colors';
import VariantPicker from './components/VariantPicker';
import Quantity from './components/Quantity';
import SizeSelector from './components/SizeSelector';
import AffilateLink from './components/AffilateLink';

const ProductScreen = ({route}) => {
  const {link1, name} = route.params ?? {};
  const inset = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);
  let flatListRef = useRef(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const onViewRef = React.useRef(({viewableItems}: any) => {
    setActiveIndex(viewableItems[0].index);
  });

  const goToIndex = i => {
    // @ts-ignore
    flatListRef.current.scrollToIndex({
      index: i,
      animated: true,
    });
  };

  return (
    <Mainbackground top={-1} keyboard avoid androidAvoid={'height'}>
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
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
            zIndex: 1,
          }}>
          <BackButton />
          <FavButton color="white" />
        </View>
        <SharedElement id={link1}>
          <Animated.FlatList
            ref={flatListRef}
            onViewableItemsChanged={onViewRef.current}
            // viewabilityConfig={viewConfigRef.current}
            data={[link1, link1]}
            renderItem={({item}) => (
              <FastImage
                source={{uri: item}}
                style={{
                  width: SCREEN_WIDTH,
                  height: SCREEN_WIDTH,
                }}
              />
            )}
            // keyExtractor={keyExtractor}
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
        <View>
          <ExpandingDot
            data={['dd', 'dd']}
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
          <VariantPicker
            data={[link1, link1, link1, link1, link1, link1]}
            {...{activeIndex, goToIndex}}
          />
          <MediumText>{name}</MediumText>
          <RegularTextB style={{marginTop: 10}}>Description</RegularTextB>
          <SmallText style={{marginBottom: 20, marginTop: 5}}>
            We've updated the look with open langur team for added comfort and
            stvle with deco
          </SmallText>
          <SizeSelector />
          <Quantity />
          <AffilateLink />
        </View>
        <Button title="Add to  cart" bottom={20} />
      </ScrollView>
    </Mainbackground>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
