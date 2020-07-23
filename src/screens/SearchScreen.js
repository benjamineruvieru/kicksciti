import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors';
import {BackHandler} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon, {Icons} from '../components/Icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NoInternetLottie} from '../components/LittleComp';
import {getData} from '../constants';

const width = Dimensions.get('window').width;
const rwidth = width - 32;
const mwidth = rwidth / 2;

const SearchScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  var jsonValue1 = [];
  var list3 = [];
  var list2 = [];
  var list5 = [];

  const [list4, setList] = useState(null);
  const {item} = route.params;
  useEffect(() => {
    const backAction2 = () => {
      navigation.goBack();
      return true;
    };

    const backHandler2 = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction2,
    );

    return () => backHandler2.remove();
  }, [navigation]);

  useEffect(() => {
    const init = async () => {
      let json = await getData('map');
      let i = 0;
      json.map(() => {
        jsonValue1 = json[i].keywords;
        let jsonValue = [];
        while (jsonValue1.includes(',')) {
          jsonValue.push(jsonValue1.substring(0, jsonValue1.indexOf(',')));
          jsonValue1 = jsonValue1.substring(
            jsonValue1.indexOf(',') + 1,
            jsonValue1.length,
          );
        }
        jsonValue.push(jsonValue1);
        let score = 0;
        let l = 0;

        jsonValue.map(m => {
          l++;

          if (item.toLowerCase().includes(m)) {
            score++;
          }
          if (l === jsonValue.length) {
            if (score > 0) {
              list2 = [];
              list2.push(score);
              list2.push(json[i].id);
              list3.push(list2);
            }
          }
        });
        i++;
        if (i === json.length) {
          var o = 0;
          list3.map(() => {
            json.map((my, index) => {
              if (my.id === list3[o][1]) {
                json[index].score = list3[o][0];
                list5.push(json[index]);
              }
            });
            o++;
          });
          list5.sort((a, b) => b.score - a.score);
          setList(list5);
        }
      });
    };
    init();
  }, []);

  i = 0;

  const renderItem = item => {
    return (
      <View
        style={{
          width: mwidth,
          marginBottom: 35,
          overflow: 'hidden',
          marginLeft: item.index % 2 === 0 ? 10 : 5,
          marginRight: item.index % 2 === 0 ? 5 : 10,
        }}>
        <TouchableOpacity
          delayPressIn={0}
          onPress={() => {
            navigation.navigate('Details', {
              item: item.item,
              index: item.index,
            });
          }}>
          <Image source={{uri: item.item.link1}} style={styles.img} />
          <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
            <Text numberOfLines={1} style={styles.textname}>
              {item.item.name}
            </Text>

            <View style={{top: 0, right: 0, marginLeft: 2, zIndex: 6}} />
          </View>
          {item.item.price.includes(',') ? (
            <Text
              style={{
                color: Colors.textGrey,
                fontFamily: 'Gilroy-SemiBold',
                width: mwidth,
              }}>
              ₦ {item.item.price}
            </Text>
          ) : item.item.price.length <= 4 ? (
            <Text
              style={{
                color: Colors.textGrey,
                fontFamily: 'Gilroy-SemiBold',
                width: mwidth,
              }}>
              ₦ {item.item.price}
            </Text>
          ) : (
            <Text
              style={{
                color: Colors.textGrey,
                fontFamily: 'Gilroy-SemiBold',
                width: mwidth,
              }}>
              ₦ {item.item.price.substring(0, 2)},
              {item.item.price.substring(2, item.item.price.length)}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  const flatref = useRef();

  const emptyList = () => {
    return list4 === null ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator />
      </View>
    ) : (
      <NoInternetLottie text={'Item Not Found'} />
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: Colors.bag1Bg, flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 16,
        }}>
        <TouchableOpacity
          delayPressIn={0}
          activeOpacity={0.3}
          onPress={() => navigation.goBack()}>
          <Icon
            type={Icons.Ionicons}
            name={'chevron-back'}
            color={Colors.primary}
            size={27}
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: 'Versatylo Rounded',
              fontSize: 23,
              color: Colors.primary,
              fontWeight: 'normal',
            }}>
            <Text
              style={{
                fontSize: 26,
                fontFamily: 'LubalinGraphStd-Demi',
              }}>
              S
            </Text>
            earch{' '}
            <Text
              style={{
                fontSize: 26,
                fontFamily: 'LubalinGraphStd-Demi',
              }}>
              R
            </Text>
            esults
          </Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            color: Colors.textGrey,
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 15,
            marginVertical: 26,
            marginLeft: 16,
          }}>
          {item}
        </Text>
        <FlatList
          data={list4}
          initialNumToRender={6}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          maxToRenderPerBatch={6}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ref={flatref}
          ListEmptyComponent={emptyList}
          contentContainerStyle={{
            flex: list4 === null ? 1 : list4?.length > 0 ? 0 : 1,
            paddingBottom: 50,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  img: {
    backgroundColor: Colors.bag4Bg,
    height: mwidth,
    width: mwidth,
    borderRadius: 10,
    marginBottom: 20,
  },
  textname: {
    color: Colors.textGrey,
    fontFamily: 'Gilroy-SemiBold',
    width: '84%',
  },
});
