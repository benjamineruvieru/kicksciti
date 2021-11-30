import {StyleSheet, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import Animated, {
  Easing,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOutDown,
  FadeOutLeft,
  FadeOutRight,
} from 'react-native-reanimated';

type LayoutAnimationComponentProps = {
  children: ReactNode;
  delay?: number;
  leftInOut?: boolean;
  rightInOut?: boolean;
  exit?: any;
  exitDelay?: number;
  entering?: any;
  style?: ViewStyle;
};

const LayoutAnimationComponent: React.FC<LayoutAnimationComponentProps> = ({
  children,
  style,
  delay,
  leftInOut,
  rightInOut,
  exitDelay,
  entering = rightInOut
    ? FadeInRight.delay(delay ?? 0)
        .duration(500)
        .easing(Easing.ease)
    : leftInOut
    ? FadeInLeft.delay(delay ?? 0)
        .duration(500)
        .easing(Easing.ease)
    : FadeInUp.delay(delay ?? 0)
        .duration(500)
        .easing(Easing.ease),
  exit = rightInOut
    ? FadeOutRight.delay(exitDelay ?? 0)
        .duration(500)
        .easing(Easing.ease)
    : leftInOut
    ? FadeOutLeft.delay(exitDelay ?? 0)
        .duration(500)
        .easing(Easing.ease)
    : FadeOutDown.delay(exitDelay ?? 0)
        .duration(500)
        .easing(Easing.ease),
}) => {
  exit;
  return (
    <Animated.View style={{...style}} entering={entering} exiting={exit}>
      {children}
    </Animated.View>
  );
};

export default LayoutAnimationComponent;

const styles = StyleSheet.create({});
