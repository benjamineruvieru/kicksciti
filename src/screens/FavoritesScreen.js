import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {getData, Colors} from '../constants';
import img from '../assets/img/nofav.png';
import {useSelector} from 'react-redux';
import GridItems from '../components/GridItems';

const width = Dimensions.get('window').width;
const rwidth = width - 32;
const mwidth = rwidth / 2;

const renderFav = item => {
  return (
    <GridItems
      name={item.item.name}
      link1={item.item.link1}
      price={item.item.price}
      index={item.index}
      item={item.item}
    />
  );
};

const FavoritesScreen = () => {
  const favList = useSelector(state => state.favList);
  const [favListm, setFavListm] = useState(null);

  const getFav = async () => {
    const mainList = await getData('map');
    var i = 0;
    let favListm1 = [];
    if (
      favList !== null &&
      favList.length > 0 &&
      mainList !== null &&
      mainList.length > 0
    ) {
      favList.forEach(() => {
        mainList.map((data1, index) => {
          if (data1.id === favList[i].substring(13, favList[i].length)) {
            favListm1.push(mainList[index]);
          }
        });
        i++;
      });
      favListm1.reverse();
      setFavListm(favListm1);
    } else {
      setFavListm([]);
    }
  };

  useEffect(() => {
    getFav();
  }, [favList]);

  const flatref = React.useRef();

  const Emptylist = () => {
    if (favListm === null) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            paddingBottom: 90,
          }}>
          <Image source={img} style={{width: 250, height: 250}} />

          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              color: Colors.white,
              fontSize: 16,
              marginTop: 20,
            }}>
            Looks Like You Don't Have Any Favorites Yet!
          </Text>
        </View>
      );
    }
  };

  const Header = () => {
    if (favListm?.length === 0 || favListm === null) {
      return null;
    } else {
      return (
        <View style={{paddingVertical: 10, paddingHorizontal: 16}}>
          <Text style={{color: Colors.textGrey, fontFamily: 'Gilroy-SemiBold'}}>
            Saved Items
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <FlatList
          data={favListm}
          extraData={favListm}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderFav}
          ListEmptyComponent={Emptylist}
          ListHeaderComponent={Header}
          numColumns={2}
          style={{flex: 1}}
          contentContainerStyle={{
            flex: favListm?.length > 0 ? 0 : 1,
            paddingBottom: favListm?.length > 0 ? mwidth / 2 : 0,
          }}
          ref={flatref}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bag1Bg,
    paddingVertical: 10,
  },
});

export default FavoritesScreen;
