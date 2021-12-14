import {StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Shimmer = ({...props}) => {
  return (
    <ShimmerPlaceHolder
      shimmerColors={['#263238', '#78909c', '#263238']}
      {...props}
    />
  );
};

export default Shimmer;

const styles = StyleSheet.create({});
