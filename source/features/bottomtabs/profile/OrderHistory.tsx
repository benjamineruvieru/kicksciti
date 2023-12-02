import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Mainbackground from '../../../components/Mainbackground';
import PageHeader from '../../../components/PageHeader';
import {useApi} from '../../../hooks/useApi';
import {fetchOrders} from '../../../api/order';
import {getPercentWidth} from '../../../utilis/Functions';
import {RegularTextB, SmallText} from '../../../components/Text';
import Colors from '../../../constants/Colors';
import {FlashList} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';

const EmptyHistory = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 130,
      }}>
      <Image
        resizeMode="contain"
        style={{
          width: getPercentWidth(75),
          height: getPercentWidth(75),
          top: -10,
        }}
        source={require('../../../assets/images/illustrations/emptyorders.png')}
      />
      <RegularTextB style={{marginBottom: 5}}>
        Your order history is currently empty.
      </RegularTextB>
      <SmallText style={{textAlign: 'center'}}>
        Start shopping and watch this space fill up with your stylish
        selections. Happy shopping!
      </SmallText>
    </View>
  );
};

const Wrapper = ({children, item}) => {
  return <TouchableOpacity>{children}</TouchableOpacity>;
};

const OrderItem = ({item}) => {
  const {products, totalamount, order_id, createdAt, lga} = item ?? {};
  console.log(item);
  return (
    <Wrapper>
      <FastImage />
      <RegularTextB>Hi</RegularTextB>
    </Wrapper>
  );
};

const HistoryList = ({orders}) => {
  return <FlashList data={orders} renderItem={OrderItem} />;
};
const OrderHistory = () => {
  const {data, isLoading} = useApi({
    queryFn: fetchOrders,
    queryKey: ['fetchOrders'],
  });
  const orders = data?.orders;
  console.log('data', data);
  return (
    <Mainbackground padding={20}>
      <PageHeader title={'Order History'} />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : !orders || orders.length === 0 ? (
        <EmptyHistory />
      ) : (
        <HistoryList orders={orders} />
      )}
    </Mainbackground>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({});
