import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
import useRefetchOnRemount from '../../../hooks/useRefetchOnRemount';
import LayoutAnimationComponent from '../../../components/LayoutAnimationComponent';

export function formatTimestamp(timestamp) {
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
    daysOfWeek[dateObj.getDay()]
  } ${dateObj.getDate()} ${
    months[dateObj.getMonth()]
  } ${dateObj.getFullYear()}`;

  return formattedDate;
}

// Use getHours() and getMinutes() for local time
function get12HourTime(date) {
  const hours = date.getHours() % 12 || 12; // Use getHours() for local time
  const minutes = padZero(date.getMinutes()); // Use getMinutes() for local time
  return `${hours}:${minutes}`;
}

// Use getHours() for local time
function getAMPM(date) {
  return date.getHours() < 12 ? 'AM' : 'PM'; // Use getHours() for local time
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
      <LayoutAnimationComponent delay={300}>
        <Image
          resizeMode="contain"
          style={{
            width: getPercentWidth(75),
            height: getPercentWidth(75),
            top: -10,
          }}
          source={require('../../../assets/images/illustrations/emptyorders.png')}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={400}>
        <RegularTextB style={{marginBottom: 5}}>
          Your order history is currently empty.
        </RegularTextB>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={500}>
        <SmallText style={{textAlign: 'center'}}>
          Start shopping and watch this space fill up with your stylish
          selections. Happy shopping!
        </SmallText>
      </LayoutAnimationComponent>
    </View>
  );
};

const Wrapper = ({children, order_id, index}) => {
  const navigation = useNavigation();
  return (
    <LayoutAnimationComponent exit={null} leftInOut delay={100 + index * 100}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('OrderDetails', {order_id});
        }}
        style={{flexDirection: 'row', marginBottom: 15}}>
        {children}
      </TouchableOpacity>
    </LayoutAnimationComponent>
  );
};

const OrderItem = ({item, index}) => {
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
  return (
    <Wrapper {...{order_id, index}}>
      <FastImage
        source={{uri: pictures[0]}}
        style={{height: 100, width: 100, borderRadius: 10}}
      />
      <View style={{marginLeft: 15, justifyContent: 'space-around', flex: 1}}>
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

const HistoryList = ({orders, refetch}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <FlashList
      refreshing={refreshing}
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={58}
      data={orders}
      renderItem={OrderItem}
    />
  );
};
const OrderHistory = () => {
  const {data, isLoading, refetch} = useApi({
    queryFn: fetchOrders,
    queryKey: ['fetchOrders'],
  });
  useRefetchOnRemount(refetch);
  const orders = data?.orders;
  console.log('orders', orders);

  const sortedOrders =
    orders
      ?.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
      .reverse() ?? [];

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
        <HistoryList refetch={refetch} orders={sortedOrders} />
      )}
    </Mainbackground>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({});
