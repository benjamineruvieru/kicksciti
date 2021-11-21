import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  FadeInLeft,
  FadeInUp,
  FadeOutDown,
  FadeOutLeft,
} from 'react-native-reanimated';

const LayoutAnimationComponent = ({children, delay, leftInOut}) => {
  return (
    <Animated.View
      entering={
        leftInOut
          ? FadeInLeft.delay(delay).duration(500).easing(Easing.ease)
          : FadeInUp.delay(delay).duration(500).easing(Easing.ease)
      }
      exiting={
        leftInOut
          ? FadeOutLeft.duration(500).easing(Easing.ease)
          : FadeOutDown.duration(500).easing(Easing.ease)
      }>
      {children}
    </Animated.View>
  );
};

export default LayoutAnimationComponent;

const styles = StyleSheet.create({});
