import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  SafeAreaView,
  Modal,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors';
import {PayWithFlutterwave} from 'flutterwave-react-native';
import {FLW_API} from '@env';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  AddOrder,
  deLCart,
  deleteData,
  numberWithCommas,
  storeData,
} from '../constants/Functions';
import DropdownAlert from 'react-native-dropdownalert';
import check from '../assets/img/check.png';
import {useDispatch} from 'react-redux';
import {put_cartlist, put_subprice} from '../redux/actions/headeraction';

const CheckoutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    name,
    address,
    phonenumber,
    subprice,
    delivery,
    price,
    state,
    cartList,
    uri,
  } = route.params;
  const textinputref = useRef(null);
  const [email, setEmail] = useState(' ');
  const [open, setOpen] = useState(false);
  const [tx, setTx] = useState('');
  const [mainid, setMainid] = useState('');
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        textinputref.current.blur();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  const handleOnRedirect = async data => {
    if (data.status === 'cancelled') {
      Notify('Failed', 'The transaction was not successful', 'error');
    } else if (data.status === 'successful') {
      confirmTransaction(data.transaction_id);
    }
  };
  const dispatch = useDispatch();

  const confirmTransaction = id => {
    const data = {
      tx_ref: mainid,
      name: name,
      phonenumber: phonenumber,
      state: state,
      address: address,
      subprice: subprice,
      delivery: delivery,
      price: price,
      orderID: orderID,
      cartList: cartList,
      mainid: id,
      uri: uri,
      status: 'Pending',
    };
    AddOrder(data);
    deleteAll();
    setOpen(true);
  };
  const [orderID, setOrderID] = useState('');
  useEffect(() => {
    setOrderID('#KCS-' + generateOrderID(6));

    generateTransactionRef(20);
  }, []);

  const onInitializeError = data => {
    Notify('Error', data.message, 'error');
    generateTransactionRef(20);
  };

  const onAbort = () => {
    Notify('Failed', 'The transaction was not successful', 'error');
    generateTransactionRef(20);
  };

  const onDidInitialize = data => {
    setMainid(tx);
  };
  const onWillInitialize = () => {
    generateTransactionRef(20);
    if (email) {
    } else if (email.length < 1) {
      setEmail(true);
    }
  };

  const deleteAll = () => {
    deLCart();
    deleteData('cart');
    storeData('subprice', '0');
    dispatch(put_cartlist([]));
    dispatch(put_subprice(parseInt(0)));
  };

  const destory = () => {
    setOpen(false);
    navigation.navigate('Tab');
  };

  const generateTransactionRef = length => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setTx(`flw_tx_ref_${result}`);
  };
  let dropDownAlertRef = useRef();

  const Notify = (title, message, type) => {
    dropDownAlertRef.alertWithType(type, title, message);
  };

  const generateOrderID = length => {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 17,
              color: Colors.white,
              fontWeight: 'bold',
            }}>
            Order Summary
          </Text>
          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 20,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 15,
                color: Colors.textGrey,
                flex: 1,
              }}>
              Order ID:
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 14,
                color: Colors.white,
              }}>
              {orderID}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: Colors.bag1Bg,
              height: 150,
              width: '100%',
              alignSelf: 'center',
              borderRadius: 15,
              marginVertical: 10,
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 12,
                color: Colors.textGrey,
              }}>
              Delivery Details
            </Text>

            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 17,
                color: Colors.white,

                lineHeight: 25,
              }}>
              {address}
            </Text>
            <View
              style={{
                paddingTop: 5,
                justifyContent: 'flex-end',
                flex: 1,
                paddingBottom: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 14,
                  color: Colors.white,
                  marginTop: 3,
                  alignSelf: 'flex-end',
                }}>
                {name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 14,
                  color: Colors.white,
                  marginTop: 3,
                  alignSelf: 'flex-end',
                }}>
                {phonenumber}
              </Text>
            </View>
            <View style={{alignSelf: 'flex-end'}} />
          </View>

          <View
            style={{
              alignSelf: 'flex-end',
              flexDirection: 'row',
              marginTop: 25,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 15,
                color: Colors.textGrey,
                flex: 1,
              }}>
              SubTotal:
            </Text>

            <Text
              style={{
                color: Colors.white,
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 15,
              }}>
              ₦ {numberWithCommas(subprice)}
            </Text>
          </View>

          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 15,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 15,
                color: Colors.textGrey,
                flex: 1,
              }}>
              Delivery Fee:
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 14,
                color: Colors.white,
              }}>
              ₦ {delivery}
            </Text>
          </View>

          <View
            style={{
              alignSelf: 'flex-end',
              flexDirection: 'row',
              marginVertical: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 15,
                color: Colors.textGrey,
                flex: 1,
              }}>
              Total:
            </Text>

            <Text
              style={{
                color: Colors.white,
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 15,
              }}>
              ₦ {numberWithCommas(price)}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 12,
              color: Colors.textGrey,
              marginTop: 15,
            }}>
            Input Email Addresss To Recieve Payment Receipt
          </Text>
          <View
            style={{
              backgroundColor: Colors.bag1Bg,
              height: 50,
              width: '100%',
              alignSelf: 'center',
              borderRadius: 15,
              marginTop: 10,
              padding: 3,
              paddingHorizontal: 12,
              borderColor: 'red',
              borderWidth: email === true ? 1 : 0,
            }}>
            <TextInput
              ref={textinputref}
              placeholder="Email"
              placeholderTextColor={Colors.darkGray}
              keyboardType={'email-address'}
              value={email}
              onChangeText={setEmail}
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 13,
                flex: 1,
                color: Colors.white,
              }}
            />
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
            <PayWithFlutterwave
              onRedirect={handleOnRedirect}
              onAbort={onAbort}
              onInitializeError={onInitializeError}
              onDidInitialize={onDidInitialize}
              onWillInitialize={onWillInitialize}
              options={{
                tx_ref: tx,
                authorization: FLW_API,
                customer: {
                  email: email.trim(),
                  phonenumber: phonenumber,
                  name: name,
                },
                amount: price,
                currency: 'NGN',
                payment_options: 'card',
              }}
            />
          </View>
        </View>
      </View>
      <Modal
        visible={open}
        animationType="slide"
        transparent={true}
        onRequestClose={destory}>
        <Pressable
          onPress={destory}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={styles.modalview}>
            <Image source={check} style={{height: 55, width: 55}} />
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 15,
                color: Colors.white,
                marginTop: 15,
              }}>
              Order Successfully Placed
            </Text>
            <Text style={styles.textordersuc}>
              Your order was successfully placed. To track order progress view
              Order History under Profile
            </Text>
          </View>
        </Pressable>
      </Modal>
      <DropdownAlert
        zIndex={1000}
        updateStatusBar={false}
        defaultContainer={styles.alertdefault}
        messageStyle={{fontFamily: 'Gilroy-Regular', color: 'white'}}
        titleStyle={{fontFamily: 'Gilroy-SemiBold', color: 'white'}}
        imageStyle={{height: 25, width: 25, alignSelf: 'center'}}
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bag4Bg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    flex: 1,
    paddingHorizontal: 16,
  },
  alertdefault: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    borderRadius: 15,
  },
  textordersuc: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 13,
    color: Colors.textGrey,
    marginTop: 15,
    textAlign: 'center',
  },
  modalview: {
    backgroundColor: Colors.bag2Bg,
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    width: '85%',
    borderRadius: 10,
    padding: 16,
  },
});
