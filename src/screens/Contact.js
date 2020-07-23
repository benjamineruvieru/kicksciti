import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  Keyboard,
  Linking,
} from 'react-native';
import Colors from '../constants/Colors';
import img from '../assets/img/contact.png';
import Icon, {Icons} from '../components/Icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BackHandler} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {sendMessage} from '../constants/Functions';
import DropdownAlert from 'react-native-dropdownalert';

const height = Dimensions.get('window').height;
const rheight = height * 0.35;

const ContactScreen = () => {
  const navigation = useNavigation();
  let message, email;
  const route = useRoute();
  const {name, phonenumber} = route.params;
  const textinputref = useRef(null);
  const textinputref1 = useRef(null);
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        textinputref.current.blur();
        textinputref1.current.blur();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
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
  }, [navigation]);
  let dropDownAlertRef = useRef();

  const Notify = (title, message, type) => {
    dropDownAlertRef.alertWithType(type, title, message);
  };
  return (
    <View style={{backgroundColor: Colors.bag1Bg, flex: 1}}>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '35%',
          top: 0,
          backgroundColor: Colors.primaryDeep,
          left: 0,
          paddingBottom: 30,
          justifyContent: 'flex-end',
          //borderBottomLeftRadius: 25,
          // borderBottomRightRadius: 25,
        }}>
        <Text
          style={{
            color: Colors.white,
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 20,
            alignSelf: 'center',
            top: 24,
            zIndex: 1,
          }}>
          Contact Us
        </Text>
        <Image source={img} style={{width: '100%', height: '85%'}} />
      </View>
      <View
        style={{
          top: rheight - 30,
          backgroundColor: Colors.bag4Bg,
          bottom: 100,
          position: 'absolute',
          width: '85%',
          alignSelf: 'center',
          borderRadius: 10,
          padding: 15,
        }}>
        <Text
          style={{
            color: Colors.white,
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 16,
            alignSelf: 'center',
          }}>
          Send Us A Message
        </Text>
        <View style={{justifyContent: 'space-between', flex: 1, paddingTop: 9}}>
          <Text
            style={{
              color: Colors.white,
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 13,
              marginLeft: 10,
              marginBottom: 5,
            }}>
            Email
          </Text>
          <View
            style={{
              backgroundColor: Colors.bag1Bg,
              borderRadius: 10,
              marginBottom: 9,
            }}>
            <TextInput
              ref={textinputref}
              placeholder="example@mail.com"
              placeholderTextColor={Colors.textGrey}
              numberOfLines={1}
              onChangeText={vv => (email = vv)}
              style={{
                color: Colors.white,
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 13,
                marginLeft: 8,
              }}
            />
          </View>

          <Text
            style={{
              color: Colors.white,
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 13,
              marginLeft: 10,
              marginBottom: 9,
            }}>
            Message
          </Text>
          <View style={{flex: 1}}>
            <TextInput
              ref={textinputref1}
              placeholder="Enter Message"
              multiline={true}
              placeholderTextColor={Colors.textGrey}
              style={{
                height: '100%',
                backgroundColor: Colors.bag1Bg,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                borderRadius: 10,
                textAlignVertical: 'top',
                paddingLeft: 12,
                paddingTop: 12,
                fontFamily: 'Gilroy-SemiBold',
                color: Colors.white,
              }}
              onChangeText={v => (message = v)}
            />
          </View>
        </View>
        <View style={{marginTop: 12, width: '100%', height: 50}}>
          <TouchableOpacity
            onPress={() => {
              if (!message || message.length < 1) {
                Notify(
                  'Message Cannot Be Empty',
                  'Please input message',
                  'error',
                );
                return;
              }
              sendMessage({
                message: message,
                name: name,
                phonenumber: phonenumber,
                email: email,
              });
              Notify(
                'Message Sent Successfully',
                'Please await our response via email',
                'success',
              );
              setTimeout(() => {
                navigation.goBack();
              }, 3000);
            }}
            style={{
              backgroundColor: Colors.primaryDeep,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text style={{fontFamily: 'Gilroy-SemiBold', color: Colors.white}}>
              Send Message
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: 90,
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <Text
          style={{
            color: Colors.white,
            fontFamily: 'Gilroy-SemiBold',
            marginBottom: 5,
          }}>
          Our Social Handles
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.instagram.com/kicks.citi/')
            }>
            <Icon
              type={Icons.AntDesign}
              name={'instagram'}
              color={Colors.white}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://wa.me/message/6P3LSZDL5GBJO1')
            }
            style={{marginHorizontal: 10}}>
            <Icon
              type={Icons.FontAwesome}
              name={'whatsapp'}
              color={Colors.white}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://t.me/kicksciti')}>
            <Icon
              type={Icons.FontAwesome}
              name={'telegram'}
              color={Colors.white}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
      <DropdownAlert
        zIndex={1000}
        updateStatusBar={false}
        defaultContainer={{
          flexDirection: 'row',
          paddingVertical: 20,
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
    </View>
  );
};

export default ContactScreen;
