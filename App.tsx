import {Animated, Platform, StatusBar} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackNav from './source/navigation/StackNav';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Notification from './source/components/Notification';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Modal from './source/features/modal';
import {NavigationContainer} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import codePush from 'react-native-code-push';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

Platform.OS === 'android' && StatusBar.setTranslucent(true);
Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
StatusBar.setBarStyle('light-content');

export const queryClient = new QueryClient();
const codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};

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

  const initNotification = async () => {
    await notifee.createChannel({
      id: 'default_channel',
      name: 'All Alerts',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      vibration: true,
    });
  };

  useEffect(() => {
    initNotification();
  }, []);

  const onReady = () => {
    BootSplash.hide();
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
            <NavigationContainer onReady={onReady}>
              <StackNav />
              <Modal />
            </NavigationContainer>
          </Animated.View>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default codePush(codePushOptions)(App);
