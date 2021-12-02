import {
  StyleSheet,
  Modal,
  View,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Dimensions,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import Colors from '../constants/Colors';
import {RegularText, SmallText} from './Text';
import Down from '../assets/svg/down.svg';
import {capitalizeFirstLetter} from '../utilis/Functions';
export const Dialog = props => {
  const {color = Colors.bg, radius = 20} = props;

  const styles = StyleSheet.create({
    view: {
      backgroundColor: color,
      width: '85%',
      borderRadius: radius,
      zIndex: 10,
      padding: 10,
      maxHeight: '50%',
      ...props.style,
    },
  });

  return (
    <Modal
      useNativeDriver={true}
      visible={props.open}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        props.closeModal();
      }}>
      <Pressable
        onPress={() => {
          if (!props.notclosable) {
            props.closeModal();
          }
        }}
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable style={styles.view}>{props.children}</Pressable>
      </Pressable>
    </Modal>
  );
};

export const ListDialog = ({
  open,
  closeModal,
  onPress,
  data,
  searchShow,
  height = '100%',
  multi = false,
  selected = [],
}) => {
  const [search, setSearch] = useState('');

  const searchFun = () => {
    return data
      ? data.filter(data => {
          return data?.toLowerCase().includes(search.toLowerCase());
        })
      : [];
  };
  const styles = StyleSheet.create({
    countrydialogtouchable: {
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    textInput: {
      height: 40,
      fontFamily: 'Poppins-regular',
      color: 'white',
    },
  });

  const RenderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSearch();
          onPress(item);
          if (!multi) {
            closeModal();
          }
        }}
        style={styles.countrydialogtouchable}>
        <SmallText
          style={{
            fontFamily: 'QuickSand-Medium',
            color: !!multi
              ? !!selected?.find(d => d === item)
                ? Colors.primary
                : 'black'
              : 'white',
          }}>
          {item}
        </SmallText>
      </TouchableOpacity>
    );
  };
  return (
    <Dialog open={open} closeModal={closeModal} style={{alignItems: 'center'}}>
      <View style={{width: '100%', height: height}}>
        {searchShow && (
          <View
            style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.tabColor,
              paddingHorizontal: 10,
              marginVertical: 10,
            }}>
            <TextInput
              onChangeText={setSearch}
              placeholder="Search..."
              style={styles.textInput}
              placeholderTextColor={'grey'}
            />
          </View>
        )}

        <FlashList
          extraData={selected}
          estimatedItemSize={30}
          data={search ? searchFun() : data}
          renderItem={RenderList}
          ItemSeparatorComponent={() => (
            <View
              style={{
                backgroundColor: Colors.tabColor,
                height: 1,
                width: '100%',
              }}
            />
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                height: Dimensions.get('window').height * 0.5,
                justifyContent: 'center',
              }}>
              <ActivityIndicator />
            </View>
          )}
        />
      </View>
    </Dialog>
  );
};

export const DropDown = ({
  selected,
  setSelected,
  placeholder,
  data,
  bottom = 0,
  size = 14,
  height,
  disabled,
  search,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{marginTop: 2, marginBottom: bottom}}>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => setModalVisible(true)}
        style={{
          height: 55,
          backgroundColor: '#F0F0F0',
          justifyContent: 'space-between',
          borderRadius: 10,
          marginVertical: 4,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}>
        <Text
          style={{
            color: '#979797',
            fontFamily: 'Poppins-regular',
            fontSize: size,
          }}>
          {selected ? selected : placeholder}
        </Text>
        {/* <MaterialIcon name={'expand-more'} size={25} color="#000" style={{}} /> */}
      </TouchableOpacity>
      <ListDialog
        searchShow={search}
        height={height}
        data={data}
        closeModal={() => setModalVisible(false)}
        open={modalVisible}
        onPress={data => {
          setModalVisible(false);
          setSelected(data);
        }}
      />
    </View>
  );
};

export const DropDownSelector = ({
  data = [],
  setSelected,

  placeholdertext,
  selected,
  placeholder,
  search,
  bottom = 10,
  height,
  multi,
  disabled,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{marginBottom: bottom, flex: 1}}>
      {placeholdertext && (
        <RegularText style={{marginBottom: 8, marginLeft: 4}}>
          {placeholdertext}
        </RegularText>
      )}
      <TouchableOpacity
        disabled={disabled}
        onPress={() => setModalVisible(true)}
        style={{
          height: 45,

          justifyContent: 'space-between',
          borderRadius: 10,
          marginVertical: 4,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 10,
          borderWidth: 1,
          borderColor: '#0000004D',
        }}>
        <SmallText
          style={{
            color: 'black',
            fontFamily: 'Quicksand-SemiBold',
            flex: 1,
            fontSize: 14.5,
          }}>
          {multi
            ? selected.length > 0
              ? selected.map(d => d).join(', ')
              : placeholder
            : selected
            ? capitalizeFirstLetter(selected)
            : placeholder}
        </SmallText>
        <Down />
      </TouchableOpacity>

      <ListDialog
        open={modalVisible}
        onPress={data => {
          if (multi) {
            setSelected(prev => {
              const i = prev.findIndex(d => d === data);
              console.log(prev, data, i);
              if (i > -1) {
                prev.splice(i, 1);
                console.log(prev);
                return [...prev];
              } else {
                return [...prev, data];
              }
            });
          } else {
            setSelected(data);
          }
        }}
        closeModal={() => setModalVisible(false)}
        data={data}
        searchShow={search}
        height={height}
        multi={multi}
        selected={selected}
      />
    </View>
  );
};
