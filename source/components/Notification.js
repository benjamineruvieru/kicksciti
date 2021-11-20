import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import {StatusBar} from 'react-native';
import {Platform} from 'react-native';
import {DeviceEventEmitter} from 'react-native';
import {RegularText} from './Text';
import Check from '../assets/svg/icons/check.svg';
import Error from '../assets/svg/icons/error.svg';
import {SCREEN_WIDTH} from '../constants/Variables';

const Notification = ({goDown, goUp}) => {
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(false);

  const insets = useSafeAreaInsets();
  let timer;
  const transY = useRef(new Animated.Value(0)).current;
  const notheight = useRef(128);
  const openNotification = ({msg, error = false}) => {
    Animated.timing(transY, {
      useNativeDriver: true,
      toValue: StatusBar.currentHeight / 1.5 + notheight.current,
    }).start();
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(!error ? Colors.green : Colors.red);
    error && StatusBar.setBarStyle('light-content');
    setMsg(msg);
    setError(error);
  };

  const closeNotification = () => {
    clearTimeout(timer);
    Animated.timing(transY, {
      useNativeDriver: true,
      toValue: 0,
    }).start();
    Platform.OS === 'android' && StatusBar.setBackgroundColor('white');

    StatusBar.setBarStyle('dark-content');
    goUp();
    setTimeout(() => {
      setMsg('');
      setError(false);
    }, 500);
  };

  useEffect(() => {
    const myEventListener = DeviceEventEmitter.addListener(
      'openNotification',
      event => {
        console.log(event);
        goDown({num: notheight.current});
        openNotification(event);
        setTimeout(() => {
          closeNotification();
        }, 3500);
      },
    );

    return () => myEventListener.remove();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{translateY: transY}],
        position: 'absolute',
        top: -130,
        zIndex: 1,
        width: SCREEN_WIDTH,
      }}
      onLayout={e => {
        console.log(e.nativeEvent.layout);
        notheight.current = e.nativeEvent.layout.height;
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: error ? Colors.red : Colors.green,
          paddingTop: insets.top + 25,
          paddingHorizontal: 20,
          paddingBottom: 25,
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}
        onPress={closeNotification}>
        {error ? <Error /> : <Check />}
        <RegularText style={{color: 'white', marginLeft: 15, flex: 1}}>
          {msg ? msg : 'An unknown error occurred!'}
        </RegularText>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
