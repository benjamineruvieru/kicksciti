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

interface AffiliateLinkProps {
  id: string;
  affiliate_commission: number;
}

const AffilateLink: React.FC<AffiliateLinkProps> = ({
  id,
  affiliate_commission,
}) => {
  const isLoggedIn: boolean = !!getItem('token');
  const [open, setOpen] = useState(false);
  const {username} = getItem('userdetails', true);
  const link = isLoggedIn
    ? `https://www.kicksciti.com/product/${id}?id=${username}`
    : `https://www.kicksciti.com/product/${id}`;
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
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
            style={styles.iconContainer}>
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
        style={styles.linkContainer}>
        <SmallText style={styles.linkText}>{link}</SmallText>
        <CopySvg color={'white'} width={20} height={20} />
      </TouchableOpacity>
      <Dialog
        open={open}
        closeModal={() => {
          setOpen(false);
        }}>
        <View style={styles.dialogContent}>
          <RegularTextB style={styles.dialogTitle}>Affiliate Link</RegularTextB>
          <SmallText>
            Grab your unique Affiliate Link and share it. When friends use it to
            make a purchase, you get a commission!{'\n\n'}It's that simple.
            Share the love, earn rewards. Happy sharing!
          </SmallText>
          <SmallText style={styles.dialogCommissionText}>
            Product Commission: ₦{' '}
            {formatNumberWithCommas(affiliate_commission ?? 1000)}
          </SmallText>
        </View>
      </Dialog>
    </View>
  );
};

export default AffilateLink;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginLeft: 5,
  },
  linkContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: 'white',
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  linkText: {
    flex: 1,
    textAlignVertical: 'center',
  },
  dialogContent: {
    padding: 5,
  },
  dialogTitle: {
    marginBottom: 10,
  },
  dialogCommissionText: {
    marginTop: 5,
  },
});
