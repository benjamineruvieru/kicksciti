import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Mainbackground from '../../components/Mainbackground';
import {BigText, RegularText, SmallText} from '../../components/Text';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/Variables';
import Button from '../../components/Button';
import LayoutAnimationComponent from '../../components/LayoutAnimationComponent';
import Animated from 'react-native-reanimated';
import Input from '../../components/Input';

const bg = require('../../assets/images/onboarding/bg.webp');

const Welcome = ({setPos}) => {
  return (
    <>
      <LayoutAnimationComponent leftInOut>
        <BigText style={{marginBottom: 5}}>Welcome to Kicks Citi</BigText>
      </LayoutAnimationComponent>

      <LayoutAnimationComponent leftInOut delay={200}>
        <RegularText>
          Your one-stop shop for all things sneakers.{'\n'}Step into a world of
          style and comfort with our wide selection of exclusive footwears.
        </RegularText>
      </LayoutAnimationComponent>

      <View
        style={{
          alignItems: 'center',
        }}>
        <LayoutAnimationComponent>
          <Button
            title={'Get Started'}
            bottom={15}
            top={20}
            onPress={() => {
              setPos(1);
              // navigation.navigate('CollectEmailScreen');
            }}
          />
        </LayoutAnimationComponent>

        <LayoutAnimationComponent delay={200}>
          <SmallText>View as a guest</SmallText>
        </LayoutAnimationComponent>
      </View>
    </>
  );
};

const CollectEmail = () => {
  return (
    <>
      <LayoutAnimationComponent delay={500}>
        <BigText>Enter your email address</BigText>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={600}>
        <Input placeholder={'Email'} />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent>
        <Button title="Next" />
      </LayoutAnimationComponent>
    </>
  );
};

const CollectEmail = () => {
  return (
    <>
      <LayoutAnimationComponent delay={500}>
        <BigText>Enter your email address</BigText>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={600}>
        <Input placeholder={'Email'} />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent>
        <Button title="Next" />
      </LayoutAnimationComponent>
    </>
  );
};

const OnboardingScreen = ({navigation}) => {
  const [pos, setPos] = useState(0);
  return (
    <Mainbackground avoid keyboard style={styles.mainBg}>
      <Image source={bg} resizeMode="cover" style={styles.bgImg} />
      <View style={styles.dimBg} />
      <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 30}}>
        {pos === 0 && <Welcome {...{setPos, navigation, pos}} />}
        {pos === 1 && <CollectEmail {...{}} />}
      </View>
    </Mainbackground>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  dimBg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  mainBg: {
    padding: 20,
  },
});
