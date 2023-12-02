import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {SmallTextB} from '../../../../components/Text';
import Colors from '../../../../constants/Colors';
import {useApi} from '../../../../hooks/useApi';
import {getCategories} from '../../../../api/products';
import {capitalizeAllFirstLetters} from '../../../../utilis/Functions';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {SCREEN_WIDTH} from '../../../../constants/Variables';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const DATA = ['Nike', 'Adidas', 'Louis Vuittoin', 'Prada', 'Puma', 'Vans'];

const Catergoies = ({category, setCategory}) => {
  const {data, isLoading} = useApi({
    queryFn: getCategories,
    queryKey: ['getCategories'],
  });
  let flatListRef = useRef(null);
  const goToIndex = i => {
    // @ts-ignore
    flatListRef.current.scrollToIndex({
      index: i,
      animated: true,
    });
  };

  const RenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCategory(item.toLowerCase());
          goToIndex(index);
        }}
        style={{
          marginRight: 15,
          backgroundColor:
            item.toLowerCase() === category ? Colors.highlight : 'transparent',
          paddingHorizontal: 20,
          paddingVertical: 13,
          borderRadius: 5,
        }}>
        <SmallTextB>{capitalizeAllFirstLetters(item)}</SmallTextB>
      </TouchableOpacity>
    );
  };
  const WIDTH = (SCREEN_WIDTH - 70) / 3;
  return (
    <View>
      {isLoading ? (
        <View style={{paddingVertical: 15, flexDirection: 'row'}}>
          <ShimmerPlaceHolder
            style={{height: 40, borderRadius: 5, marginRight: 15, width: WIDTH}}
            shimmerColors={['#263238', '#78909c', '#263238']}
          />
          <ShimmerPlaceHolder
            style={{height: 40, borderRadius: 5, marginRight: 15, width: WIDTH}}
            shimmerColors={['#263238', '#78909c', '#263238']}
          />
          <ShimmerPlaceHolder
            style={{height: 40, borderRadius: 5, marginRight: 15, width: WIDTH}}
            shimmerColors={['#263238', '#78909c', '#263238']}
          />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginBottom: 15, marginTop: 15}}
          data={['hottest products', ...(data?.categories ?? [])]}
          renderItem={RenderItem}
        />
      )}
    </View>
  );
};

export default Catergoies;

const styles = StyleSheet.create({});
