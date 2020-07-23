import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  FlatList,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constants/Colors';
import Icon, {Icons} from '../components/Icons';
import img from '../assets/img/nodelivery.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {put_cartlist, put_subprice} from '../redux/actions/headeraction';
import {getData as getDataM} from '../constants';
import {DBRevCart} from '../constants/Functions';

let state, name, phonenumber, address;

const width = Dimensions.get('window').width;
const mwidth = (width * 40) / 100;

const CartScreen = () => {
  var i = 0;
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const cartList = useSelector(state => state.cartList);
  const [cartListm, setCartListm] = useState(null);
  const subprice = useSelector(state => state.subprice);
  const delivery = useSelector(state => state.delivery);
  const [price, setPrice] = useState(parseInt(subprice) + parseInt(delivery));
  // const [counter, setCounter] = useState([]);

  const Emptylist = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          paddingBottom: 60,
        }}>
        {cartListm === null ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <>
            <Image source={img} style={{width: 200, height: 200}} />
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                color: Colors.white,
                fontSize: 16,
                marginTop: 20,
              }}>
              There Are No Items In Your Cart
            </Text>
          </>
        )}
      </View>
    );
  };
  const getFav = async () => {
    const mainList = await getDataM('map');
    if (cartList !== null && cartList.length > 0) {
      let cartListm1 = [];
      cartList.forEach(data6 => {
        mainList.map((data1, index) => {
          if (Platform.OS === 'ios') {
            if (data1.id === cartList[i].substring(16, cartList[i].length)) {
              mainList[index].selsize = cartList[i].substring(1, 3);
              if (cartList[i].substring(0, 1) === '0') {
                mainList[index].selimg = mainList[index].link1;
              } else if (cartList[i].substring(0, 1) === '1') {
                mainList[index].selimg = mainList[index].link2;
              } else if (cartList[i].substring(0, 1) === '2') {
                mainList[index].selimg = mainList[index].link3;
              } else if (cartList[i].substring(0, 1) === '3') {
                mainList[index].selimg = mainList[index].link4;
              } else if (cartList[i].substring(0, 1) === '4') {
                mainList[index].selimg = mainList[index].link5;
              }
              cartListm1.push(mainList[index]);
            }
          } else {
            if (data1.id === cartList[i].substring(16, cartList[i].length)) {
              mainList[index].selsize = cartList[i].substring(1, 3);

              if (cartList[i].substring(0, 1) === '0') {
                mainList[index].selimg = mainList[index].link1;
              } else if (cartList[i].substring(0, 1) === '1') {
                mainList[index].selimg = mainList[index].link2;
              } else if (cartList[i].substring(0, 1) === '2') {
                mainList[index].selimg = mainList[index].link3;
              } else if (cartList[i].substring(0, 1) === '3') {
                mainList[index].selimg = mainList[index].link4;
              } else if (cartList[i].substring(0, 1) === '4') {
                mainList[index].selimg = mainList[index].link5;
              }
              cartListm1.push(mainList[index]);
            }
          }
        });
        i++;
      });

      cartListm1.reverse();
      getData();
      setCartListm(cartListm1);
    } else {
      setCartListm([]);
    }
  };
  useEffect(() => {
    getFav();
  }, [cartList]);

  const saveprice = async num => {
    dispatch(put_subprice(num));
    setPrice(num + parseInt(delivery));
    try {
      await AsyncStorage.setItem('subprice', num.toString(10));
    } catch (e) {}
  };

  const remCart = ({item, price}) => {
    storeData(
      JSON.stringify(
        cartList.filter(main => main.substring(16, main.length) !== item),
      ),
      'cart',
    );
    dispatch(
      put_cartlist(
        cartList.filter(main => main.substring(16, main.length) !== item),
      ),
    );

    saveprice(subprice - parseInt(price.replace(',', '')));
    DBRevCart(
      ...cartList.filter(main => main.substring(16, main.length) == item),
    );
  };

  const renderCart = item => {
    // const decreaseFun = () => {
    //   const num = counter.slice(item.index, item.index + 1);
    //   const newmap = [...counter];
    //   newmap.splice(item.index, 1, num[0] - 1 < 1 ? 1 : num[0] - 1);
    //   setCounter(newmap);
    //   storeData(JSON.stringify(newmap), 'counterlist');
    //   saveprice(subprice - parseInt(item.item.price.replace(',', '')));
    // };

    // const increaseFun = () => {
    //   const num = counter.slice(item.index, item.index + 1);
    //   const newmap = [...counter];
    //   newmap.splice(item.index, 1, num[0] + 1);
    //   setCounter(newmap);
    //   storeData(JSON.stringify(newmap), 'counterlist');
    //   saveprice(subprice + parseInt(item.item.price.replace(',', '')));
    // };
    return (
      <View style={{width: '100%'}}>
        <TouchableOpacity
          delayPressIn={0}
          style={{width: '100%'}}
          onPress={() => {
            navigation.navigate('Details', {
              item: item.item,
              index: item.index,
            });
          }}>
          <View style={{flexDirection: 'row', marginBottom: 15, width: '100%'}}>
            <View style={{width: mwidth, height: mwidth}}>
              <Image
                source={{uri: item.item.selimg}}
                style={{width: '100%', height: '100%', borderRadius: 15}}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 9,
                  right: 0,
                  height: 30,
                  width: 30,
                  zIndex: 2,
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: 22,
                    width: 22,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: 5,
                  }}
                />
                <TouchableOpacity
                  onPress={() =>
                    remCart({item: item.item.id, price: item.item.price})
                  }>
                  <Icon
                    type={Icons.AntDesign}
                    name={'close'}
                    color={Colors.white}
                    size={20}
                    style={{marginTop: 1, marginLeft: 1}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                //width: '100%',
                paddingLeft: 10,
                paddingTop: 10,
                paddingVertical: 20,
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: 'Gilroy-SemiBold',
                    fontSize: 17,
                    color: Colors.white,
                  }}>
                  {item.item.name}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 15,
                  color: Colors.textGrey,
                  flex: 1,

                  textAlignVertical: 'center',
                }}>
                Size {item.item.selsize}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <View>
                  {item.item.price.includes(',') ? (
                    <Text
                      style={{
                        color: Colors.white,
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 18,
                      }}>
                      ₦ {item.item.price}
                    </Text>
                  ) : item.item.price.length <= 4 ? (
                    <Text
                      style={{
                        color: Colors.white,
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 18,
                      }}>
                      ₦ {item.item.price}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: Colors.white,
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 18,
                      }}>
                      ₦ {item.item.price.substring(0, 2)},
                      {item.item.price.substring(2, item.item.price.length)}
                    </Text>
                  )}
                </View>
                {/* <View
                  style={{
                    // alignSelf: 'flex-end',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    //flex: 1,
                    alignItems: 'flex-end',
                    //width: '100%',
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                  }}>
                  {counter.length === 0 ? null : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: Colors.white,
                        paddingLeft: 10,
                      }}>
                      <TouchableOpacity
                        onPress={decreaseFun}
                        style={{
                          backgroundColor: Colors.primaryDark,
                          borderRadius: 360,
                          width: 17,
                          height: 17,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontFamily: 'Gilroy-SemiBold',
                            fontSize: 14,
                            textAlignVertical: 'center',
                          }}>
                          -
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: Colors.white,
                          fontFamily: 'Gilroy-SemiBold',
                          fontSize: 17,
                          marginHorizontal: 12,
                          fontWeight: 'bold',
                        }}>
                        {counter.slice(item.index, item.index + 1)}
                      </Text>
                      <TouchableOpacity
                        onPress={increaseFun}
                        style={{
                          backgroundColor: Colors.primaryDark,
                          borderRadius: 360,
                          width: 17,
                          height: 17,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontFamily: 'Gilroy-SemiBold',
                            fontSize: 14,
                            textAlignVertical: 'center',
                          }}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    const backAction2 = () => {
      navigation.goBack();
      return true;
    };

    const backHandler2 = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction2,
    );

    return () => backHandler2.remove();
  }, []);

  const openbot = () => {
    navigation.navigate('Checkout', {
      address: address,
      name: name,
      phonenumber: phonenumber,
      subprice: subprice,
      delivery: delivery,
      price: price,
      state: state,
      cartList: cartList,
      uri: cartListm[0].selimg,
    });
  };

  const storeData = async (data, key) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (e) {}
  };

  const getData = async () => {
    try {
      address = await AsyncStorage.getItem('address');
      phonenumber = await AsyncStorage.getItem('phoneNumber');
      name = await AsyncStorage.getItem('name');
      state = await AsyncStorage.getItem('state');
      // if (counterlist1 === null && cartListm !== null) {
      //   var i = 0;
      //   while (i < cartListm.length) {
      //     counterlist.push(1);
      //     i++;
      //   }
      //   setCounter(counterlist);
      //   storeData(JSON.stringify(counterlist), 'counterlist');
      // } else {
      //   if (cartListm.length > JSON.parse(counterlist1).length) {
      //     var i = 0;
      //     counterlist = [...JSON.parse(counterlist1)];
      //     while (i < cartListm.length - JSON.parse(counterlist1).length) {
      //       counterlist.unshift(1);
      //       i++;
      //     }

      //     setCounter(counterlist);
      //     storeData(JSON.stringify(counterlist), 'counterlist');
      //   } else {
      //     setCounter(JSON.parse(counterlist1));
      //   }
      // }
      // return counterlist1;
    } catch (e) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingBottom: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
          }}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={() => navigation.goBack()}>
            <Icon
              type={Icons.Ionicons}
              name={'chevron-back'}
              color={Colors.primary}
              size={27}
            />
          </TouchableOpacity>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily: 'Versatylo Rounded',
                fontSize: 23,
                color: Colors.primary,
                fontWeight: 'normal',
              }}>
              <Text
                style={{
                  fontSize: 26,
                  fontFamily: 'LubalinGraphStd-Demi',
                }}>
                C
              </Text>
              art
            </Text>
          </View>
          <TouchableOpacity
            delayPressIn={0}
            onPress={() => navigation.navigate('OrderHistory')}>
            <Icon
              type={Icons.Octicons}
              name={'history'}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          <FlatList
            data={cartListm}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => ` ${item} ${index.toString()}`}
            renderItem={renderCart}
            ListEmptyComponent={Emptylist}
            style={{flex: 1}}
            contentContainerStyle={{
              flex: cartListm !== null && cartListm.length > 0 ? 0 : 1,
            }}
          />
        </View>
        {cartListm !== null && cartListm.length > 0 && (
          <>
            <View style={{flex: 1, width: '100%'}}>
              <View
                style={{
                  width: '100%',
                  marginVertical: 15,
                  backgroundColor: Colors.bag2Bg,
                  height: 65,
                  borderRadius: 10,
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  alignItems: 'center',
                }}>
                <TextInput
                  placeholder="Coupon Code"
                  placeholderTextColor={Colors.textGrey}
                  style={{flex: 1, fontFamily: 'Gilroy-SemiBold', fontSize: 15}}
                />
                <View
                  style={{
                    width: 90,
                    height: 40,
                    borderRadius: 10,
                  }}>
                  <TouchableOpacity
                    delayPressIn={0}
                    style={{
                      width: 90,
                      height: 40,
                      backgroundColor: Colors.primaryDark,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 15,
                        color: Colors.white,
                      }}>
                      Apply
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', width: '100%', marginBottom: 5}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: 17,
                      color: Colors.textGrey,
                    }}>
                    SubTotal
                  </Text>
                </View>
                <View>
                  {subprice.toString(10).length <= 4 ? (
                    <Text
                      style={{
                        color: Colors.textGrey,
                        fontFamily: 'Gilroy-SemiBold',
                      }}>
                      ₦ {subprice.toString(10)}
                    </Text>
                  ) : subprice.toString(10).length >= 6 ? (
                    <Text
                      style={{
                        color: Colors.textGrey,
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 17,
                      }}>
                      ₦ {subprice.toString(10).substring(0, 3)},
                      {subprice
                        .toString(10)
                        .substring(3, subprice.toString(10).length)}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: Colors.textGrey,
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 17,
                      }}>
                      ₦ {subprice.toString(10).substring(0, 2)},
                      {subprice
                        .toString(10)
                        .substring(2, subprice.toString(10).length)}
                    </Text>
                  )}
                </View>
              </View>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: 17,
                      color: Colors.textGrey,
                      flex: 0,
                    }}>
                    Delivery Fee
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: 17,
                      color: Colors.textGrey,
                    }}>
                    ₦ {delivery}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: 20,
                  alignItems: 'center',
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: 18,
                      color: Colors.white,
                    }}>
                    Total
                  </Text>
                </View>
                <View>
                  {price.toString(10).length <= 4 ? (
                    <Text
                      style={{
                        color: Colors.white,
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 22,
                      }}>
                      ₦ {price.toString(10)}
                    </Text>
                  ) : price.toString(10).length >= 6 ? (
                    <Text
                      style={{
                        color: Colors.white,
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 22,
                      }}>
                      ₦ {price.toString(10).substring(0, 3)},
                      {price
                        .toString(10)
                        .substring(3, price.toString(10).length)}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: Colors.white,
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 22,
                      }}>
                      ₦ {price.toString(10).substring(0, 2)},
                      {price
                        .toString(10)
                        .substring(2, price.toString(10).length)}
                    </Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  alignItems: 'flex-end',
                  flex: 1,
                }}>
                <View
                  style={{
                    height: 55,
                    width: '100%',
                    borderRadius: 360,
                    marginTop: 15,
                  }}>
                  <TouchableOpacity
                    delayPressIn={0}
                    style={{
                      width: '100%',
                      backgroundColor: Colors.primaryDark,
                      height: 55,
                      borderRadius: 360,
                      flexDirection: 'row',
                      paddingHorizontal: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={openbot}>
                    <Text style={styles.text}>Proceed To Checkout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bag1Bg,
  },
  text: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 15,
    color: Colors.white,
  },
});

export default CartScreen;
