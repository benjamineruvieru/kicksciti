import {
  ActivityIndicator,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
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
  const styles = StyleSheet.create({
    emptyContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      paddingBottom: 100,
    },
    emptyImage: {
      height: getPercentWidth(65),
      maxHeight: 400,
      maxWidth: 400,
      top: -5,
      width: getPercentWidth(65),
    },
    emptyText: {
      marginBottom: 5,
    },
  });
  return (
    <View style={styles.emptyContainer}>
      <LayoutAnimationComponent delay={300}>
        <Image
          resizeMode="contain"
          style={styles.emptyImage}
          source={require('../../../assets/images/illustrations/empty-earnings.png')}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={400}>
        <RegularTextB style={styles.emptyText}>
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
  const styles = StyleSheet.create({
    balanceAmount: {
      fontSize: 40,
    },
    balanceContainer: {
      backgroundColor: Colors.bg,
      borderRadius: 5,
      elevation: 15,
      padding: 20,
      shadowColor: 'black',
      shadowOffset: {height: 2, width: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      zIndex: 1,
    },
    balanceContent: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 0,
      paddingVertical: 18,
    },
    withdrawButton: {
      backgroundColor: Colors.primary,
      borderRadius: 360,
      padding: 10,
    },
  });
  return (
    <View
      onLayout={e => {
        console.log('height', e.nativeEvent.layout.height);
        setBalanceHeight(e.nativeEvent.layout.height);
      }}
      style={styles.balanceContainer}>
      <RegularText>Available balance</RegularText>
      <View style={styles.balanceContent}>
        <MediumText style={styles.balanceAmount}>
          <RegularTextB>₦</RegularTextB>{' '}
          {formatNumberWithCommas(parseFloat(rewardBalance ?? 0).toFixed(2))}
        </MediumText>
        <TouchableOpacity
          onPress={() => {
            if (parseInt(rewardBalance) > 0) {
              openModal();
            } else {
              showNotification({msg: 'Insufficient Balance', error: true});
            }
          }}
          style={styles.withdrawButton}>
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

  const styles = StyleSheet.create({
    earnIconContainer: {
      alignItems: 'center',
      backgroundColor: Colors.primary,
      borderRadius: 360,
      height: 40,
      justifyContent: 'center',
      marginRight: 15,
      width: 40,
    },
    earnItemContainer: {
      alignItems: 'center',
      backgroundColor: '#1c2429',
      borderRadius: 10,
      elevation: 10,
      flexDirection: 'row',
      marginBottom: 20,
      marginHorizontal: 20,
      padding: 15,
      shadowColor: 'black',
      shadowOffset: {height: 2, width: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
  });
  return (
    <View style={styles.earnItemContainer}>
      <View style={styles.earnIconContainer}>
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

const Earnings = ({rewards, refetch}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const sortedRewards =
    rewards
      ?.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
      .reverse() ?? [];
  return (
    <FlashList
      refreshing={refreshing}
      onRefresh={onRefresh}
      estimatedItemSize={104}
      showsVerticalScrollIndicator={false}
      data={sortedRewards}
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
  const rewards = data?.rewards ?? [];
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
  const styles = StyleSheet.create({
    earningsContainer: {
      flex: 1,
      paddingTop: balanceHeight - remainingSpace + 40,
    },
    headerContainer: {
      backgroundColor: Colors.primary,
      height: 200,
      paddingHorizontal: 20,
      paddingTop:
        Platform.OS === 'ios' ? inset.top + 20 : StatusBar.currentHeight + 20,
      zIndex: 1,
    },
  });
  return (
    <>
      <Mainbackground top={-1}>
        <View style={styles.headerContainer}>
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
          <View style={styles.earningsContainer}>
            <Earnings rewards={rewards} {...{refetch}} />
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
