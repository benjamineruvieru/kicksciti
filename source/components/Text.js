import {StyleSheet, Text as RNText, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

export const BigText = ({children, style, onPress}) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'Quicksand-SemiBold',
      fontSize: 30,
      ...style,
    },
  });

  return (
    <Text onPress={onPress} style={styles.text}>
      {children}
    </Text>
  );
};

export const MediumText = ({
  children,
  style,
  onPress,
  onTextPress,
  dim,
  numLines,
}) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'Quicksand-SemiBold',
      fontSize: 25,
      ...style,
    },
  });

  return (
    <Text
      dim={dim}
      numLines={numLines}
      onTextPress={onTextPress}
      onPress={onPress}
      style={styles.text}>
      {children}
    </Text>
  );
};

export const RegularTextB = ({
  children,
  style,
  onPress,
  disabled,
  onTextPress,
}) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'Quicksand-Bold',
      fontSize: 15,
      ...style,
    },
  });

  return (
    <Text
      disabled={disabled}
      onPress={onPress}
      onTextPress={onTextPress}
      style={styles.text}>
      {children}
    </Text>
  );
};
export const RegularText = ({
  children,
  style,
  onPress,
  disabled,
  onTextPress,
  dim,
}) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'Quicksand-SemiBold',
      fontSize: 15,
      ...style,
    },
  });

  return (
    <Text
      dim={dim}
      disabled={disabled}
      onPress={onPress}
      onTextPress={onTextPress}
      style={styles.text}>
      {children}
    </Text>
  );
};
export const SmallText = ({
  children,
  style,
  onPress,
  disabled,
  onTextPress,
  dim,
  numLines,
  touchStyle,
  onTextLayout = () => {},
}) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'Quicksand-Medium',
      fontWeight: '400',
      fontSize: 13,
      ...style,
    },
  });

  return (
    <Text
      onTextLayout={onTextLayout}
      numLines={numLines}
      dim={dim}
      disabled={disabled}
      onPress={onPress}
      onTextPress={onTextPress}
      touchStyle={touchStyle}
      style={styles.text}>
      {children}
    </Text>
  );
};
export const SmallTextB = ({
  children,
  style,
  onPress,
  disabled,
  onTextPress,
}) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'Quicksand-SemiBold',
      fontSize: 13,
      ...style,
    },
  });

  return (
    <Text
      disabled={disabled}
      onPress={onPress}
      onTextPress={onTextPress}
      style={styles.text}>
      {children}
    </Text>
  );
};

const Text = ({
  children,
  style,
  onPress,
  onTextPress,
  disabled,
  numLines,
  dim,
  props,
  touchStyle,
  onTextLayout = () => {},
  color,
}) => {
  const styles = StyleSheet.create({
    text: {
      color: dim ? Colors.dim : color ? color : 'black',
      includeFontPadding: false,
      ...style,
    },
  });

  return (
    <>
      {onPress ? (
        <TouchableOpacity
          style={{...touchStyle}}
          onPress={onPress}
          disabled={disabled ? disabled : !onPress}>
          <RNText onTextLayout={onTextLayout} style={styles.text} {...props}>
            {children}
          </RNText>
        </TouchableOpacity>
      ) : (
        <RNText
          onTextLayout={onTextLayout}
          {...props}
          numberOfLines={numLines}
          onPress={onTextPress}
          style={styles.text}>
          {children}
        </RNText>
      )}
    </>
  );
};

export default Text;
