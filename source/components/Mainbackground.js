import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DeviceEventEmitter} from 'react-native';

const Mainbackground = ({children, style, keyboard, avoid, top}) => {
  const insets = useSafeAreaInsets();
  const [noti, setNoti] = useState(false);
  useEffect(() => {
    const myEventListener = DeviceEventEmitter.addListener(
      'openNotification',
      event => {
        setNoti(true);
        setTimeout(() => {
          setNoti(false);
        }, 3500);
      },
    );

    return () => myEventListener.remove();
  }, []);
  return (
    <Pressable
      disabled={!keyboard}
      onPress={() => Keyboard.dismiss()}
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <KeyboardAvoidingView
        behavior={avoid && Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          flex: 1,
          paddingTop: noti ? 0 : top ? top : insets.top,
          paddingBottom: insets.bottom,
          ...style,
        }}>
        {children}
      </KeyboardAvoidingView>
    </Pressable>
  );
};

export default Mainbackground;

const styles = StyleSheet.create({});
