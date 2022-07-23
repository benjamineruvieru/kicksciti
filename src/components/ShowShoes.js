import {View, Dimensions, RefreshControl, LayoutAnimation} from 'react-native';
import GridItems from '../components/GridItems';
import React, {useState, useEffect, useRef} from 'react';
import Colors from '../constants/Colors';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

const ShowShoes = props => {
  const flatref = React.useRef();
  const {width} = Dimensions.get('window');
  const mwidth = width / 2;

  var jsonValue3 = [];
  let map = props.list;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    jsonValue3 = map.sort(() => Math.random() - 0.5);

    setTimeout(() => {
      setRefreshing(false);
      map = jsonValue3;
    }, 2500);
  };

  const [dataprovider, setDataprovider] = useState(
    new DataProvider((r1, r2) => {
      return r1 !== r2;
    }),
  );
  useEffect(() => {
    setDataprovider(dataprovider.cloneWithRows(map));
    flatref.current.scrollToOffset({animated: true, offset: 0});
  }, [map]);
  let layoutProvider = useRef(
    new LayoutProvider(
      index => {
        return index;
      },
      (type, dim) => {
        dim.width = mwidth;
        dim.height = mwidth + mwidth / 2.5;
      },
    ),
  ).current;
  rowRenderer = (type, item) => {
    return (
      <GridItems
        name={item.name}
        link1={item.link1}
        price={item.price}
        index={type}
        item={item}
      />
    );
  };
  function renderList() {
    return (
      <View style={{flex: 1}}>
        <RecyclerListView
          ref={flatref}
          dataProvider={dataprovider}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
          forceNonDeterministicRendering
          refreshControl={
            <RefreshControl
              onRefresh={() => onRefresh()}
              refreshing={refreshing}
              tintColor={Colors.primary}
            />
          }
          contentContainerStyle={{paddingBottom: mwidth / 2}}
        />
      </View>
    );
  }

  return <View style={{flex: 1, paddingTop: 17}}>{renderList()}</View>;
};

export default ShowShoes;
