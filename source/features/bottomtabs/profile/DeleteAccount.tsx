import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Mainbackground from '../../../components/Mainbackground';
import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {RegularText} from '../../../components/Text';
import {deleteAccount, login} from '../../../api/auth';
import {deleteItem, getItem} from '../../../utilis/storage';
import {showNotification} from '../../../utilis/Functions';
import messaging from '@react-native-firebase/messaging';
import {queryClient} from '../../../../App';

const DeleteAccount = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState(false);

  const {email} = getItem('userdetails', true);

  const deleteFun = () => {
    setLoad(true);
    login({identifier: email, password})
      .then(async data => {
        console.log('coll pass', data.data);
        await deleteAccount();
        showNotification({msg: 'Account deleted successfully!'});
        deleteItem('userdetails');
        deleteItem('cart');
        deleteItem('favourites');
        deleteItem('token');
        deleteItem('unreadNotification');
        queryClient.clear();
        navigation.reset({
          index: 0,
          routes: [{name: 'OnboardingScreen'}],
        });
        await messaging().unsubscribeFromTopic('newproduct');
      })
      .catch(err => {
        console.log('err', err.response?.data);
        showNotification({error: true, msg: 'Incorrect password'});
      })
      .finally(() => {
        setLoad(false);
      });
  };
  return (
    <Mainbackground padding={20}>
      <PageHeader title={'Delete Account'} />
      <RegularText style={{marginBottom: 15, fontSize: 18}}>
        Please enter your password to delete your account
      </RegularText>
      <Input
        placeholderText="Password"
        password
        setText={setPassword}
        text={password}
      />
      <Button
        backgroundColor="red"
        title="Delete account"
        bottom={20}
        onPress={deleteFun}
        load={load}
      />
    </Mainbackground>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({});
