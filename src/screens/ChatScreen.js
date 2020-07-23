import React from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';
import Icon, {Icons} from '../components/Icons';
import defaultimg from '../assets/img/ic_launcher_round.png';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';

function ChatScreen() {
  return (
    <View style={{flex: 1, backgroundColor: Colors.bag1Bg}}>
      <View
        style={{
          backgroundColor: Colors.primaryDark,
          height: 120,
          borderRadius: 20,
          alignItems: 'center',
          paddingHorizontal: 30,
          flexDirection: 'row',
          paddingTop: 15,
        }}>
        <Image source={defaultimg} style={{height: 60, width: 60}} />
        <View style={{marginLeft: 15}}>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 25,
              color: Colors.white,
            }}>
            Kicks Citi
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 15,
              color: Colors.white,
            }}>
            online
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{flex: 1, backgroundColor: Colors.bag1Bg}}>
        <View style={{flex: 1}}>
          <Text>Djd</Text>
        </View>
        <View
          style={{
            height: 60,
            paddingBottom: Platform.OS === 'ios' ? 30 : 15,
            alignContent: 'flex-end',
            justifyContent: 'flex-end',
            paddingHorizontal: 16,
          }}>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: Colors.bag2Bg,
              flexDirection: 'row',
              height: 60,
              paddingHorizontal: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              type={Icons.Entypo}
              name={'attachment'}
              color={Colors.textGrey}
              size={20}
            />

            <TextInput
              placeholder="Type A Message"
              placeholderTextColor={Colors.textGrey}
              style={{
                fontFamily: 'Gilroy-SemiBold',
                flex: 1,
                height: 50,
                marginLeft: 10,
              }}
            />
            <TouchableOpacity delayPressIn={0}>
              <Icon
                type={Icons.Ionicons}
                name={'camera'}
                color={Colors.textGrey}
                style={{paddingRight: 20}}
              />
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={0}>
              <Icon
                type={Icons.FontAwesome}
                name={'microphone'}
                color={Colors.textGrey}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
