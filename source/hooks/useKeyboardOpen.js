import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

const useKeyboardOpen = (onOpen, onClose, dep) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        onOpen();
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        onClose();
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [...dep]);
  return isKeyboardVisible;
};

export default useKeyboardOpen;
