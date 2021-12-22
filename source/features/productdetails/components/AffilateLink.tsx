import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RegularTextB, SmallText, SmallTextB} from '../../../components/Text';
import {getItem} from '../../../utilis/storage';
import CopySvg from '../../../assets/svg/icons/copy.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  formatNumberWithCommas,
  showNotification,
} from '../../../utilis/Functions';
import QuesSvg from '../../../assets/svg/icons/question.svg';
import {Dialog} from '../../../components/Dialog';
const AffilateLink = ({id, affiliate_commission}) => {
  const isLoggedIn = !!getItem('token');
  const [open, setOpen] = useState(false);
  const {username} = getItem('userdetails', true);
  const link = isLoggedIn
    ? `https://www.kicksciti.com/product/${id}?id=${username}`
    : `https://www.kicksciti.com/product/${id}`;
  return (
    <View style={{marginTop: 30, marginBottom: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <RegularTextB
          onTextPress={() => {
            setOpen(true);
          }}>
          {isLoggedIn ? 'Affilate Link' : 'Product Link'}
        </RegularTextB>
        {isLoggedIn && (
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
            }}
            style={{marginLeft: 5}}>
            <QuesSvg width={20} height={20} color={'white'} />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          Clipboard.setString(link);
          showNotification({
            msg: isLoggedIn
              ? 'Affilate link copied to clipboard'
              : 'Product link copied to clipboard',
          });
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
      <Dialog
        open={open}
        closeModal={() => {
          setOpen(false);
        }}>
        <View style={{padding: 5}}>
          <RegularTextB style={{marginBottom: 10}}>Affiliate Link</RegularTextB>
          <SmallText>
            Grab your unique Affiliate Link and share it. When friends use it to
            make a purchase, you get a commission!{'\n\n'}It's that simple.
            Share the love, earn rewards. Happy sharing!
          </SmallText>
          <SmallText style={{marginTop: 5}}>
            Product Commission: ₦{' '}
            {formatNumberWithCommas(affiliate_commission ?? 1000)}
          </SmallText>
        </View>
      </Dialog>
    </View>
  );
};

export default AffilateLink;

const styles = StyleSheet.create({});
