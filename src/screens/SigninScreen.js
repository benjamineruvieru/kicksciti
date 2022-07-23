import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon, {Icons} from '../components/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import Phonepad from '../components/Phonepad';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {nigeriaStates as ngState, Colors} from '../constants';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  put_phonenumber,
  put_name,
  put_cartlist,
  put_subprice,
  put_login,
  put_gender,
  put_delivery,
  add_favorties,
} from '../redux/actions/headeraction';

const width = Dimensions.get('window').width;

const SigninScreen = () => {
  const [nigeriaStates, setNigeriaStates] = useState(ngState);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [user, setUser] = useState();
  const [storefire, setStorefire] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [value, setValue] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const navigation = useNavigation();
  const [phonenum, setPhonenum] = useState('+234 ');
  const [login, setLogin] = useState(false);
  const [otptext, setOtptext] = useState('');
  const [sendingotp, setSendingotp] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      Clipboard.getString().then(clipboarddata => {
        if (clipboarddata === copiedText) {
        } else {
          if (clipboarddata.length === 6 && sendingotp) {
            setCode(() => null);
            confirmCode(clipboarddata.trim());
          }
          setCopiedText(clipboarddata);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [copiedText, sendingotp, confirm]);
  const dispatch = useDispatch();
  const cartList = useSelector(state => state.cartList);
  const favList = useSelector(state => state.favList);
  const subprice = useSelector(state => state.subprice);

  useEffect(() => {
    const backAction1 = () => {
      navigation.navigate('Tab', {screen: 'Shop'});
      return true;
    };

    const backHandler1 = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction1,
    );

    return () => backHandler1.remove();
  }, [navigation]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  function onAuthStateChanged(theuser) {
    setUser(theuser);
  }

  async function signInWithPhoneNumber(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      setSendingotp(true);
    } catch (error) {
      setSendingotp(false);
      Alert.alert(error.message);
    }
  }

  async function confirmCode(code_res) {
    try {
      const response = await confirm.confirm(code_res);
      if (response) {
        if (response.additionalUserInfo.isNewUser === false) {
          getuserinfo(response.user.uid);
        } else {
          if (login) {
            setLogin(prev => !prev);
          }
          setCode(true);
        }
      }
    } catch (error) {
      setCode(false);
    }
  }

  const storeData = async (data, key) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (e) {}
  };

  const switchLogin = () => {
    setPhonenum('+234 ');
    setCode('');
    setConfirm(false);
    setSendingotp(false);
    setLogin(!login);
  };

  const confirmtext = () => {
    if (name.length < 1) {
      setName(false);
    }
    if (address.length < 1) {
      setAddress(false);
    }
    if (value === null) {
      setValue(false);
    }
    if (value2 === null) {
      setValue2(false);
    }
    if (
      value2 !== null &&
      value !== null &&
      address.length > 1 &&
      name.length > 1
    ) {
      finishsignup();
    }
  };

  async function getuserinfo(uid) {
    try {
      const user = await firestore().collection('Users').doc(uid).get();
      storeData(user._data.uid, 'uid');
      storeData(user._data.phoneNumber, 'phoneNumber');
      storeData(user._data.name, 'name');
      storeData(user._data.address, 'address');
      storeData(user._data.state, 'state');
      storeData(user._data.gender, 'gender');
      storeData(JSON.stringify(user._data.favorites), 'favorites');
      storeData(JSON.stringify(user._data.cart), 'cart');
      storeData(user._data.subprice.toString(10), 'subprice');
      dispatch(put_gender(user._data.gender));

      dispatch(put_subprice(user._data.subprice));
      dispatch(add_favorties(user._data.favorites));
      dispatch(put_cartlist(user._data.cart));
      dispatch(put_name(user._data.name));
      dispatch(put_phonenumber(user._data.phoneNumber));
      storeData('stored', 'userdetails');
      if (user._data.state === 'Lagos') {
        storeData('2000', 'delivery');
        dispatch(put_delivery(2000));
      } else {
        storeData('2500', 'delivery');
        dispatch(put_delivery(2500));
      }
      dispatch(put_login(false));
      navigation.navigate('Tab', {screen: 'Profile'});
    } catch (error) {
      setLogin(false);
      setCode(true);
    }
  }

  const finishsignup = () => {
    setStorefire(true);
    try {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .set({
          name: name,
          phoneNumber: user.phoneNumber,
          uid: user.uid,
          address: address,
          state: value,
          favorites: favList,
          cart: cartList,
          gender: value2,
          subprice: subprice,
        })
        .then(() => {
          storeData(user.uid, 'uid');
          storeData(user.phoneNumber, 'phoneNumber');
          storeData(name, 'name');
          storeData(address, 'address');
          storeData(value, 'state');
          storeData(value2, 'gender');
          dispatch(put_gender(value2));

          dispatch(put_name(name));
          dispatch(put_phonenumber(user.phoneNumber));
          dispatch(put_login(false));

          storeData('stored', 'userdetails');
          if (value === 'Lagos') {
            storeData('2000', 'delivery');
            dispatch(put_delivery(2000));
          } else {
            storeData('2500', 'delivery');
            dispatch(put_delivery(2500));
          }
          navigation.navigate('Tab', {screen: 'Profile'});
        });
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  const typeFun = num => {
    if (phonenum.length === 5 && num === 0) {
    } else if (phonenum.length === 17) {
    } else if (phonenum.length === 9 || phonenum.length === 13) {
      setPhonenum(phonenum + ' ' + num);
    } else {
      setPhonenum(phonenum + num);
      if (phonenum.length === 16) {
        handlesendotp(phonenum.replace(/-/g, '') + num);
      }
    }
  };

  function handlesendotp(phone_num) {
    setSendingotp(true);
    signInWithPhoneNumber(phone_num);
  }

  const clear = () => {
    if (!(phonenum.length < 6)) {
      if (phonenum.substring(phonenum.length - 1, phonenum.length) === ' ') {
        setPhonenum(phonenum.substring(0, phonenum.length - 2));
      } else {
        setPhonenum(phonenum.substring(0, phonenum.length - 1));
      }
    }
  };

  const clearl = () => {
    if (!(phonenum.length < 6)) {
      setPhonenum('+234 ');
    }
  };

  const clearlo = () => {
    if (!(otptext.length < 1)) {
      setOtptext('');
    }
  };

  const clearotp = () => {
    if (!(otptext.length < 1)) {
      setOtptext(otptext.substring(0, otptext.length - 1));
    }
  };

  const typeFunotp = num => {
    if (otptext.length === 6) {
    } else {
      setOtptext(otptext + num);
      if (otptext.length === 5) {
        setCode(null);
        confirmCode(otptext + num);
      }
    }
  };

  const RenderModal = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.bag1Bg,
          flex: 1,
          padding: 20,
        }}>
        {!login ? (
          //Create Account Process
          <View
            style={{
              flex: 1,
              paddingTop: width / 3.2,
            }}>
            <Header text={'Create Account'} />
            {!confirm ? (
              //Input Phone Number In Create Account
              <>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: 30,
                    marginBottom: 30,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: 14,
                      color: Colors.white,
                      opacity: 0.7,
                    }}>
                    {sendingotp ? 'Sending OTP...' : 'Enter Your Phone Number'}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '100%',
                    marginBottom: 20,
                  }}>
                  {sendingotp ? (
                    <ActivityIndicator size="large" color={Colors.primary} />
                  ) : (
                    <Text
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 25,
                        color: Colors.primary,
                        opacity: 0.7,
                        marginBottom: 30,
                      }}>
                      {phonenum +
                        '+234 ---- --- ---'.substring(phonenum.length, 17)}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    flex: 3,
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <Phonepad
                    phoneFun={typeFun}
                    clearFun={clear}
                    clearFunl={clearl}
                  />
                </View>
              </>
            ) : code === true ? (
              <>
                <View
                  style={{
                    flex: 20,
                  }}>
                  <View
                    style={{
                      flex: 3,
                      marginTop: 20,
                      justifyContent: 'space-around',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'space-around',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-SemiBold',
                          color: name === false ? Colors.red : Colors.white,
                        }}>
                        {name === false ? 'Please Enter Name' : 'Enter Name'}
                      </Text>
                      <View
                        style={{
                          backgroundColor: Colors.bag2Bg,
                          width: '100%',
                          height: 50,
                          borderRadius: 10,
                          paddingHorizontal: 15,
                        }}>
                        <TextInput
                          placeholder="Full Name"
                          placeholderTextColor={Colors.textGrey}
                          style={{
                            flex: 1,
                            fontFamily: 'Gilroy-SemiBold',
                            color: Colors.white,
                          }}
                          value={name}
                          onChangeText={setName}
                          ref={nameRef}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'space-around',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-SemiBold',
                          color: address === false ? Colors.red : Colors.white,
                          marginTop: 10,
                        }}>
                        {address === false
                          ? 'Please Enter Address'
                          : 'Enter Address'}
                      </Text>

                      <View
                        style={{
                          backgroundColor: Colors.bag2Bg,
                          width: '100%',
                          height: 50,
                          borderRadius: 10,
                          paddingHorizontal: 15,
                        }}>
                        <TextInput
                          placeholder="Delivery Address"
                          placeholderTextColor={Colors.textGrey}
                          style={{
                            flex: 1,
                            fontFamily: 'Gilroy-SemiBold',
                            color: Colors.white,
                          }}
                          value={address}
                          onChangeText={setAddress}
                          ref={addressRef}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'space-around',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-SemiBold',
                          color: value === false ? Colors.red : Colors.white,
                          marginTop: 10,
                        }}>
                        Select State
                      </Text>
                      <DropDownPicker
                        setListMode={'MODAL'}
                        open={open}
                        value={value}
                        items={nigeriaStates}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setNigeriaStates}
                        autoScroll={true}
                        listMode={'MODAL'}
                        placeholder="Select State"
                        placeholderStyle={{color: Colors.textGrey}}
                        style={{backgroundColor: Colors.bag2Bg}}
                        textStyle={{
                          fontFamily: 'Gilroy-SemiBold',
                          color: Colors.white,
                        }}
                        modalProps={{
                          animationType: 'slide',
                        }}
                        modalTitle="State"
                        modalContentContainerStyle={{
                          backgroundColor: Colors.bag1Bg,
                        }}
                      />
                    </View>

                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'space-around',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-SemiBold',
                          color: value2 === false ? Colors.red : Colors.white,
                          marginTop: 10,
                        }}>
                        Select Gender
                      </Text>
                      <DropDownPicker
                        listMode={'MODAL'}
                        open={open2}
                        value={value2}
                        items={gender}
                        setOpen={setOpen2}
                        setValue={setValue2}
                        setItems={setGender}
                        autoScroll={true}
                        placeholder="Gender"
                        placeholderStyle={{color: Colors.textGrey}}
                        style={{backgroundColor: Colors.bag2Bg}}
                        textStyle={{
                          fontFamily: 'Gilroy-SemiBold',
                          color: Colors.white,
                        }}
                        modalProps={{
                          animationType: 'slide',
                        }}
                        modalTitle="Gender"
                        modalContentContainerStyle={{
                          backgroundColor: Colors.bag1Bg,
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <View>
                      <TouchableOpacity
                        delayPressIn={0}
                        onPress={confirmtext}
                        style={{
                          width: '100%',
                          backgroundColor: Colors.primaryDark,
                          height: 55,
                          borderRadius: 360,
                          flexDirection: 'row',
                          paddingHorizontal: 15,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {storefire ? (
                          <ActivityIndicator
                            size="small"
                            color={Colors.white}
                          />
                        ) : (
                          <Text
                            style={{
                              fontFamily: 'Gilroy-SemiBold',
                              color: Colors.white,
                            }}>
                            Sign Up
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={{flex: 6}}>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      marginTop: 30,
                      marginBottom: 30,
                      //flex: 1,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 14,
                        color: Colors.white,
                        opacity: 0.7,
                      }}>
                      {code === null
                        ? 'Verifying OTP...'
                        : code === ''
                        ? 'Enter OTP Recieved'
                        : code === true
                        ? 'Phone Number Verified Successfully'
                        : 'Incorrect OTP'}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 10,
                      justifyContent: 'space-around',
                    }}>
                    {code === null ? (
                      <ActivityIndicator size="large" color={Colors.primary} />
                    ) : (
                      <>
                        <View style={styles.optview}>
                          {otptext.length === 0 ? (
                            <Icon
                              type={Icons.FontAwesome}
                              name={'asterisk'}
                              color={Colors.textGrey}
                              size={20}
                            />
                          ) : (
                            <Text style={styles.opttexts}>
                              {otptext.substring(0, 1)}
                            </Text>
                          )}
                        </View>
                        <View style={styles.optview}>
                          {otptext.length < 2 ? (
                            <Icon
                              type={Icons.FontAwesome}
                              name={'asterisk'}
                              color={Colors.textGrey}
                              size={20}
                            />
                          ) : (
                            <Text style={styles.opttexts}>
                              {otptext.substring(1, 2)}
                            </Text>
                          )}
                        </View>
                        <View style={styles.optview}>
                          {otptext.length < 3 ? (
                            <Icon
                              type={Icons.FontAwesome}
                              name={'asterisk'}
                              color={Colors.textGrey}
                              size={20}
                            />
                          ) : (
                            <Text style={styles.opttexts}>
                              {otptext.substring(2, 3)}
                            </Text>
                          )}
                        </View>
                        <View style={styles.optview}>
                          {otptext.length < 4 ? (
                            <Icon
                              type={Icons.FontAwesome}
                              name={'asterisk'}
                              color={Colors.textGrey}
                              size={20}
                            />
                          ) : (
                            <Text style={styles.opttexts}>
                              {otptext.substring(3, 4)}
                            </Text>
                          )}
                        </View>
                        <View style={styles.optview}>
                          {otptext.length < 5 ? (
                            <Icon
                              type={Icons.FontAwesome}
                              name={'asterisk'}
                              color={Colors.textGrey}
                              size={20}
                            />
                          ) : (
                            <Text style={styles.opttexts}>
                              {otptext.substring(4, 5)}
                            </Text>
                          )}
                        </View>

                        <View style={styles.optview}>
                          {otptext.length < 6 ? (
                            <Icon
                              type={Icons.FontAwesome}
                              name={'asterisk'}
                              color={Colors.textGrey}
                              size={20}
                            />
                          ) : (
                            <Text style={styles.opttexts}>
                              {otptext.substring(5, 6)}
                            </Text>
                          )}
                        </View>
                      </>
                    )}
                  </View>
                  <View
                    style={{
                      flex: 6,
                      paddingTop: 30,
                      //paddingBottom: 50
                    }}>
                    <Phonepad
                      phoneFun={typeFunotp}
                      clearFun={clearotp}
                      clearFunl={clearlo}
                    />
                  </View>
                </View>
              </>
            )}

            <View
              style={{
                justifyContent: 'flex-end',
                width: '100%',
                flex: 1,
              }}>
              <TouchableOpacity
                delayPressIn={0}
                onPress={switchLogin}
                style={{
                  width: '100%',
                  //backgroundColor: Colors.primaryDark,
                  // height: 50,
                  borderRadius: 360,
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Gilroy-SemiBold',
                    fontSize: 13,
                    color: Colors.white,
                  }}>
                  Already registered? Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <LoginProcess />
        )}
      </View>
    );
  };

  const extrasty = StyleSheet.create({
    backbutbackground: {
      position: 'absolute',
      height: width,
      width: width,
      backgroundColor: Colors.primaryDark,
      borderRadius: 360,
      left: -(width / 1.5),
      top: -(width / 1.5),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const BackIcon = () => {
    return (
      <TouchableOpacity
        delayPressIn={0}
        onPress={() => navigation.navigate('Tab', {screen: 'Shop'})}
        style={{position: 'absolute', top: width / 16}}>
        <Icon
          type={Icons.Ionicons}
          name={'chevron-back'}
          color={Colors.white}
          size={30}
        />
      </TouchableOpacity>
    );
  };

  const Header = ({text}) => {
    return (
      <>
        <View style={extrasty.backbutbackground} />
        <BackIcon />
        <View>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 25,
              color: Colors.white,
            }}>
            {text}
          </Text>
        </View>
      </>
    );
  };

  const LoginProcess = props => {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: width / 3.2,
        }}>
        <Header text={'Login'} />
        {!confirm ? (
          <>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 30,
                marginBottom: 30,
                //flex: 1,
              }}>
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 14,
                  color: Colors.white,
                  opacity: 0.7,
                }}>
                {sendingotp ? 'Sending OTP...' : 'Enter Your Phone Number'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                marginBottom: 20,
                //  flex: 1,
              }}>
              {sendingotp ? (
                <ActivityIndicator size="large" color={Colors.primary} />
              ) : (
                <Text
                  style={{
                    fontFamily: 'Gilroy-SemiBold',
                    fontSize: 25,
                    color: Colors.primary,
                    opacity: 0.7,
                    marginBottom: 30,
                  }}>
                  {phonenum +
                    '+234 ---- --- ---'.substring(phonenum.length, 17)}
                </Text>
              )}
            </View>
            <View
              style={{
                flex: 3,
                width: '100%',
                justifyContent: 'space-between',
                // marginBottom: 10,
              }}>
              <Phonepad
                phoneFun={typeFun}
                clearFun={clear}
                clearFunl={clearl}
              />
            </View>
          </>
        ) : (
          <>
            <View style={{flex: 6}}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginTop: 30,
                  marginBottom: 30,
                  //flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'Gilroy-SemiBold',
                    fontSize: 14,
                    color: Colors.white,
                    opacity: 0.7,
                  }}>
                  {code === null
                    ? 'Verifying OTP...'
                    : code === ''
                    ? 'Enter OTP Recieved'
                    : code === true
                    ? 'Phone Number Verified Successfully'
                    : 'Incorrect OTP'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  justifyContent: 'space-around',
                }}>
                {code === null ? (
                  <ActivityIndicator size="large" color={Colors.primary} />
                ) : (
                  <>
                    <View style={styles.optview}>
                      {otptext.length === 0 ? (
                        <Icon
                          type={Icons.FontAwesome}
                          name={'asterisk'}
                          color={Colors.textGrey}
                          size={20}
                        />
                      ) : (
                        <Text style={styles.opttexts}>
                          {otptext.substring(0, 1)}
                        </Text>
                      )}
                    </View>
                    <View style={styles.optview}>
                      {otptext.length < 2 ? (
                        <Icon
                          type={Icons.FontAwesome}
                          name={'asterisk'}
                          color={Colors.textGrey}
                          size={20}
                        />
                      ) : (
                        <Text style={styles.opttexts}>
                          {otptext.substring(1, 2)}
                        </Text>
                      )}
                    </View>
                    <View style={styles.optview}>
                      {otptext.length < 3 ? (
                        <Icon
                          type={Icons.FontAwesome}
                          name={'asterisk'}
                          color={Colors.textGrey}
                          size={20}
                        />
                      ) : (
                        <Text style={styles.opttexts}>
                          {otptext.substring(2, 3)}
                        </Text>
                      )}
                    </View>
                    <View style={styles.optview}>
                      {otptext.length < 4 ? (
                        <Icon
                          type={Icons.FontAwesome}
                          name={'asterisk'}
                          color={Colors.textGrey}
                          size={20}
                        />
                      ) : (
                        <Text style={styles.opttexts}>
                          {otptext.substring(3, 4)}
                        </Text>
                      )}
                    </View>
                    <View style={styles.optview}>
                      {otptext.length < 5 ? (
                        <Icon
                          type={Icons.FontAwesome}
                          name={'asterisk'}
                          color={Colors.textGrey}
                          size={20}
                        />
                      ) : (
                        <Text style={styles.opttexts}>
                          {otptext.substring(4, 5)}
                        </Text>
                      )}
                    </View>

                    <View style={styles.optview}>
                      {otptext.length < 6 ? (
                        <Icon
                          type={Icons.FontAwesome}
                          name={'asterisk'}
                          color={Colors.textGrey}
                          size={20}
                        />
                      ) : (
                        <Text style={styles.opttexts}>
                          {otptext.substring(5, 6)}
                        </Text>
                      )}
                    </View>
                  </>
                )}
              </View>
              <View
                style={{
                  flex: 6,
                  justifyContent: 'space-between',

                  paddingTop: 30,
                  //paddingBottom: 50
                }}>
                <Phonepad
                  phoneFun={typeFunotp}
                  clearFun={clearotp}
                  clearFunl={clearlo}
                />
              </View>
            </View>
          </>
        )}

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={switchLogin}
            style={{
              width: '100%',

              borderRadius: 360,
              flexDirection: 'row',
              paddingHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 13,
                color: Colors.white,
              }}>
              New user? Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backfaceVisibility: Colors.bag1Bg,
        flex: 1,
      }}>
      {RenderModal()}
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  keypad: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  keypadnum: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 25,
    color: Colors.white,
  },

  numbview: {
    height: 40,
    width: 25,
    backgroundColor: Colors.bag4Bg,
    borderRadius: 7,
  },

  optview: {
    height: 50,
    width: 50,
    backgroundColor: Colors.bag4Bg,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  opttexts: {
    fontFamily: 'Gilroy-SemiBold',
    color: Colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
});
