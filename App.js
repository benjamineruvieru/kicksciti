import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  UIManager,
} from 'react-native';
import React, {useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackNav from './source/navigation/StackNav';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Notification from './source/components/Notification';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Modal from './source/features/modal';

Platform.OS === 'android' && StatusBar.setTranslucent(true);
Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
StatusBar.setBarStyle('light-content');
const queryClient = new QueryClient();

const App = () => {
  const transY = useRef(new Animated.Value(0)).current;
  const goDown = ({num = 128}) => {
    Animated.timing(transY, {
      useNativeDriver: true,
      toValue: num,
    }).start();
  };

  const goUp = () => {
    Animated.timing(transY, {
      useNativeDriver: true,
      toValue: 0,
    }).start();
  };
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}>
        <SafeAreaProvider>
          <Notification {...{goDown, goUp}} />
          <Animated.View
            style={{
              flex: 1,
              transform: [{translateY: transY}],
            }}>
            <StackNav />
          </Animated.View>
          <Modal />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
