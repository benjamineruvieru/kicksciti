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
import {getEarnings} from '../../../api/user';
import {FlashList} from '@shopify/flash-list';
import EarnSvg from '../../../assets/svg/profile/earn.svg';
import WithdrawModal from './components/WithdrawModal';
import {SCREEN_HEIGHT} from '../../../constants/Variables';

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
      <RegularText>Current balance</RegularText>
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
          {rewardBalance > 0
            ? formatNumberWithCommas(parseFloat(rewardBalance).toFixed(2))
            : '0.00'}
        </MediumText>
        <TouchableOpacity
          onPress={() => {
            if (parseInt(rewardBalance) > 0) {
              openModal();
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
  const {amount, description} = item ?? {};
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
          width: 55,
          height: 55,
          marginRight: 15,
          backgroundColor: Colors.primary,
          borderRadius: 360,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <EarnSvg color={'white'} width={25} height={25} />
      </View>
      <View style={{flex: 1, justifyContent: 'space-around'}}>
        <MediumText style={{marginBottom: 5}}>
          {formatAmount(amount)}
        </MediumText>
        <SmallText>{description}</SmallText>
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
  const openModal = () => {
    modalRef.current.open();
  };
  const [balanceHeight, setBalanceHeight] = useState(0);
  const TOP =
    Platform.OS === 'ios' ? inset.top + 50 : StatusBar.currentHeight + 50;
  const remainingSpace = 200 - TOP;
  console.log(TOP);
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
      <WithdrawModal {...{modalRef, refetch}} />
    </>
  );
};

export default AffilateEarnings;

const styles = StyleSheet.create({});
