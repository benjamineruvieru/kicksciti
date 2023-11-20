import {
  ActivityIndicator,
  Animated,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {MediumText, SmallText} from './Text';
import Colors from '../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Check from '../assets/svg/icon/check.svg';
import Error from '../assets/svg/icon/error.svg';

import {SCREEN_WIDTH} from '../constants/Variables';
import {useSelector} from 'react-redux';
import {selectTheme} from '../redux/store';

const Notify = React.forwardRef(({safe = true, drop}, ref) => {
  const [message, setMessage] = useState('');
  const [showLoading, setShowLoad] = useState(false);
  const [warn, setwarn] = useState(false);
  const [error, setError] = useState(false);
  const [height, setHeight] = useState(118);
  const insets = useSafeAreaInsets();
  const isDarkMode = useSelector(selectTheme);
  const transY = useRef(new Animated.Value(0)).current;
  const show = ({message: msg, error = false, warn = false}) => {
    if (error) {
      Platform.OS === 'android' && StatusBar.setBackgroundColor(Colors.red);
    } else {
      Platform.OS === 'android' && StatusBar.setBackgroundColor('green');
    }
    if (msg === 'Wrong authentication token used') {
      hide();
      setTimeout(() => {
        setMessage('Session expired! Please login again');
        setError(error);
        setwarn(warn);
        Animated.timing(transY, {
          toValue: drop ? height + StatusBar.currentHeight : height,
          useNativeDriver: true,
          duration: 400,
        }).start();
      }, 300);
    } else if (message.length > 0) {
      //console.log('this');

      hide();
      setTimeout(() => {
        setMessage(msg);
        setError(error);
        setwarn(warn);
        Animated.timing(transY, {
          toValue: drop ? height + StatusBar.currentHeight : height,
          useNativeDriver: true,
          duration: 400,
        }).start();
        setTimeout(hide, 4500);
      }, 300);
    } else {
      //console.log('this2');
      setMessage(
        msg
          ? msg.length > 0
            ? msg
            : 'An unknown error occurred!'
          : 'An unknown error occurred!',
      );
      setError(error);
      setwarn(warn);
      Animated.timing(transY, {
        toValue: drop ? height + StatusBar.currentHeight : height,
        useNativeDriver: true,
        duration: 400,
      }).start();
      setTimeout(hide, 4500);
    }
  };
  const hide = () => {
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(isDarkMode ? '#272727' : 'white');
    Animated.timing(transY, {
      toValue: -height - insets.top,
      useNativeDriver: true,
      duration: 200,
    }).start(() => {
      setMessage('');
    });
  };
  const load = () => {
    setShowLoad(true);
  };
  const loadClose = () => {
    setShowLoad(false);
  };
  const styles = StyleSheet.create({
    view: {
      position: 'absolute',
      backgroundColor: error ? Colors.red : 'green',
      top: safe ? -height - insets.top : -height,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 10 + insets.top,
      transform: [{translateY: transY}],
      zIndex: 10000,
      justifyContent: 'center',
    },
    text: {
      marginLeft: 15,
      width: SCREEN_WIDTH - 65,
      color: 'white',
      paddingBottom: 20,
      paddingTop: 20,
    },
    background: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  React.useImperativeHandle(ref, () => ({
    show,
    load,
    loadClose,
  }));

  return (
    <>
      <AnimatedPressable
        onLayout={event => {
          let {height} = event.nativeEvent.layout;
          setHeight(height);
        }}
        onPress={hide}
        style={styles.view}>
        {error ? <Error /> : <Check />}

        <SmallText style={styles.text}>{message}</SmallText>
      </AnimatedPressable>

      <Modal visible={showLoading} transparent={true}>
        <View style={styles.background}>
          <ActivityIndicator color={Colors.lightgrey} />
          <MediumText style={{marginTop: 5}} dim={true}>
            Loading...
          </MediumText>
        </View>
      </Modal>
    </>
  );
});
export default Notify;
