import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {SCREEN_WIDTH} from '../../../constants/Variables';
import Colors from '../../../constants/Colors';
import LayoutAnimationComponent from '../../../components/LayoutAnimationComponent';
import {SlideInRight} from 'react-native-reanimated';

const ITEMSIZE = (SCREEN_WIDTH - 30) / 5 - 12;

const VariantPicker = ({data, activeIndex, goToIndex}) => {
  return (
    <View style={{marginBottom: 15}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((link, i) => {
          return (
            <LayoutAnimationComponent
              key={i}
              entering={SlideInRight.delay(i * 100 + 10)}
              exit={null}>
              <TouchableOpacity
                onPress={() => {
                  goToIndex(i);
                }}
                style={{marginRight: data.length === i + 1 ? 0 : 15}}>
                <FastImage
                  source={{uri: link}}
                  style={{
                    height: ITEMSIZE,
                    width: ITEMSIZE,
                    borderWidth: activeIndex === i ? 3 : 0,
                    borderColor: Colors.primary,
                  }}
                />
              </TouchableOpacity>
            </LayoutAnimationComponent>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default VariantPicker;

const styles = StyleSheet.create({});