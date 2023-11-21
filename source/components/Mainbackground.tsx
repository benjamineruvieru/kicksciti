import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DeviceEventEmitter} from 'react-native';
import Colors from '../constants/Colors';

interface MainBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  keyboard?: boolean;
  avoid?: boolean;
  top?: number;
  padding?: number;
}

const Mainbackground: React.FC<MainBackgroundProps> = ({
  children,
  style,
  keyboard,
  avoid,
  top,
  padding,
}) => {
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
        backgroundColor: Colors.bg,
        padding,
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
