import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Mainbackground from '../../../components/Mainbackground';
import {BackButton} from '../../../components/IconButton';
import {MediumText, RegularText} from '../../../components/Text';
import Button from '../../../components/Button';
import ProfilePic from '../../../components/ProfilePic';
import Colors from '../../../constants/Colors';
import {getPercentHeight} from '../../../utilis/Functions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <Mainbackground padding={0} insetsBottom={-1} top={-1}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: Colors.highlight,
          height: getPercentHeight(35),
          justifyContent: 'center',
          paddingTop: insets.top / 1.5,
        }}>
        <ProfilePic />
        <MediumText style={{marginBottom: 5, marginTop: 15}}>
          Ben Dev
        </MediumText>
        <RegularText>@bendev</RegularText>
      </View>
      <View style={{flex: 1, padding: 0}}></View>
      <Button backgroundColor="red" title="Log out" bottom={20} />
    </Mainbackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
