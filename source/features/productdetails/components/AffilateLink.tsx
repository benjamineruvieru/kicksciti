import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RegularTextB, SmallText, SmallTextB} from '../../../components/Text';
import {getItem} from '../../../utilis/storage';
import CopySvg from '../../../assets/svg/icons/copy.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import {showNotification} from '../../../utilis/Functions';

const AffilateLink = ({id}) => {
  const {username} = getItem('userdetails', true);
  const link = `https://www.kicksciti.com/product/${id}?id=${username}`;
  return (
    <View style={{marginTop: 30, marginBottom: 10}}>
      <RegularTextB>Affilate Link</RegularTextB>
      <TouchableOpacity
        onPress={() => {
          Clipboard.setString(link);
          showNotification({msg: 'Affilate link copied to clipboard'});
        }}
        style={{
          flexDirection: 'row',
          borderRadius: 5,
          borderWidth: 0.7,
          borderColor: 'white',
          paddingVertical: 10,
          marginTop: 10,
          paddingHorizontal: 10,
          alignItems: 'center',
        }}>
        <SmallText style={{flex: 1, textAlignVertical: 'center'}}>
          {link}
        </SmallText>
        <CopySvg color={'white'} width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

export default AffilateLink;

const styles = StyleSheet.create({});
