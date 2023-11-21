import {Image, StatusBar, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Mainbackground from '../../components/Mainbackground';
import {BigText, BigTextB, RegularText, SmallText} from '../../components/Text';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/Variables';
import Button from '../../components/Button';
import LayoutAnimationComponent from '../../components/LayoutAnimationComponent';
import {Easing, FadeOutLeft} from 'react-native-reanimated';
import Input from '../../components/Input';

const bg = require('../../assets/images/onboarding/bg.webp');

const Welcome = ({setPos}) => {
  return (
    <>
      <LayoutAnimationComponent leftInOut>
        <BigTextB style={{marginBottom: 5}}>Welcome to Kicks Citi</BigTextB>
      </LayoutAnimationComponent>

      <LayoutAnimationComponent leftInOut delay={200}>
        <RegularText style={{lineHeight: 19}}>
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

const CollectEmail = ({setPos}) => {
  return (
    <>
      <LayoutAnimationComponent
        exit={FadeOutLeft.duration(500).easing(Easing.ease)}
        delay={500}>
        <BigText style={{marginBottom: 10}}>Enter your email address</BigText>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent
        delay={600}
        exit={FadeOutLeft.delay(200).duration(500).easing(Easing.ease)}>
        <Input keyboard="email-address" placeholder={'Email'} />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent exit={null}>
        <Button
          title="Next"
          onPress={() => {
            setPos(2);
          }}
        />
      </LayoutAnimationComponent>
    </>
  );
};

const CreatePassword = ({setPos}) => {
  return (
    <>
      <LayoutAnimationComponent delay={800} leftInOut>
        <BigText style={{marginBottom: 10}}>Create a password</BigText>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={900} exitDelay={300} leftInOut>
        <Input placeholder={'Password'} password />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={1100} exitDelay={500} leftInOut>
        <Input placeholder={'Retype Password'} password />
      </LayoutAnimationComponent>

      <Button
        title="Next"
        onPress={() => {
          setPos(3);
        }}
      />
    </>
  );
};

const CompleteProfile = ({navigation}) => {
  return (
    <>
      <LayoutAnimationComponent delay={1000} leftInOut>
        <BigText style={{marginBottom: 10}}>Complete your profile</BigText>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={1300} leftInOut>
        <Input placeholder={'Full Name'} />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={1500} leftInOut>
        <Input placeholder={'Username'} />
      </LayoutAnimationComponent>

      <Button
        title="Finish"
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'BottomNav'}],
          });
        }}
      />
    </>
  );
};

const OnboardingScreen = ({navigation}) => {
  const [pos, setPos] = useState(0);
  return (
    <Mainbackground avoid keyboard style={styles.mainBg}>
      <Image source={bg} resizeMode="cover" style={styles.bgImg} />
      <View style={styles.dimBg} />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 50,
        }}>
        {pos === 0 && <Welcome {...{setPos}} />}
        {pos === 1 && <CollectEmail {...{setPos}} />}
        {pos === 2 && <CreatePassword {...{setPos}} />}
        {pos === 3 && <CompleteProfile {...{navigation}} />}
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
    height: SCREEN_HEIGHT + StatusBar.currentHeight,
  },
  mainBg: {
    padding: 20,
  },
});
