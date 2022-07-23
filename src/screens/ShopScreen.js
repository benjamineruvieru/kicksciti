import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Svg from '../components/Svg';
import Shimmer from '../components/Shimmer';
import ShowShoes from '../components/ShowShoes';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import {getData, storeData, categoryData, Colors} from '../constants';
import {useDispatch} from 'react-redux';
import {NoInternetLottie} from '../components/LittleComp';
import {put_network} from '../redux/actions/headeraction';
import axios from 'axios';
import {GIT_TOKEN} from '@env';
import RNBootSplash from 'react-native-bootsplash';

const ShopScreen = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const [network, setNetwork] = useState(true);
  const [data, setData] = useState(null);
  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState({
    id: 1,
    name: 'Hottest Products',
  });

  const [list, setList] = useState([]);
  var favList = null;
  useEffect(() => {
    RNBootSplash.hide({fade: true});

    async function fetchData() {
      favList = await getData('favorites');
    }
    fetchData();
    getShoes(
      'https://raw.githubusercontent.com/benjamineruvieru/kicksciti-privatefiles/main/kicksdb',
    );
  }, [favList]);

  useEffect(() => {
    if (data !== null) {
      storeData('map', JSON.stringify(data));
      if (favList !== null && favList.length > 0 && favList) {
        var i = 0;
        favList.forEach(() => {
          data.map((data1, index) => {
            if (data1.id === favList[i].substring(13, favList[i].length)) {
              data[index].fav = favList[i].substring(0, 13);
            }
          });
          i++;
        });
        filterList('hottestproducts');
      } else {
        filterList('hottestproducts');
      }
    } else {
    }
  }, [data]);

  const backUpDB = () => {
    firestore()
      .collection('BackUpServer')
      .doc('url')
      .get()
      .then(doc => {
        if (doc.exists) {
          (async function () {
            const source = axios.CancelToken.source();
            try {
              const response = await axios.get(doc.data().url, {
                timeout: 10000,
                cancelToken: source.token,
              });
              setData(await response.data);
            } catch (error) {
              source.cancel('Data fetching cancelled');
              setLoad(false);
              setNetwork(false);
            }
          })();
        }
      });
  };

  const getShoes = async url => {
    const source = axios.CancelToken.source();

    if (url !== null) {
      const AuthStr = 'token '.concat(GIT_TOKEN);
      try {
        const response = await axios.get(url, {
          headers: {Authorization: AuthStr},
          timeout: 10000,
          cancelToken: source.token,
        });
        setData(await response.data);
      } catch (error) {
        source.cancel('Data fetching cancelled');

        if (error.message === 'Request failed with status code 404') {
          backUpDB();
        } else {
          setLoad(false);
          setNetwork(false);
        }
      }
    }
  };

  function filterList(brand) {
    var tmpList1 = [];
    var tmpList2 = null;

    data.map(userData => {
      if (brand === 'hottestproducts') {
        if (userData.tag === 'hot') {
          tmpList1.push(userData);
        } else {
          null;
        }
      } else if (brand === 'justin') {
        if (userData.tag === 'hot') {
          tmpList1.push(userData);
        } else {
          null;
        }
      } else if (userData.brand === brand) {
        tmpList1.push(userData);
      } else {
        null;
      }
    });
    if (brand === 'justin') {
      tmpList2 = tmpList1.sort((a, b) => b.date - a.date);
    } else {
      tmpList2 = tmpList1.sort(() => Math.random() - 0.5);
    }
    setList(tmpList2);
    setLoad(false);
    setNetwork(true);
    dispatch(put_network(false));
  }

  function onSelectCategory(category) {
    setSelectedCategory(category);
    filterList(category.name.toLowerCase().replace(/\s+/g, ''));
  }

  function renderMainCategories() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          delayPressIn={0}
          style={{
            ...styles.tabStyle,
            backgroundColor:
              selectedCategory?.id === item.id ? Colors.bag2Bg : Colors.bag1Bg,
          }}
          onPress={() => onSelectCategory(item)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Svg name={item.name} />
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                color: Colors.white,
                paddingLeft: 5,
              }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{paddingVertical: 10}}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {load ? (
        <View style={{flex: 1}}>
          <Shimmer load={load} />
        </View>
      ) : network ? (
        <View style={{flex: 1}}>
          <View>
            <Text style={styles.text}>Categories</Text>
          </View>
          <View style={{flexDirection: 'row', paddingVertical: 10}}>
            {renderMainCategories()}
          </View>
          <ShowShoes list={list} />
        </View>
      ) : (
        <TouchableOpacity
          delayPressIn={0}
          onPress={() => {
            setLoad(true);
            getShoes(
              'https://raw.githubusercontent.com/benjamineruvieru/kicksciti-privatefiles/main/kicksdb',
            );
          }}
          style={styles.lottiestlye}>
          <NoInternetLottie />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bag1Bg,
  },

  tabStyle: {
    marginRight: 16,
    marginLeft: 16,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 360,
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    color: Colors.textGrey,
    paddingLeft: 30,
    paddingTop: 20,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 15,
  },
  lottiestlye: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 90,
  },
});

export default ShopScreen;
