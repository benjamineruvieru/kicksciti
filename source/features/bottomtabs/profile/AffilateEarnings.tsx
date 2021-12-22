import {
  ActivityIndicator,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Mainbackground from '../../../components/Mainbackground';
import PageHeader from '../../../components/PageHeader';
import Colors from '../../../constants/Colors';
import {
  formatAmount,
  formatNumberWithCommas,
  getPercentHeight,
  getPercentWidth,
  showNotification,
} from '../../../utilis/Functions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  MediumText,
  RegularText,
  RegularTextB,
  SmallText,
} from '../../../components/Text';
import LayoutAnimationComponent from '../../../components/LayoutAnimationComponent';
import {useApi} from '../../../hooks/useApi';
import {getBanks, getEarnings} from '../../../api/user';
import {FlashList} from '@shopify/flash-list';
import EarnSvg from '../../../assets/svg/profile/earn.svg';
import WithdrawModal from './components/WithdrawModal';
import PinModal from './components/PinModal';
import {formatTimestamp} from './OrderHistory';

const EmptyEarnings = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
      }}>
      <LayoutAnimationComponent delay={300}>
        <Image
          resizeMode="contain"
          style={{
            width: getPercentWidth(65),
            height: getPercentWidth(65),
            top: -5,
          }}
          source={require('../../../assets/images/illustrations/empty-earnings.png')}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={400}>
        <RegularTextB style={{marginBottom: 5}}>
          Oops, it looks like you have no earnings!
        </RegularTextB>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={500}>
        <SmallText style={{textAlign: 'center'}}>
          Start sharing your affilate links with friends to turn that zero
          {'\n'}into a hero!
        </SmallText>
      </LayoutAnimationComponent>
    </View>
  );
};

const Balance = ({
  openModal,
  rewardBalance,
  holdingrewardBalance,
  setBalanceHeight,
}) => {
  return (
    <View
      onLayout={e => {
        console.log('height', e.nativeEvent.layout.height);
        setBalanceHeight(e.nativeEvent.layout.height);
      }}
      style={{
        backgroundColor: Colors.bg,
        elevation: 15,
        borderRadius: 5,
        padding: 20,
        shadowColor: 'black',
        shadowOffset: {height: 2, width: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        zIndex: 1,
      }}>
      <RegularText>Available balance</RegularText>
      <View
        style={{
          alignItems: 'center',
          marginTop: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 18,
        }}>
        <MediumText style={{fontSize: 40}}>
          <RegularTextB>₦</RegularTextB>{' '}
          {formatNumberWithCommas(parseFloat(rewardBalance).toFixed(2))}
        </MediumText>
        <TouchableOpacity
          onPress={() => {
            if (parseInt(rewardBalance) > 0) {
              openModal();
            } else {
              showNotification({msg: 'Insufficient Balance', error: true});
            }
          }}
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 360,
            padding: 10,
          }}>
          <SmallText
            onPress={() => {
              if (parseInt(rewardBalance) > 0) {
                openModal();
              } else {
                showNotification({msg: 'Insufficient Balance', error: true});
              }
            }}>
            Withdraw
          </SmallText>
        </TouchableOpacity>
      </View>
      <SmallText>
        Pending balance: ₦{' '}
        {holdingrewardBalance > 0
          ? formatNumberWithCommas(holdingrewardBalance)
          : '0.00'}
      </SmallText>
    </View>
  );
};

const EarnItem = ({item}) => {
  const {amount, description, createdAt} = item ?? {};
  console.log(item);
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#1c2429',
        marginBottom: 20,
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {height: 2, width: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
      }}>
      <View
        style={{
          width: 40,
          height: 40,
          marginRight: 15,
          backgroundColor: Colors.primary,
          borderRadius: 360,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <EarnSvg color={'white'} width={25} height={25} />
      </View>
      <View style={{flex: 1, justifyContent: 'space-around'}}>
        <MediumText style={{marginBottom: 5, fontSize: 20}}>
          {formatAmount(amount)}
        </MediumText>
        <SmallText>{description}</SmallText>
        <SmallText style={{color: Colors.tabBlur, marginTop: 8}}>
          {formatTimestamp(createdAt)}
        </SmallText>
      </View>
    </View>
  );
};

const Earnings = ({rewards}) => {
  return (
    <FlashList
      estimatedItemSize={104}
      showsVerticalScrollIndicator={false}
      data={rewards}
      renderItem={EarnItem}
    />
  );
};

const AffilateEarnings = () => {
  const inset = useSafeAreaInsets();
  const {data, isLoading, refetch} = useApi({
    queryFn: getEarnings,
    queryKey: ['getEarnings'],
  });
  const rewards = data?.rewards?.reverse() ?? [];
  const modalRef = useRef();
  const pinmodalRef = useRef();

  const openModal = () => {
    modalRef.current.open();
  };
  const [balanceHeight, setBalanceHeight] = useState(0);
  const TOP =
    Platform.OS === 'ios' ? inset.top + 50 : StatusBar.currentHeight + 50;
  const remainingSpace = 200 - TOP;
  const [fee, setFee] = useState();
  const [amount, setAmount] = useState();
  const [account_number, setaccount_number] = useState('');
  const [bank, setBank] = useState();
  const [name, setName] = useState();

  const {data: bankData} = useApi({queryFn: getBanks, queryKey: ['getBanks']});

  const account_bank = bankData?.data?.find(item => item.name === bank);
  console.log('account_bank', account_bank);
  return (
    <>
      <Mainbackground top={-1}>
        <View
          style={{
            backgroundColor: Colors.primary,
            height: 200,
            paddingTop:
              Platform.OS === 'ios'
                ? inset.top + 20
                : StatusBar.currentHeight + 20,
            paddingHorizontal: 20,
            zIndex: 1,
          }}>
          <PageHeader title={'Earnings'} />
          <Balance
            {...{inset, openModal, TOP, setBalanceHeight, ...(data ?? {})}}
          />
        </View>
        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        ) : rewards.length > 0 ? (
          <View
            style={{
              flex: 1,
              paddingTop: balanceHeight - remainingSpace + 40,
            }}>
            <Earnings rewards={rewards} />
          </View>
        ) : (
          <EmptyEarnings />
        )}
      </Mainbackground>
      <WithdrawModal
        {...{
          modalRef,
          pinmodalRef,
          account_number,
          amount,
          fee,
          setaccount_number,
          setAmount,
          setFee,
          account_bank,
          bank,
          setBank,
          bankData,
          name,
          setName,
        }}
      />
      <PinModal
        {...{
          modalRef: pinmodalRef,
          account_bank,
          account_number,
          amount,
          fee,
          refetch,
          setBank,
          setFee,
          setaccount_number,
          setAmount,
          setName,
        }}
      />
    </>
  );
};

export default AffilateEarnings;

const styles = StyleSheet.create({});
