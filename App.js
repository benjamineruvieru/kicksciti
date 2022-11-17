import React from 'react';
import {View, StyleSheet} from 'react-native';
import ProviderContainer from './src/redux/Provider';

import {Colors} from './src/constants';
import Navigation from './src/navigation/StackNav';

import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <ProviderContainer>
          <Navigation />
        </ProviderContainer>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
