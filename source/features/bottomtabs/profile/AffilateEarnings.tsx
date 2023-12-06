import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Mainbackground from '../../../components/Mainbackground';
import PageHeader from '../../../components/PageHeader';
import Colors from '../../../constants/Colors';
import {
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
import Button from '../../../components/Button';
import LayoutAnimationComponent from '../../../components/LayoutAnimationComponent';
import {useApi} from '../../../hooks/useApi';
import {getEarnings} from '../../../api/user';

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

const Balance = ({inset, rewardBalance, holdingrewardBalance}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.bg,
        elevation: 20,
        borderRadius: 5,
        padding: 20,
        position: 'absolute',
        top:
          Platform.OS === 'ios' ? inset.top + 70 : StatusBar.currentHeight + 70,
        left: 20,
        right: 20,
        shadowColor: 'black',
        shadowOffset: {height: 2, width: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
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
          {rewardBalance > 0 ? formatNumberWithCommas(rewardBalance) : '0.00'}
        </MediumText>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 360,
            padding: 10,
          }}>
          <SmallText>Withdraw</SmallText>
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

const AffilateEarnings = () => {
  const inset = useSafeAreaInsets();
  const {data} = useApi({queryFn: getEarnings, queryKey: ['getEarnings']});

  console.log('data', data);
  return (
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
        }}>
        <PageHeader title={'Earnings'} />
      </View>
      <Balance {...{inset, ...(data ?? {})}} />
      <EmptyEarnings />
    </Mainbackground>
  );
};

export default AffilateEarnings;

const styles = StyleSheet.create({});
