import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon, {Icons} from '../components/Icons';
import LottieView from 'lottie-react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  nigeriaStates as ngState,
  Colors,
  storeData,
  getData,
} from '../constants';
import {
  put_cartlist,
  put_login,
  put_subprice,
} from '../redux/actions/headeraction';
import {deleteData} from '../constants/Functions';

const ProfileScreen = () => {
  const navigation = useNavigation();
  let address, state;
  const getAdd = async () => {
    address = await getData('address', false);
    state = await getData('state', false);
  };

  const dispatch = useDispatch();

  const genderR = useSelector(state => state.gender);
  const nameR = useSelector(state => state.name);
  const phonenumR = useSelector(state => state.phonenumber);
  const loggedin = useSelector(state => !state.loggedin);
  useFocusEffect(() => {
    getAdd();

    if (!loggedin) {
      navigation.navigate('Signin');
    }
  });

  const logout = () => {
    storeData('userdetails', '');
    deleteData('uid');
    deleteData('cart');
    storeData('subprice', '0');
    dispatch(put_cartlist([]));
    dispatch(put_subprice(parseInt(0)));
    dispatch(put_login(true));
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.bag1Bg}}>
      {loggedin ? (
        <View style={{flex: 1, backgroundColor: Colors.bag1Bg}}>
          {/*Header */}
          <View style={{flexDirection: 'row', padding: 20}}>
            {/* Lottie View*/}
            <View
              style={{
                height: 100,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 360,
                backgroundColor: Colors.bag2Bg,
                overflow: 'hidden',
              }}>
              <LottieView
                source={
                  genderR === 'Female'
                    ? require('../assets/lottie/editted femalelottie.json')
                    : require('../assets/lottie/male-lottie.json')
                }
                style={{
                  width: genderR === 'Female' ? 130 : 100,
                  height: genderR === 'Female' ? 130 : 100,
                }}
                autoPlay
                loop
              />
            </View>
            {/* label and Number*/}
            <View style={{marginLeft: 20, flex: 1}}>
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  color: Colors.white,
                  fontSize: 21,
                  marginTop: 20,
                }}
                numberOfLines={1}>
                {nameR}
              </Text>

              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  color: Colors.textGrey,
                  fontSize: 15,
                  marginTop: 8,
                  marginBottom: 30,
                }}>
                {phonenumR}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              marginBottom: 90,
            }}>
            <View style={styles.viewStyle}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditProfile', {
                    genderG: genderR,
                    name: nameR,
                    phonenumber: phonenumR,
                    address: address,
                    state: state,
                  })
                }
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={styles.svgback}>
                  <Icon
                    type={Icons.AntDesign}
                    name={'edit'}
                    color={Colors.white}
                    size={23}
                  />
                </View>
                <View style={styles.viewStyle2}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      color: Colors.white,
                      fontSize: 15,
                    }}>
                    Edit Profile
                  </Text>
                </View>
                <Icon
                  type={Icons.Entypo}
                  name={'chevron-right'}
                  color={Colors.white}
                  size={23}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.viewStyle}>
              <TouchableOpacity
                onPress={() => navigation.navigate('OrderHistory')}
                delayPressIn={0}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={styles.svgback}>
                  <Icon
                    type={Icons.Octicons}
                    name={'history'}
                    color={Colors.white}
                    size={23}
                  />
                </View>
                <View style={styles.viewStyle2}>
                  <Text style={styles.textStyle}>Order History</Text>
                </View>
                <Icon
                  type={Icons.Entypo}
                  name={'chevron-right'}
                  color={Colors.white}
                  size={23}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.viewStyle}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Contact', {
                    name: nameR,
                    phonenumber: phonenumR,
                  })
                }
                delayPressIn={0}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={styles.svgback}>
                  <Icon
                    type={Icons.MaterialCommunityIcons}
                    name={'face-agent'}
                    color={Colors.white}
                    size={27}
                  />
                </View>
                <View style={styles.viewStyle2}>
                  <Text style={styles.textStyle}>Help & Support</Text>
                </View>
                <Icon
                  type={Icons.Entypo}
                  name={'chevron-right'}
                  color={Colors.white}
                  size={23}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.viewStyle}>
              <TouchableOpacity
                onPress={logout}
                delayPressIn={0}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={styles.svgback}>
                  <Icon
                    type={Icons.MaterialIcons}
                    name={'logout'}
                    color={Colors.white}
                    size={23}
                  />
                </View>
                <View style={styles.viewStyle2}>
                  <Text style={styles.textStyle}>Log Out</Text>
                </View>
                <Icon
                  type={Icons.Entypo}
                  name={'chevron-right'}
                  color={Colors.white}
                  size={23}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: Colors.white,
    fontFamily: 'Gilroy-SemiBold',
    justifyContent: 'center',
    fontSize: 15,
  },

  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingVertical: 5,
    paddingLeft: 10,
  },

  viewStyle2: {
    justifyContent: 'center',
    paddingLeft: 15,
    flex: 1,
  },

  iconStyle: {
    marginRight: 12,
    marginLeft: 12,
  },

  iconRight: {
    marginRight: 12,
    marginLeft: 0,
  },

  svgback: {
    backgroundColor: Colors.bag2Bg,
    borderRadius: 360,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: 55,
    width: 55,
  },
});

export default ProfileScreen;
