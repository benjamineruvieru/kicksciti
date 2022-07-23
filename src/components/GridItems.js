import React, {memo} from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon, {Icons} from '../components/Icons';
import defaultimg from '../assets/img/png.png';
import {storeData, Colors} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {add_favorties, put_favorties} from '../redux/actions/headeraction';
import {DBAddFav, DBRevFav} from '../constants/Functions';
import {numberWithCommas} from '../constants/Functions';
const width = Dimensions.get('window').width;
const rwidth = width - 32;
const mwidth = rwidth / 2;

const GridItems = props => {
  const navigation = useNavigation();
  const favList = useSelector(state => state.favList);
  const {name, link1, price, item, index} = props;
  const dispatch = useDispatch();

  const addFav = () => {
    var date = Date.now();
    dispatch(put_favorties(date + item.id));
    DBAddFav(date + item.id);

    const newlist = [item];
    newlist[0].fav = date;
  };
  const favv = () => {
    if (favList.findIndex(u => u.includes(item.id)) > -1) {
      const newlist = [item];
      newlist[0].fav = 'no';

      storeData(
        'favorites',
        JSON.stringify(
          favList.filter(main => main.substring(13, main.length) !== item.id),
        ),
      );
      dispatch(
        add_favorties(
          favList.filter(main => main.substring(13, main.length) !== item.id),
        ),

        DBRevFav(
          ...favList.filter(
            main => main.substring(13, main.length) === item.id,
          ),
        ),
      );
    } else {
      addFav();
    }
  };

  return (
    <View
      style={{
        width: mwidth,
        marginBottom: 35,
        overflow: 'hidden',
        marginLeft: index % 2 === 0 ? 10 : 5,
        marginRight: index % 2 === 0 ? 5 : 10,
      }}>
      <TouchableOpacity
        delayPressIn={0}
        onPress={() => {
          navigation.navigate('Details', {
            item: item,
            index: index,
          });
        }}>
        <Image
          defaultSource={defaultimg}
          source={{uri: link1}}
          style={styles.img}
        />

        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
          }}>
          <Text numberOfLines={1} style={styles.textnameStyle}>
            {name}
          </Text>

          <View style={styles.favbutstyle}>
            <TouchableOpacity delayPressIn={0} onPress={favv}>
              <Icon
                type={Icons.AntDesign}
                name={
                  favList.findIndex(u => u.includes(item.id)) < 0
                    ? 'hearto'
                    : 'heart'
                }
                color={Colors.primary}
                size={23}
              />
            </TouchableOpacity>
          </View>
        </View>
        {price.includes(',') ? (
          <Text style={styles.textpriceStyle}>₦ {price}</Text>
        ) : (
          <Text style={styles.textpriceStyle}>₦ {numberWithCommas(price)}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: mwidth,
    width: mwidth,
    borderRadius: 10,
    marginBottom: 20,
  },
  textnameStyle: {
    color: Colors.textGrey,
    fontFamily: 'Gilroy-SemiBold',
    width: '84%',
  },
  favbutstyle: {top: 0, right: 0, marginLeft: 2, zIndex: 6},
  textpriceStyle: {
    color: Colors.textGrey,
    fontFamily: 'Gilroy-SemiBold',
    width: mwidth,
  },
});

export default memo(GridItems);
