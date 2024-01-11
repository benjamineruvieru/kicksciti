import {Image, Linking, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import Mainbackground from '../../components/Mainbackground';
import LayoutAnimationComponent from '../../components/LayoutAnimationComponent';
import {getPercentWidth} from '../../utilis/Functions';
import {RegularTextB, SmallText} from '../../components/Text';
import Button from '../../components/Button';

const UpdateScreen = () => {
  return (
    <Mainbackground style={styles.container}>
      <View style={styles.flexContainer} />
      <LayoutAnimationComponent delay={300}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../assets/images/illustrations/update.png')}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={400}>
        <RegularTextB style={styles.updateText}>
          A New Update Is Available
        </RegularTextB>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={500}>
        <SmallText style={styles.descriptionText}>
          Discover new features and improvements by updating your app{'\n'}
          today.
        </SmallText>
      </LayoutAnimationComponent>
      <View style={styles.flexContainer} />
      <LayoutAnimationComponent delay={600}>
        <Button
          title="Update Now"
          bottom={20}
          onPress={() => {
            if (Platform.OS === 'android') {
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.kicksciti.android',
              );
            } else {
              Linking.openURL(
                'https://apps.apple.com/app/kicks-citi/id6474217371',
              );
            }
          }}
        />
      </LayoutAnimationComponent>
    </Mainbackground>
  );
};

export default UpdateScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,

    justifyContent: 'center',
  },
  descriptionText: {
    textAlign: 'center',
  },
  flexContainer: {
    flex: 1,
  },
  image: {
    height: getPercentWidth(50),

    marginBottom: 10,
    maxHeight: 400,
    maxWidth: 400,
    width: getPercentWidth(80),
  },
  updateText: {
    marginBottom: 5,
  },
});
