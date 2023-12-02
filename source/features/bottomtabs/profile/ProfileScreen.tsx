import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Mainbackground from '../../../components/Mainbackground';
import {BackButton} from '../../../components/IconButton';
import {MediumText, RegularText} from '../../../components/Text';
import Button from '../../../components/Button';
import ProfilePic from '../../../components/ProfilePic';
import Colors from '../../../constants/Colors';
import {
  capitalizeAllFirstLetters,
  getPercentHeight,
} from '../../../utilis/Functions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ListItem from './components/ListItem';
import {deleteItem, getItem} from '../../../utilis/storage';

const ProfileScreen = ({navigation}) => {
  const {name, username} = getItem('userdetails', true);

  const insets = useSafeAreaInsets();

  const logout = () => {
    deleteItem('token');
    deleteItem('userdetails');
    deleteItem('cart');
    deleteItem('favourites');
    navigation.reset({
      index: 0,
      routes: [{name: 'OnboardingScreen'}],
    });
  };
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
          {capitalizeAllFirstLetters(name)}
        </MediumText>
        <RegularText>@{username}</RegularText>
      </View>
      <View style={{flex: 1, padding: 0}}>
        <ListItem title={'Wallet'} />
        <ListItem title={'Cart'} />
        <ListItem title={'Order History'} />
      </View>
      <Button
        backgroundColor="red"
        title="Log out"
        bottom={20}
        onPress={logout}
      />
    </Mainbackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
