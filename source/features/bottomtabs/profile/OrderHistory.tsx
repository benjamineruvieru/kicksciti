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
import {
  formatNumberWithCommas,
  getPercentWidth,
} from '../../../utilis/Functions';
import {RegularText, RegularTextB, SmallText} from '../../../components/Text';
import Colors from '../../../constants/Colors';
import {FlashList} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

function formatTimestamp(timestamp) {
  const dateObj = new Date(timestamp);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const formattedDate = `${get12HourTime(dateObj)} ${getAMPM(dateObj)}, ${
    daysOfWeek[dateObj.getUTCDay()]
  } ${dateObj.getUTCDate()} ${
    months[dateObj.getUTCMonth()]
  } ${dateObj.getUTCFullYear()}`;

  return formattedDate;
}

function get12HourTime(date) {
  const hours = date.getUTCHours() % 12 || 12;
  const minutes = padZero(date.getUTCMinutes());
  return `${hours}:${minutes}`;
}

function getAMPM(date) {
  return date.getUTCHours() < 12 ? 'AM' : 'PM';
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

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

const Wrapper = ({children, order_id}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('OrderDetails', {order_id});
      }}
      style={{flexDirection: 'row', marginBottom: 15}}>
      {children}
    </TouchableOpacity>
  );
};

const OrderItem = ({item}) => {
  const {
    products,
    totalamount,
    order_id,
    createdAt,
    state,
    lga,
    status,
    status_color,
  } = item ?? {};
  const {name, pictures} = products[0].item;
  console.log(products[0].item);
  return (
    <Wrapper {...{order_id}}>
      <FastImage
        source={{uri: pictures[0]}}
        style={{height: 100, width: 100, borderRadius: 10}}
      />
      <View style={{marginLeft: 15, justifyContent: 'space-around'}}>
        <RegularTextB>
          {name} - {lga}, {state}
        </RegularTextB>
        <RegularText>
          ₦ {formatNumberWithCommas(totalamount)} • {order_id}
        </RegularText>
        <SmallText style={{color: status_color}}>{status}</SmallText>
        <SmallText style={{color: Colors.tabBlur}}>
          {formatTimestamp(createdAt)}
        </SmallText>
      </View>
    </Wrapper>
  );
};

const HistoryList = ({orders}) => {
  return (
    <FlashList estimatedItemSize={58} data={orders} renderItem={OrderItem} />
  );
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
        <HistoryList orders={orders.reverse()} />
      )}
    </Mainbackground>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({});
