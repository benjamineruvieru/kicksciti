import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, getData} from '../constants';
import React, {useEffect, useRef, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FlatList, Text, TouchableOpacity, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon, {Icons} from '../components/Icons';
import Clipboard from '@react-native-clipboard/clipboard';
import {numberWithCommas} from '../constants/Functions';
import DropdownAlert from 'react-native-dropdownalert';
import img from '../assets/img/empty-box.png';
const OrderHistoryScreen = () => {
  const navigation = useNavigation();
  const [map, setMap] = useState([]);

  useEffect(() => {
    const read = async () => {
      const id = await getData('uid', false);
      if (id === null) {
        return null;
      }
      firestore()
        .collection('Orders')
        .doc(id)
        .get()
        .then(m => {
          if (!m.exists) {
            setMap(false);
            return;
          }
          setMap(m.data().orders.reverse());
        });
    };
    read();
  }, []);

  let dropDownAlertRef = useRef();

  const Notify = (title, message, type) => {
    dropDownAlertRef.alertWithType(type, title, message);
  };

  const renderEmpty = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          paddingBottom: 90,
        }}>
        <Image source={img} style={{width: 250, height: 250}} />

        <Text
          style={{
            fontFamily: 'Gilroy-SemiBold',
            color: Colors.white,
            fontSize: 16,
            marginTop: 20,
          }}>
          Order History Empty!
        </Text>
      </View>
    );
  };

  const renderItem = props => {
    return (
      <TouchableOpacity
        onPress={() => {
          Notify(
            'Copied To Clipboard',
            'The transaction reference has been copied to your clipboard',
            'success',
          );
          Clipboard.setString(props.item.tx_ref);
        }}
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.bag4Bg,
          borderRadius: 10,
          padding: 8,
          alignItems: 'center',
          marginBottom: 20,
          elevation: 2,
          paddingVertical: 12,
        }}>
        <Image
          source={{uri: props.item.uri}}
          style={{height: 70, width: 70, marginRight: 10}}
        />
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 12,
              color: Colors.primary,
              fontWeight: 'normal',
              marginBottom: 8,
            }}>
            {props.item.orderID}
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 22,
              color: Colors.white,
              fontWeight: 'normal',
              marginBottom: 8,
            }}>
            ₦ {numberWithCommas(props.item.price)}
          </Text>

          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 12,
              color:
                props.item.status === 'Delivered'
                  ? Colors.primary
                  : props.item.status === 'Pending'
                  ? Colors.orange
                  : Colors.red,
              fontWeight: 'normal',
              alignSelf: 'flex-end',
            }}>
            Status: {props.item.status}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: Colors.bag1Bg, paddingHorizontal: 16}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 16,
        }}>
        <TouchableOpacity delayPressIn={0} onPress={() => navigation.goBack()}>
          <Icon
            type={Icons.Ionicons}
            name={'chevron-back'}
            color={Colors.primary}
            size={27}
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
              H
            </Text>
            istory
          </Text>
        </View>
        <TouchableOpacity delayPressIn={0} />
      </View>
      <FlatList
        data={map}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{flex: map.length > 0 ? 0 : 1}}
      />
      <DropdownAlert
        zIndex={1000}
        updateStatusBar={false}
        defaultContainer={{
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 12,
          margin: 10,
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
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;
