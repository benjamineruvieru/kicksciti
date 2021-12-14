import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Mainbackground from '../../../components/Mainbackground';
import {MediumText, RegularText} from '../../../components/Text';
import Button from '../../../components/Button';
import ProfilePic from '../../../components/ProfilePic';
import Colors from '../../../constants/Colors';
import {
  capitalizeAllFirstLetters,
  getPercentHeight,
  restrictViewer,
} from '../../../utilis/Functions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ListItem from './components/ListItem';
import {deleteItem, getItem} from '../../../utilis/storage';
import CartSvg from '../../../assets/svg/icons/cart.svg';
import HistorySvg from '../../../assets/svg/profile/history.svg';
import EarnSvg from '../../../assets/svg/profile/earn.svg';
import messaging from '@react-native-firebase/messaging';

const ProfileScreen = ({navigation}) => {
  restrictViewer({navigation});
  const {name, username} = getItem('userdetails', true);

  const insets = useSafeAreaInsets();

  const logout = async () => {
    try {
      deleteItem('token');
      deleteItem('userdetails');
      deleteItem('cart');
      deleteItem('favourites');
      await messaging().unsubscribeFromTopic('newproduct');
    } catch (err) {
      console.log('Logout err', err);
    } finally {
      navigation.reset({
        index: 0,
        routes: [{name: 'OnboardingScreen'}],
      });
    }
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
        <ListItem
          title={'Earnings'}
          screen={'AffilateEarnings'}
          Svg={EarnSvg}
        />
        <ListItem
          title={'Order History'}
          Svg={HistorySvg}
          screen={'OrderHistory'}
        />
        <ListItem title={'Cart'} screen={'CartScreen'} Svg={CartSvg} />
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
