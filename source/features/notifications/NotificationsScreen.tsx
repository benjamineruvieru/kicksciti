import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Mainbackground from '../../components/Mainbackground';
import PageHeader from '../../components/PageHeader';
import {getPercentWidth, insertDateItems} from '../../utilis/Functions';
import {RegularTextB, SmallText} from '../../components/Text';
import LayoutAnimationComponent from '../../components/LayoutAnimationComponent';
import {useInfiniteApi} from '../../hooks/useApi';
import {getNotifications} from '../../api/user';
import {FlashList} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import useRefetchOnRemount from '../../hooks/useRefetchOnRemount';
import {setItem} from '../../utilis/storage';

const EmptyNoti = () => {
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
            width: getPercentWidth(70),
            height: getPercentWidth(70),
            maxWidth: 400,
            maxHeight: 400,
            top: -5,
          }}
          source={require('../../assets/images/illustrations/emptynoti.png')}
        />
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={400}>
        <RegularTextB style={{marginBottom: 5}}>
          No notifications at the moment.
        </RegularTextB>
      </LayoutAnimationComponent>
      <LayoutAnimationComponent delay={500}>
        <SmallText style={{textAlign: 'center'}}>
          Stay tuned for updates, amazing deals and exciting news!
        </SmallText>
      </LayoutAnimationComponent>
    </View>
  );
};

const Wrapper = ({children, item, index}) => {
  const navigation = useNavigation();
  const {data, action} = item;
  const onPress = () => {
    switch (action) {
      case 'open-product': {
        console.log(data.product);
        navigation.navigate('ProductScreen', data.product);
        break;
      }
      case 'open-order': {
        console.log(data.order_id);
        navigation.navigate('OrderDetails', {order_id: data.order_id});
        break;
      }
    }
  };
  return (
    <LayoutAnimationComponent exit={null} rightInOut delay={100 + index * 100}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingVertical: 15,
          borderBottomWidth: 1,
          borderColor: Colors.highlight,
          flexDirection: 'row',
        }}>
        {children}
      </TouchableOpacity>
    </LayoutAnimationComponent>
  );
};

const NotificationItem = ({item, index}) => {
  const {image, date, body, title, action} = item;
  return date ? (
    <LayoutAnimationComponent exit={null} rightInOut delay={100 + index * 100}>
      <SmallText style={{marginTop: 15}}>{date}</SmallText>
    </LayoutAnimationComponent>
  ) : (
    <Wrapper {...{index, item}}>
      {action === 'open-product' ? (
        <SharedElement id={image}>
          <FastImage
            source={{uri: image}}
            style={{width: 65, height: 65, marginRight: 15}}
          />
        </SharedElement>
      ) : (
        <FastImage
          source={{uri: image}}
          style={{width: 65, height: 65, marginRight: 15}}
        />
      )}
      <View style={{flex: 1, justifyContent: 'center'}}>
        <RegularTextB style={{marginBottom: 3}}>{title}</RegularTextB>
        <SmallText>{body}</SmallText>
      </View>
    </Wrapper>
  );
};

const Notifications = ({
  notifications,
  refetch,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <FlashList
      keyExtractor={(item, i) => i.toString()}
      refreshing={refreshing}
      onRefresh={onRefresh}
      estimatedItemSize={76}
      showsVerticalScrollIndicator={false}
      data={notifications}
      renderItem={NotificationItem}
      ListFooterComponent={() =>
        isFetchingNextPage && (
          <View style={{paddingVertical: 15}}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        )
      }
      onEndReached={() => {
        console.log('end oo');
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
    />
  );
};
const NotificationsScreen = () => {
  const {
    data,
    isLoading,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteApi({
    queryFunction: getNotifications,
    queryKey: ['getNotifications'],
  });
  const results = data?.pages.flatMap(data => data?.notifications) ?? [];

  const notifications = insertDateItems(results);
  useRefetchOnRemount(refetch);
  useEffect(() => {
    setItem('unreadNotification', 'false');
  }, []);
  return (
    <Mainbackground padding={20}>
      <PageHeader title={'Notifications'} />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : notifications.length > 0 ? (
        <Notifications
          notifications={notifications}
          refetch={refetch}
          {...{fetchNextPage, isFetchingNextPage, hasNextPage}}
        />
      ) : (
        <EmptyNoti />
      )}
    </Mainbackground>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({});
