import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {View, StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Colors from '../constants/Colors';

const width = Dimensions.get('window').width;
const rwidth = width - 40;
const mwidth = rwidth / 2;

const Shimmer = ({load}) => {
  const [loading, setLoading] = useState(load);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 40,
          paddingBottom: 20,
        }}>
        <SkeletonContent
          containerStyle={styles.flexS1}
          boneColor={Colors.bag2Bg}
          duration={2000}
          highlightColor={Colors.bag3Bg}
          animationDirection="horizontalRight"
          layout={[
            {
              width: '30%',
              height: 47,
              marginBottom: 10,
              marginRight: 15,
              borderRadius: 360,
            },
            {
              width: '30%',
              height: 47,
              marginBottom: 10,
              marginRight: 15,
              borderRadius: 360,
            },
            {
              width: '30%',
              height: 47,
              marginBottom: 10,
              marginRight: 10,
              borderRadius: 360,
            },
          ]}
          isLoading={loading}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        {/*Shimmer 1*/}
        <SkeletonContent
          containerStyle={styles.flexS}
          boneColor={Colors.bag2Bg}
          duration={2500}
          highlightColor={Colors.bag3Bg}
          animationDirection="horizontalRight"
          layout={[
            {
              width: mwidth,
              height: mwidth,
              marginBottom: 10,
              marginRight: 30,
              borderRadius: 10,
            },
            {width: mwidth - 70, height: 15, marginBottom: 6},
            {width: mwidth - 110, height: 15, marginBottom: 6},
          ]}
          isLoading={loading}
        />
        <View style={{width: 15}} />

        {/*Shimmer 2*/}

        <SkeletonContent
          containerStyle={styles.flexS}
          boneColor={Colors.bag2Bg}
          duration={2500}
          highlightColor={Colors.bag3Bg}
          animationDirection="horizontalRight"
          layout={[
            {width: mwidth, height: mwidth, marginBottom: 10, borderRadius: 10},
            {width: mwidth - 70, height: 15, marginBottom: 6},
            {width: mwidth - 110, height: 15, marginBottom: 6},
          ]}
          isLoading={loading}
        />
      </View>

      <View style={styles.shimCon}>
        {/*Shimmer 3*/}

        <SkeletonContent
          containerStyle={styles.flexS}
          boneColor={Colors.bag2Bg}
          duration={2500}
          highlightColor={Colors.bag3Bg}
          animationDirection="horizontalRight"
          layout={[
            {
              width: mwidth,
              height: mwidth,
              marginBottom: 10,
              marginRight: 30,
              borderRadius: 10,
            },
            {width: mwidth - 70, height: 15, marginBottom: 6},
            {width: mwidth - 110, height: 15, marginBottom: 6},
          ]}
          isLoading={loading}
        />
        <View style={{width: 15}} />

        {/*Shimmer 4*/}

        <SkeletonContent
          containerStyle={styles.flexS}
          boneColor={Colors.bag2Bg}
          duration={2500}
          highlightColor={Colors.bag3Bg}
          animationDirection="horizontalRight"
          layout={[
            {width: mwidth, height: mwidth, marginBottom: 10, borderRadius: 10},
            {width: mwidth - 70, height: 15, marginBottom: 6},
            {width: mwidth - 110, height: 15, marginBottom: 6},
          ]}
          isLoading={loading}
        />
      </View>

      <View style={{flexDirection: 'row'}}>
        {/*Shimmer 5*/}

        <SkeletonContent
          containerStyle={styles.flexS}
          boneColor={Colors.bag2Bg}
          duration={2500}
          highlightColor={Colors.bag3Bg}
          animationDirection="horizontalRight"
          layout={[
            {
              width: mwidth,
              height: mwidth,
              marginBottom: 10,
              marginRight: 30,
              borderRadius: 10,
            },
            {width: mwidth - 70, height: 15, marginBottom: 6},
            {width: mwidth - 110, height: 15, marginBottom: 6},
          ]}
          isLoading={loading}
        />
        <View style={{width: 15}} />

        {/*Shimmer 6*/}

        <SkeletonContent
          containerStyle={styles.flexS}
          boneColor={Colors.bag2Bg}
          duration={2500}
          highlightColor={Colors.bag3Bg}
          animationDirection="horizontalRight"
          layout={[
            {width: mwidth, height: mwidth, marginBottom: 10, borderRadius: 10},
            {width: mwidth - 70, height: 15, marginBottom: 6},
            {width: mwidth - 110, height: 15, marginBottom: 6},
          ]}
          isLoading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bag1Bg,
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    width: width,
  },

  flexS: {
    flex: 1,
  },
  flexS1: {
    flex: 1,
    flexDirection: 'row',
  },
  shimCon: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default Shimmer;
