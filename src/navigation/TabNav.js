import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ShopScreen,
  ProfileScreen,
  FavoritesScreen,
  CartScreen,
} from '../screens';
import Icon, {Icons} from '../components/Icons';
import React, {useRef} from 'react';
import Colors from '../constants/Colors';
import MainHeader from '../components/MainPageHeader';
import {
  StatusBar,
  StyleSheet,
  Dimensions,
  Animated,
  Pressable,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {nav_change} from '../redux/actions/headeraction';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const width = Dimensions.get('window').width;
const spacem = width - 32 - 260;
const space = spacem / 5;

export default function TabNavigation() {
  const dispatch = useDispatch();
  const inset = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.bag1Bg,
        paddingTop: inset.top,
      }}>
      <MainHeader />
      <Tab.Navigator
        initialRouteName="Shop"
        screenListeners={({route}) => ({
          state: e => {
            if (e.data.state.index === 0) {
              dispatch(nav_change('no'));
            } else if (e.data.state.index === 1) {
              dispatch(nav_change('uuNotifications'));
            } else if (e.data.state.index === 2) {
              dispatch(nav_change('uuFavorites'));
            } else if (e.data.state.index === 3) {
              dispatch(nav_change('uuProfile'));
            }
          },
        })}
        barStyle={{
          backgroundColor: Colors.bag2Bg,
        }}
        backBehavior={'history'}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 70,
            position: 'absolute',
            bottom: 16,
            right: 16,
            left: 16,
            borderRadius: 16,
            backgroundColor: Colors.bag2Bg,
            borderColor: Colors.bag2Bg,
            borderTopColor: Colors.bag2Bg,
            alignItems: 'center',
          },
        }}>
        <Tab.Screen
          name="Shop"
          component={ShopScreen}
          options={{
            tabBarShowLabel: false,
            tabBarButton: props => {
              const translateY = useRef(new Animated.Value(10)).current;
              const scale = useRef(new Animated.Value(0)).current;

              if (props.accessibilityState.selected) {
                Animated.spring(translateY, {
                  toValue: -20,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
                Animated.spring(scale, {
                  toValue: 1,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              } else {
                Animated.spring(translateY, {
                  toValue: 10,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
                Animated.spring(scale, {
                  toValue: 0,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              }
              return (
                <Pressable
                  onPress={props.onPress}
                  style={{
                    ...styles.containerTab,
                    width: 65 + space,
                  }}>
                  <Animated.View
                    style={{
                      ...styles.btn,
                      transform: [{translateY: translateY}],
                    }}>
                    <Animated.View
                      style={{
                        ...styles.circle,
                        transform: [{scale: scale}],
                      }}
                    />
                    <Icon
                      type={Icons.MaterialCommunityIcons}
                      name={'shopping'}
                      color={
                        props.accessibilityState.selected
                          ? Colors.white
                          : Colors.bag3Bg
                      }
                    />
                  </Animated.View>
                  <Animated.Text
                    style={{
                      ...styles.text,
                      transform: [{scale: scale}, {translateY: -20}],
                    }}>
                    Shop
                  </Animated.Text>
                </Pressable>
              );
            },
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarShowLabel: false,
            tabBarButton: props => {
              const translateY = useRef(new Animated.Value(10)).current;
              const scale = useRef(new Animated.Value(0)).current;

              if (props.accessibilityState.selected) {
                Animated.parallel([
                  Animated.spring(translateY, {
                    toValue: -20,
                    duration: 300,
                    useNativeDriver: true,
                  }),
                  Animated.spring(scale, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                  }),
                ]).start();
              } else {
                Animated.parallel([
                  Animated.spring(translateY, {
                    toValue: 10,
                    duration: 300,
                    useNativeDriver: true,
                  }),
                  Animated.spring(scale, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                  }),
                ]).start();
              }
              return (
                <Pressable
                  onPress={props.onPress}
                  style={{
                    ...styles.containerTab,
                    width: 65 + space,
                  }}>
                  <Animated.View
                    style={{
                      ...styles.btn,
                      transform: [{translateY: translateY}],
                    }}>
                    <Animated.View
                      style={{
                        ...styles.circle,
                        transform: [{scale: scale}],
                      }}
                    />
                    <Icon
                      type={Icons.Ionicons}
                      name={'notifications'}
                      color={
                        props.accessibilityState.selected
                          ? Colors.white
                          : Colors.bag3Bg
                      }
                    />
                  </Animated.View>
                  <Animated.Text
                    style={{
                      ...styles.text,
                      transform: [{scale: scale}, {translateY: -20}],
                    }}>
                    Notifications
                  </Animated.Text>
                </Pressable>
              );
            },
          }}
        />
        <Tab.Screen
          name={'Favorites'}
          component={FavoritesScreen}
          options={{
            tabBarShowLabel: false,
            tabBarButton: props => {
              const translateY = useRef(new Animated.Value(10)).current;
              const scale = useRef(new Animated.Value(0)).current;

              if (props.accessibilityState.selected) {
                Animated.spring(translateY, {
                  toValue: -20,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
                Animated.spring(scale, {
                  toValue: 1,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              } else {
                Animated.spring(translateY, {
                  toValue: 10,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
                Animated.spring(scale, {
                  toValue: 0,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              }
              return (
                <Pressable
                  onPress={props.onPress}
                  style={{
                    ...styles.containerTab,
                    width: 65 + space,
                  }}>
                  <Animated.View
                    style={{
                      ...styles.btn,
                      transform: [{translateY: translateY}],
                    }}>
                    <Animated.View
                      style={{
                        ...styles.circle,
                        transform: [{scale: scale}],
                      }}
                    />
                    <Icon
                      type={Icons.MaterialIcons}
                      name={'favorite'}
                      color={
                        props.accessibilityState.selected
                          ? Colors.white
                          : Colors.bag3Bg
                      }
                    />
                  </Animated.View>
                  <Animated.Text
                    style={{
                      ...styles.text,
                      transform: [{scale: scale}, {translateY: -20}],
                    }}>
                    Favorites
                  </Animated.Text>
                </Pressable>
              );
            },
          }}
        />

        <Tab.Screen
          name={'Profile'}
          component={ProfileScreen}
          options={{
            tabBarShowLabel: false,
            tabBarButton: props => {
              const translateY = useRef(new Animated.Value(10)).current;
              const scale = useRef(new Animated.Value(0)).current;

              if (props.accessibilityState.selected) {
                Animated.spring(translateY, {
                  toValue: -20,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
                Animated.spring(scale, {
                  toValue: 1,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              } else {
                Animated.spring(translateY, {
                  toValue: 10,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
                Animated.spring(scale, {
                  toValue: 0,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              }
              return (
                <Pressable
                  onPress={props.onPress}
                  style={{
                    ...styles.containerTab,
                    width: 65 + space,
                  }}>
                  <Animated.View
                    style={{
                      ...styles.btn,
                      transform: [{translateY: translateY}],
                    }}>
                    <Animated.View
                      style={{
                        ...styles.circle,
                        transform: [{scale: scale}],
                      }}
                    />
                    <Icon
                      type={Icons.MaterialCommunityIcons}
                      name={'account'}
                      color={
                        props.accessibilityState.selected
                          ? Colors.white
                          : Colors.bag3Bg
                      }
                    />
                  </Animated.View>
                  <Animated.Text
                    style={{
                      ...styles.text,
                      transform: [{scale: scale}, {translateY: -20}],
                    }}>
                    Profile
                  </Animated.Text>
                </Pressable>
              );
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bag1Bg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerTab: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height: 70,
  },

  btn: {
    marginBottom: 5,
    width: 60,
    height: 60,
    borderRadius: 360,
    borderWidth: 5,
    borderColor: Colors.bag2Bg,
    backgroundColor: Colors.bag2Bg,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },

  text: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.primary,
    fontFamily: 'Gilroy-SemiBold',
    height: 13,
  },

  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
});
