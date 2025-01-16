import {Linking, StyleSheet, Text, View} from 'react-native';
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
import PrivateSvg from '../../../assets/svg/profile/private.svg';
import DeleteSvg from '../../../assets/svg/profile/delete.svg';
import {logout} from '../../../api/auth';
import {queryClient} from '../../../../App';

const ProfileScreen = ({navigation}) => {
  restrictViewer({navigation});
  const {name, username} = getItem('userdetails', true);

  const insets = useSafeAreaInsets();

  const logoutFun = async () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'OnboardingScreen'}],
    });
    deleteItem('userdetails');
    deleteItem('cart');
    deleteItem('favourites');
    deleteItem('unreadNotification');
    queryClient.clear();
    await logout().finally(async () => {
      deleteItem('token');

      await messaging().unsubscribeFromTopic('newproduct');
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
        <ListItem
          title={'Privacy Policy'}
          onPress={() => {
            Linking.openURL('https://www.kicksciti.com.ng/privacy-policy');
          }}
          Svg={PrivateSvg}
          size={20}
        />

        <ListItem
          title={'Delete Account'}
          screen={'DeleteAccount'}
          Svg={DeleteSvg}
          size={18}
        />
      </View>
      <Button
        backgroundColor="red"
        title="Log out"
        bottom={20}
        onPress={logoutFun}
      />
    </Mainbackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
