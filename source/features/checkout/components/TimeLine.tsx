import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {RegularTextB, SmallTextB} from '../../../components/Text';
import Colors from '../../../constants/Colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const TimeLine = ({progress = []}) => {
  const opacity = useSharedValue(1);
  useEffect(() => {
    opacity.value = withRepeat(withTiming(0, {duration: 1000}), 0, true);
  }, [progress]);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const prkogress = [
    {text: 'Confirming payment'},
    {text: 'Processing order'},
    {text: 'Order shipped'},
    {text: 'Out for delivery'},
    {text: 'Order delivered'},
  ];
  return (
    <View>
      {progress.length > 0 && (
        <RegularTextB style={{marginBottom: 10}}>Order progress</RegularTextB>
      )}

      {progress.length > 0 && (
        <View
          style={{
            backgroundColor: Colors.highlight,
            padding: 10,
            borderRadius: 10,
            paddingVertical: 15,
          }}>
          {progress.reverse().map((data, i) => {
            const {text} = data ?? {};
            return (
              <View key={i}>
                {i !== 0 && (
                  <View
                    style={{
                      height: 30,
                      width: 2,
                      backgroundColor: Colors.primary,
                      left: 13 / 2,
                    }}
                  />
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: i === 0 ? 17 : 15,
                      height: i === 0 ? 17 : 15,
                      left: i === 0 ? -1 : 0,
                      backgroundColor: i === 0 ? 'transparent' : Colors.primary,
                      borderRadius: 360,
                      marginRight: 10,
                      borderWidth: i === 0 ? 2 : 0,
                      borderColor: Colors.primary,
                      justifyContent: 'center',
                    }}>
                    {i === 0 && (
                      <Animated.View
                        style={[
                          {
                            backgroundColor: Colors.primary,
                            width: 5,
                            height: 5,
                            borderRadius: 360,
                            alignSelf: 'center',
                            opacity: opacity,
                          },
                          animatedStyles,
                        ]}
                      />
                    )}
                  </View>
                  <SmallTextB>{text}</SmallTextB>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default TimeLine;

const styles = StyleSheet.create({});
