import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import Mainbackground from '../../components/Mainbackground';
import PageHeader from '../../components/PageHeader';
import {useApi} from '../../hooks/useApi';
import {getOrder} from '../../api/order';
import Colors from '../../constants/Colors';
import LottieView from 'lottie-react-native';
import {SCREEN_WIDTH} from '../../constants/Variables';
import {RegularTextB, SmallText} from '../../components/Text';

const PaymentPending = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 120,
        flex: 1,
      }}>
      <LottieView
        loop
        autoPlay
        style={{
          width: SCREEN_WIDTH / 1.8,
          height: SCREEN_WIDTH / 1.8,
          top: 4,
        }}
        source={require('../../assets/lottie/pendingpayment.json')}
      />
      <RegularTextB style={{marginBottom: 5}}>
        Your payment is being confirmed
      </RegularTextB>
      <SmallText style={{textAlign: 'center'}}>
        We are confirming the payment for{'\n'}this order, please be patient
      </SmallText>
    </View>
  );
};

const OrderInfo = () => {
  return <View></View>;
};

const OrderDetails = ({route}) => {
  const {order_id} = route?.params ?? {};
  const {data, isLoading} = useApi({
    queryFn: getOrder,
    queryKey: ['getOrder', order_id],
  });
  const order = data?.order;
  console.log('da', data?.order);
  return (
    <Mainbackground padding={20}>
      <PageHeader title={'Order Details'} />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', paddingBottom: 50}}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : order.active ? null : (
        <PaymentPending />
      )}
    </Mainbackground>
  );
};

export default OrderDetails;
