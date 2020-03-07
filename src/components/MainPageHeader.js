import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Pressable,
} from 'react-native';
import Colors from '../constants/Colors';
import Icon, {Icons} from '../components/Icons';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackHandler} from 'react-native';
import {Keyboard} from 'react-native';
import LottieView from 'lottie-react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var jsonValue2 = ['Nike'];
var tempList = [];
var jsonValue = [];

const Emptylist = () => {
  return (
    <View style={styles.searchview}>
      <Text
        style={{
          color: Colors.white,
          fontFamily: 'Gilroy-SemiBold',
          marginBottom: 20,
        }}>
        No search items matched
      </Text>
      <LottieView
        source={require('../assets/lottie/tumbleweed-rolling.json')}
        style={{width: 60, height: 60}}
        autoPlay
        loop
      />
    </View>
  );
};
var jsonValue1 = null;

const MainHeader = () => {
  const inputRef = useRef(null);
  const [filtered, setFiltered] = useState(null);
  const [keyword, setKeyword] = useState('');
  const _input_box_translate_x = useRef(null);
  const _header_translate_x = useRef(null);
  const _content_translate_y = useRef(height);
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const cartList = useSelector(state => state.cartList);
  const network = useSelector(state => state.network);

  useEffect(() => {
    const backAction = () => {
      if (!isKeyboardVisible) {
        _onBlur();
        Keyboard.dismiss();
      } else {
        inputRef.current.blur();

        Keyboard.dismiss();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  function renderMainCategories() {
    const renderItem = ({item}) => {
      return (
        <Pressable
          onPress={() => {
            navigation.navigate('Search', {
              item: item,
            });
          }}
          style={({pressed}) => [{opacity: pressed ? 0.2 : 1, flex: 1}]}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              type={Icons.Ionicons}
              name={'search'}
              color={Colors.white}
              size={20}
              style={{alignSelf: 'center'}}
            />

            <Text style={styles.autocomtext}>{item}</Text>

            <Icon
              type={Icons.Feather}
              name={'arrow-up-left'}
              color={Colors.white}
              size={20}
              style={{alignSelf: 'center'}}
            />
          </View>
        </Pressable>
      );
    };

    if (keyword.length > 0) {
      return (
        <View>
          <FlatList
            data={filtered}
            initialNumToRender={6}
            maxToRenderPerBatch={6}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingVertical: 1,
              flex: filtered?.length > 0 ? 0 : 1,
            }}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={Emptylist}
          />
        </View>
      );
    } else {
      return <Emptylist />;
    }
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        inputRef.current.blur();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onSearch = useCallback(() => {
    if (keyword) {
      const temp = keyword.toLowerCase();
      tempList = [];
      jsonValue2.map(data => {
        if (data.toLowerCase().includes(temp)) {
          tempList.push(data);
        } else {
          return;
        }
      });

      setFiltered(tempList);
    }
  }, [keyword]);

  const test = () => {
    if (jsonValue != null) {
      jsonValue1 = JSON.parse(jsonValue);

      jsonValue1.map(userData => {
        if (!jsonValue2.includes(userData.name)) {
          jsonValue2.push(userData.name);
        }
      });
    } else {
      null;
    }
  };

  const getData = async () => {
    try {
      jsonValue = await AsyncStorage.getItem('map');
      return test();
    } catch (e) {}
  };

  const _onFocus = () => {
    getData();

    _input_box_translate_x.current.transitionTo({translateX: width});
    _header_translate_x.current.transitionTo({translateX: width});
    _content_translate_y.current.transitionTo({translateY: height});
  };

  const _onBlur = () => {
    Keyboard.dismiss();
    _input_box_translate_x.current.transitionTo({translateX: 1});
    _header_translate_x.current.transitionTo({translateX: 1});
    _content_translate_y.current.transitionTo({translateY: 1});
  };

  const text = useSelector(state => state.header);

  return (
    <>
      <View style={styles.headSafe}>
        <View style={styles.head}>
          <View style={styles.headinner}>
            {/* Main Animatable View*/}
            <Animatable.View
              ref={_input_box_translate_x}
              useNativeDriver={true}
              duration={200}
              style={styles.inputBox}>
              {/* Back Button */}
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <TouchableOpacity
                  delayPressIn={0}
                  onPress={_onBlur}
                  style={styles.backbutton}
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                  <Icon
                    type={Icons.Entypo}
                    name={'chevron-small-left'}
                    color={Colors.white}
                    size={30}
                  />
                </TouchableOpacity>
              </View>

              {/* Text Input*/}
              <TextInput
                ref={inputRef}
                value={keyword}
                clearButtonMode="while-editing"
                returnKeyType="search"
                placeholder="Search Sneakers"
                placeholderTextColor={Colors.textGrey}
                onChangeText={value => {
                  setKeyword(value);
                  onSearch(value);
                }}
                style={styles.searchinput}
                onSubmitEditing={() => {
                  navigation.navigate('Search', {
                    item: keyword,
                  });
                }}
              />

              {/*Microphone */}
              <View
                style={{
                  right: -5,
                }}>
                <TouchableOpacity
                  delayPressIn={0}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 360,
                    backgroundColor: Colors.bag1Bg,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    if (keyword.length > 0) {
                      navigation.navigate('Search', {
                        item: keyword,
                      });
                      _onBlur();
                    } else {
                    }
                  }}>
                  <Icon
                    type={Icons.FontAwesome}
                    name={'search'}
                    color={Colors.white}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            </Animatable.View>

            <Animatable.View
              ref={_header_translate_x}
              useNativeDriver={true}
              duration={200}
              style={styles.headermove}>
              {/*Search button*/}
              <TouchableOpacity
                disabled={network}
                delayPressIn={0}
                onPress={_onFocus}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                activeOpacity={0.3}>
                <Icon
                  type={Icons.Ionicons}
                  name={'search'}
                  color={Colors.primary}
                />
              </TouchableOpacity>

              {/*Text Kicks Citi*/}
              <View style={styles.textHeaderView}>
                {text.substring(0, 2) === 'no' ? (
                  <Text style={styles.textHeader}>
                    <Text
                      style={{
                        fontSize: 27,
                        fontFamily: 'LubalinGraphStd-Demi',
                      }}>
                      K
                    </Text>
                    icks{' '}
                    <Text
                      style={{
                        fontSize: 27,
                        fontFamily: 'LubalinGraphStd-Demi',
                      }}>
                      C
                    </Text>
                    iti
                  </Text>
                ) : (
                  <Text style={styles.textHeader}>
                    <Text
                      style={{
                        fontSize: 27,
                        fontFamily: 'LubalinGraphStd-Demi',
                      }}>
                      {text.substring(2, 3)}
                    </Text>
                    {text.substring(3, text.length)}
                  </Text>
                )}
              </View>
              {/*Cart*/}
              <View>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: network
                      ? 'transparent'
                      : cartList.length > 0
                      ? Colors.red
                      : 'transparent',
                    position: 'absolute',
                    right: -5,
                    top: -5,
                    zIndex: 1,
                    borderRadius: 360,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      color: Colors.white,
                      fontSize: 9,
                      fontWeight: 'bold',
                    }}>
                    {cartList.length > 0 && !network && cartList.length}
                  </Text>
                </View>
                <TouchableOpacity
                  disabled={network}
                  delayPressIn={0}
                  activeOpacity={0.3}
                  onPress={() => navigation.navigate('Notifications')}>
                  <Icon
                    type={Icons.MaterialIcons}
                    name={'shopping-cart'}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </View>
        </View>
      </View>
      {/*Autocomplete View*/}
      <Animatable.View
        ref={_content_translate_y}
        useNativeDriver={true}
        duration={200}
        style={styles.context}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 60,
          }}>
          {renderMainCategories()}
        </View>
      </Animatable.View>
    </>
  );
};

const styles = StyleSheet.create({
  viewtextInput: {
    backgroundColor: Colors.bag1Bg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  textInput: {
    backgroundColor: Colors.bag2Bg,
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    flex: 1,
    height: 60,

    //alignItems: 'center',
    justifyContent: 'center',
  },

  favBut: {
    backgroundColor: Colors.bag2Bg,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderRadius: 10,
  },

  textHeader: {
    fontFamily: 'Versatylo Rounded',
    fontSize: 25,
    color: Colors.primary,
    fontWeight: 'normal',
  },

  textHeaderView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  inputBox: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    position: 'absolute',
    top: 0,
    left: -Math.abs(width),
    width: width,
    backgroundColor: Colors.bag4Bg,
    paddingHorizontal: 12,
    justifyContent: 'center',
    paddingTop: 12,
    alignContent: 'space-around',
  },

  context: {
    width: width,
    height: height,
    position: 'absolute',
    bottom: height - 35,
    zIndex: 999,
    flex: 1,
    backgroundColor: Colors.bag4Bg,
  },

  headSafe: {
    zIndex: 1000,
    backgroundColor: Colors.bag1Bg,
  },

  head: {
    height: 60,
  },

  headinner: {
    overflow: 'hidden',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  headermove: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  searchview: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 50,
  },
  autocomtext: {
    width: '82%',
    alignSelf: 'center',
    color: Colors.white,
    fontFamily: 'Gilroy-SemiBold',
    paddingHorizontal: 30,
    paddingVertical: 10,
    fontSize: 16,
  },
  backbutton: {
    height: 30,
    width: 30,
    borderRadius: 360,
    backgroundColor: Colors.bag1Bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchinput: {
    flex: 1,
    fontFamily: 'Gilroy-SemiBold',
    paddingHorizontal: 12,
    backgroundColor: Colors.bag1Bg,
    borderRadius: 10,
    marginLeft: 7,
    color: Colors.white,
    height: 50,
  },
});

export default MainHeader;
