import {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

type KeyboardEventListener = import('react-native').EmitterSubscription | null;

const useKeyboardOpen = (
  onOpen: () => void,
  onClose: () => void,
  dep: any[],
) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener: KeyboardEventListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        onOpen();
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener: KeyboardEventListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        onClose();
        setKeyboardVisible(false);
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
