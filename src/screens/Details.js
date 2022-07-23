import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  Animated,
  StatusBar,
  InteractionManager,
  Share,
  Alert,
} from 'react-native';
import Icon, {Icons} from '../components/Icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  add_subprice,
  put_cartlist,
  add_favorties,
  put_favorties,
} from '../redux/actions/headeraction';
import DropdownAlert from 'react-native-dropdownalert';
import Modal from 'react-native-modal';
import BottomSheet from 'reanimated-bottom-sheet';
import {storeData, Colors} from '../constants';
import {buildLink, DBAddCart, DBAddFav} from '../constants/Functions';
import Clipboard from '@react-native-clipboard/clipboard';

var imgnum = 0;

const width = Dimensions.get('window').width;

const Details = () => {
  var cartList = [];

  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const cartListR = useSelector(state => state.cartList);
  const favList = useSelector(state => state.favList);

  const imgList = [];
  const Sizes = [];
  const {item} = route.params;
  const STATUSBAR_HEIGHT1 = 30;
  const [favorties1, setFavorties1] = useState([item]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const [selindex, setSelindex] = useState(null);
  const [imgindex, setImgindex] = useState(item.link1);
  const smallSize = item.size.substring(0, 2);
  const loggedin = useSelector(state => !state.loggedin);

  let largeSize;

  useEffect(() => {
    const backAction1 = () => {
      navigation.goBack();
      return true;
    };

    const backHandler1 = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction1,
    );

    return () => backHandler1.remove();
  }, [navigation]);

  if (item.size.length > 6) {
    largeSize = item.size.substring(5, 7);
  } else {
    largeSize = item.size.substring(3, 5);
  }

  for (let i = smallSize; i <= largeSize; i++) {
    Sizes.push(i);
  }

  imgList.push(item.link1);

  if (item.link2 !== '') {
    imgList.push(item.link2);
  }
  if (item.link3 !== '') {
    imgList.push(item.link3);
  }
  if (item.link4 !== '') {
    imgList.push(item.link4);
  }
  if (item.link5 !== '') {
    imgList.push(item.link5);
  }

  const onShare = async msg => {
    try {
      const result = await Share.share({
        message: msg,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const getDataCart = async () => {
    try {
      const cartList1 = await AsyncStorage.getItem('cart');
      if (cartList1 != null) {
        cartList = JSON.parse(cartList1);
      } else {
      }
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    getDataCart();
  });

  useEffect(() => {
    const checkSize = () => {
      if (cartListR.findIndex(u => u.includes(favorties1[0].id)) !== -1) {
        setSelindex(
          parseInt(
            cartListR[
              cartListR.findIndex(u => u.includes(favorties1[0].id))
            ].substring(1, 3),
          ),
        );

        if (
          cartListR[
            cartListR.findIndex(u => u.includes(favorties1[0].id))
          ].substring(0, 1) !== '0'
        ) {
          setImgindex(
            imgList[
              cartListR[
                cartListR.findIndex(u => u.includes(favorties1[0].id))
              ].substring(0, 1)
            ],
          );
        }
      }
    };
    checkSize();
  }, []);

  const renderSizes = ({item}) => {
    return (
      <TouchableOpacity
        delayPressIn={0}
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: item === selindex ? Colors.primary : Colors.textGrey,
          padding: 0,
          marginRight: 10,
          width: 45,
          height: 45,
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: item === selindex ? Colors.primary : Colors.bag1Bg,
        }}
        onPress={() => setSelindex(item)}>
        <Text
          style={{
            color: Colors.white,
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 17,
            alignSelf: 'center',
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    imgnum = imgList.findIndex(u => u === imgindex);
  }, [imgindex]);

  const renderPic = item => {
    return (
      <TouchableOpacity
        delayPressIn={0}
        style={{
          borderRadius: 10,
          borderWidth: item.item === imgindex ? 3 : 0,
          borderColor: Colors.primary,
          marginRight: 10,
          width: 55,
          height: 55,
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor:
            item === selindex ? Colors.primaryDark : Colors.bag1Bg,
        }}
        onPress={() => setImgindex(item.item)}>
        <Image
          style={{
            backgroundColor: Colors.bag4Bg,
            width: 51,
            height: 51,
            borderRadius: 10,
            alignSelf: 'center',
          }}
          source={{uri: item.item}}
          blurRadius={0}
        />
      </TouchableOpacity>
    );
  };

  const addFav = () => {
    var date = Date.now();
    dispatch(put_favorties(date + item.id));
    DBAddFav(date + item.id);
    const newlist = [item];
    newlist[0].fav = date;
  };

  const favv = () => {
    InteractionManager.runAfterInteractions(() => {
      if (favList.findIndex(u => u.includes(item.id)) > -1) {
        const newlist = [item];
        newlist[0].fav = 'no';

        storeData(
          'favorites',
          JSON.stringify(
            favList.filter(main => main.substring(13, main.length) !== item.id),
          ),
        );
        dispatch(
          add_favorties(
            favList.filter(main => main.substring(13, main.length) !== item.id),
          ),
        );
      } else {
        addFav();
      }
    });
  };

  const cartfun = () => {
    if (loggedin) {
      if (cartListR.findIndex(u => u.includes(favorties1[0].id)) > -1) {
        navigation.navigate('Notifications');
      } else {
        if (selindex !== null) {
          var date = Date.now();
          cartList.push(imgnum.toString(10) + selindex + date + item.id);
          DBAddCart(imgnum.toString(10) + selindex + date + item.id);
          const newlist = [item];
          newlist[0].cart = imgnum + selindex + date + item.id;
          setFavorties1(newlist);
          dispatch(put_cartlist(cartList));

          storeData('cart', JSON.stringify(cartList));
          dispatch(add_subprice(parseInt(item.price.replace(',', ''))));

          dropDownAlertRef.alertWithType(
            'success',
            'Added To Cart',
            'Item has been successfully added to your cart',
          );
        } else {
          dropDownAlertRef.alertWithType(
            'warn',
            'No Size Selected',
            'Please select size before adding to cart',
          );
        }
      }
    } else {
      setTimeout(() => {
        navigation.navigate('Tab', {screen: 'Profile'});
      }, 600);
      dropDownAlertRef.alertWithType(
        'warn',
        'Not Logged In',
        'Please log in or create an account to continue',
      );
    }
  };
  let dropDownAlertRef = useRef();

  const goBackk = () => {
    navigation.goBack();
  };

  const RenderPic = () => {
    return (
      <>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={5}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          horizontal
          pagingEnabled
          style={styles.screenSquare}>
          {imgList.map((e, index) => (
            <Pressable key={index} onPress={closemodal}>
              <Image
                style={{
                  ...styles.screenSquare,
                  borderRadius: 25,
                  marginBottom: 20,
                  backgroundColor: Colors.bag4Bg,
                  opacity: 0.7,
                }}
                source={{uri: e}}
                blurRadius={0}
              />
            </Pressable>
          ))}
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
            bottom: 20,
            alignItems: 'center',
          }}
        />
      </>
    );
  };
  const RenderPic2 = () => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={5}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}
        horizontal
        pagingEnabled
        style={styles.screenSquare}>
        {imgList.map((e, index) => (
          <Image
            key={index}
            style={{
              ...styles.screenSquare,
            }}
            source={{uri: e}}
          />
        ))}
      </ScrollView>
    );
  };
  const [modalVisible, setModalVisible] = useState(false);
  const Notify = (title, message, type) => {
    dropDownAlertRef.alertWithType(type, title, message);
  };
  const closemodal = () => {
    setModalVisible(!modalVisible);
  };

  if (modalVisible) {
    Platform.OS !== 'ios' && StatusBar.setBackgroundColor(Colors.bag1Bg);
    StatusBar.setBarStyle('light-content', true);
    Platform.OS !== 'ios' && StatusBar.setTranslucent(false);
  } else {
    StatusBar.setBarStyle('light-content', true);

    Platform.OS !== 'ios' && StatusBar.setBackgroundColor('transparent');
    Platform.OS !== 'ios' && StatusBar.setTranslucent(true);
  }

  const openbot = () => {
    sheetRef.current.snapTo(0);
  };

  const renderContent = () => (
    <View style={{backgroundColor: Colors.bag4Bg, height: '100%'}}>
      <View
        style={{
          paddingVertical: 16,
          width: '100%',
        }}>
        <View
          style={{
            backgroundColor: Colors.white,
            width: 50,
            height: 5,
            borderRadius: 360,
            alignSelf: 'center',
          }}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'space-around'}}>
        <TouchableOpacity
          onPress={async () => {
            Notify('Creating Link', 'Please wait', 'warn');
            buildLink(item.id, item.name, item.price, item.link1).then(m => {
              onShare(m);
            });
          }}
          style={{
            width: '100%',
            borderColor: Colors.black,
            padding: 10,
            paddingTop: 0,
            flexDirection: 'row',
          }}>
          <Icon
            type={Icons.Entypo}
            name={'share'}
            color={Colors.white}
            size={17}
          />
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              color: Colors.white,
              marginLeft: 10,
            }}>
            Share
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            Notify('Creating Link', 'Please wait', 'warn');
            buildLink(item.id, item.name, item.price, item.link1).then(m => {
              Notify(
                'Copied To Clipboard',
                'This item link has been copied to your clipboard',
                'success',
              );
              Clipboard.setString(m);
            });
          }}
          style={{
            width: '100%',
            borderColor: Colors.white,
            padding: 10,
            flexDirection: 'row',
          }}>
          <Icon
            type={Icons.MaterialIcons}
            name={'content-copy'}
            color={Colors.white}
            size={17}
          />
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              color: Colors.white,
              marginLeft: 10,
            }}>
            Copy Link
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const sheetRef = useRef(null);

  return (
    <View style={{flex: 1, backgroundColor: Colors.bag1Bg}}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.screenSquare}>
          <View
            style={{
              width: 40,
              flexDirection: 'row',
              position: 'absolute',
              top: 0,
              left: 0,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 15,
              marginTop: STATUSBAR_HEIGHT1,
              borderRadius: 360,
              zIndex: 3,
            }}>
            <TouchableOpacity
              delayPressIn={0}
              style={{
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={goBackk}>
              <Icon
                type={Icons.Ionicons}
                name={'chevron-back'}
                color={Colors.white}
                size={27}
              />
            </TouchableOpacity>
          </View>
          {/*Shoe Name */}

          <View
            style={{
              width: width - 110,
              flexDirection: 'row',
              position: 'absolute',
              top: 0,
              left: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 15,
              marginTop: STATUSBAR_HEIGHT1,
              borderRadius: 360,
              zIndex: 3,
              paddingHorizontal: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 23,
                color: Colors.white,
              }}
              numberOfLines={1}>
              {item.name}
            </Text>
          </View>

          {/*Favorites Icon */}

          <View
            style={{
              width: 40,
              flexDirection: 'row',
              position: 'absolute',
              top: 0,
              right: 0,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 15,
              marginTop: STATUSBAR_HEIGHT1,
              borderRadius: 360,
              zIndex: 3,
            }}>
            <Pressable
              style={({pressed}) => [{opacity: pressed ? 0.2 : 1}]}
              onPress={favv}>
              <Icon
                type={Icons.AntDesign}
                name={
                  favList.findIndex(u => u.includes(item.id)) > -1
                    ? 'heart'
                    : 'hearto'
                }
                color={Colors.white}
                size={25}
              />
            </Pressable>
          </View>

          {RenderPic()}
          {imgList.length > 1 && (
            <ExpandingDot
              data={imgList}
              expandingDotWidth={30}
              scrollX={scrollX}
              inActiveDotOpacity={0.6}
              activeDotColor={Colors.primary}
              dotStyle={{
                width: 10,
                height: 10,
                backgroundColor: Colors.primary,
                borderRadius: 5,
                marginHorizontal: 5,
              }}
            />
          )}
        </View>
        <View style={{flex: 1}}>
          {/*Sizes Selector */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingHorizontal: 16,
              marginTop: 20,
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: Colors.white,
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 18,
                flex: 1,
              }}>
              Select Size
            </Text>

            <TouchableOpacity
              delayPressIn={0}
              style={{marginLeft: 16}}
              onPress={openbot}>
              <Icon
                type={Icons.Entypo}
                name={'dots-three-horizontal'}
                color={Colors.white}
                size={23}
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', flex: 0, paddingLeft: 16}}>
            <FlatList
              data={Sizes}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderSizes}
              contentContainerStyle={{paddingVertical: 10}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              marginTop: 10,
              marginBottom: 5,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.white,
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 18,
                flex: 1,
              }}>
              Select Design
            </Text>
          </View>
          <View style={{flexDirection: 'row', flex: 1, paddingLeft: 16}}>
            <FlatList
              data={imgList}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderPic}
              contentContainerStyle={{paddingVertical: 10}}
            />
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          width: width,
          paddingHorizontal: 15,
          paddingVertical: Platform.OS === 'ios' ? 30 : 15,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {item.price.includes(',') ? (
          <Text
            style={{
              color: Colors.primary,
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 20,
            }}>
            ₦{item.price}
          </Text>
        ) : item.price.length <= 4 ? (
          <Text
            style={{
              color: Colors.primary,
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 20,
            }}>
            ₦{item.price}
          </Text>
        ) : (
          <Text
            style={{
              color: Colors.primary,
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 20,
            }}>
            ₦{item.price.substring(0, 2)},
            {item.price.substring(2, item.price.length)}
          </Text>
        )}

        <View style={{flex: 1, marginLeft: 15}}>
          <TouchableOpacity
            delayPressIn={0}
            disabled={!(item.stock === 'yes')}
            style={{
              backgroundColor:
                cartListR.findIndex(u => u.includes(favorties1[0].id)) !== -1
                  ? Colors.bag1Bg
                  : item.stock === 'yes'
                  ? Colors.primaryDark
                  : Colors.bag1Bg,
              borderRadius: 10,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth:
                cartListR.findIndex(u => u.includes(favorties1[0].id)) !== -1
                  ? 2
                  : item.stock === 'yes'
                  ? 0
                  : 2,
              borderColor:
                cartListR.findIndex(u => u.includes(favorties1[0].id)) !== -1
                  ? Colors.primaryDark
                  : Colors.red,
            }}
            onPress={cartfun}>
            <Text
              style={{
                color: Colors.white,
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 20,
              }}>
              {cartListR.findIndex(u => u.includes(favorties1[0].id)) > -1
                ? 'Proceed To Cart'
                : item.stock === 'yes'
                ? 'Add To Cart'
                : 'Out Of Stock'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <DropdownAlert
        zIndex={1000}
        closeInterval={200}
        updateStatusBar={false}
        defaultContainer={{
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 12,
          margin: 10,
          marginTop: 20,
          borderRadius: 15,
        }}
        messageStyle={{fontFamily: 'Gilroy-Regular', color: 'white'}}
        titleStyle={{fontFamily: 'Gilroy-SemiBold', color: 'white'}}
        imageStyle={{height: 25, width: 25, alignSelf: 'center'}}
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={[120, 0]}
        borderRadius={20}
        renderContent={renderContent}
        initialSnap={1}
      />
      <Modal
        onBackButtonPress={closemodal}
        statusBarTranslucent={true}
        visible={modalVisible}
        coverScreen={true}
        animationType={'slide'}
        onRequestClose={closemodal}
        propagateSwipe={false}
        style={{
          backgroundColor: Colors.bag1Bg,
          justifyContent: 'center',
          flex: 1,
          margin: 0,
        }}>
        <View
          style={{
            width: 40,
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            right: 0,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 15,
            marginTop: STATUSBAR_HEIGHT1,
            borderRadius: 360,
            zIndex: 3,
          }}>
          <TouchableOpacity
            delayPressIn={0}
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={closemodal}>
            <Icon
              type={Icons.AntDesign}
              name={'close'}
              color={Colors.white}
              size={27}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: width,
            width: width,
            zIndex: 67,
          }}>
          {RenderPic2()}
          {imgList.length > 1 && (
            <ExpandingDot
              data={imgList}
              expandingDotWidth={30}
              scrollX={scrollY}
              inActiveDotOpacity={0.6}
              activeDotColor={Colors.primary}
              dotStyle={{
                width: 10,
                height: 10,
                backgroundColor: Colors.primary,
                borderRadius: 5,
                marginHorizontal: 5,
              }}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screenSquare: {
    height: width,
    width: width,
    marginRight: 1,
  },
  dotActive: {
    color: Colors.primaryDark,
    marginRight: 5,
    fontSize: 20,
  },
  dot: {
    color: Colors.bag2Bg,
    marginRight: 5,
    fontSize: 20,
  },
});

export default Details;
