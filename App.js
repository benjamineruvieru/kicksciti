import {Animated, Platform, StyleSheet, UIManager} from 'react-native';
import React, {useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackNav from './source/navigation/StackNav';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Notification from './source/components/Notification';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TypeAnimation} from 'react-native-type-animation';

const queryClient = new QueryClient();

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => {
  const transY = useRef(new Animated.Value(0)).current;
  const goDown = ({num = 128}) => {
    Animated.timing(transY, {
      useNativeDriver: true,
      toValue: num,
    }).start();
  };

  const goUp = () => {
    console.log('called up');
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
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TypeAnimation
          sequence={[
            {text: 'Kicks Citi is tuning up for a major upgrade'},

            {
              text: 'Kicks Citi is undergoing a revamp',
            },
            {text: 'Kicks Citi is evolving with cutting-edge enhancements'},
            {text: 'Kicks Citi is in the process of a visual reimagining'},

            {
              text: 'Kicks Citi is on the brink of a creative rebirth',
            },
          ]}
          loop
          cursorStyle={{color: 'red'}}
        />
        <SafeAreaProvider>
          <Notification {...{goDown, goUp}} />
          <Animated.View
            style={{
              flex: 1,
              transform: [{translateY: transY}],
            }}>
            <StackNav />
          </Animated.View>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
