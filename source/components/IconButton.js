import {TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Back from '../assets/svg/arrow-left.svg';
import Left from '../assets/svg/back.svg';
import Fave from '../assets/svg/icons/fave.svg';
import Bell from '../assets/svg/icons/bell.svg';
import Search from '../assets/svg/icons/search.svg';
import {layoutAnimate} from '../utilis/Functions';

export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
      <Back />
    </TouchableOpacity>
  );
};

export const FaveButton = () => {
  return (
    <TouchableOpacity onPress={() => {}} style={{}}>
      <Fave />
    </TouchableOpacity>
  );
};

export const NotificationButton = () => {
  return (
    <TouchableOpacity onPress={() => {}} style={{}}>
      <Bell height={22} width={22} />
    </TouchableOpacity>
  );
};

export const SearchButton = ({searchOpen, setSearchOpen}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        layoutAnimate();
        setSearchOpen(p => !p);
      }}
      style={{
        backgroundColor: searchOpen ? 'white' : 'transparent',
        flex: searchOpen ? 1 : 0,
        borderRadius: 360,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: searchOpen ? 1 : 0,
        borderColor: '#00000033',
        paddingHorizontal: searchOpen ? 15 : 0,
      }}>
      <Search width={19} height={19} />
      {searchOpen && (
        <TextInput
          placeholderTextColor={'#00000066'}
          style={{
            marginLeft: 10,
            fontFamily: 'Quicksand-Medium',
            flex: 1,
            color: 'black',
          }}
          placeholder="Durchsuchen Sie meine Jobs..."
        />
      )}
    </TouchableOpacity>
  );
};
