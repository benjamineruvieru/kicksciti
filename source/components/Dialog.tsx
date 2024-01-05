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
  DimensionValue,
  ListRenderItem,
} from 'react-native';
import React, {useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import Colors from '../constants/Colors';
import {RegularText, SmallText} from './Text';
import Down from '../assets/svg/down.svg';
import {capitalizeFirstLetter} from '../utilis/Functions';

interface DialogProps {
  color?: string;
  radius?: number;
  style?: any;
  open: boolean;
  notclosable?: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = props => {
  const {color = Colors.bg, radius = 20} = props;

  const styles = StyleSheet.create({
    pressable: {
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
      flex: 1,
      justifyContent: 'center',
    },
    view: {
      backgroundColor: color,
      borderRadius: radius,
      maxHeight: '50%',
      padding: 10,
      width: '85%',
      zIndex: 10,
      ...props.style,
    },
  });

  const onRequestClose = () => {
    props.closeModal();
  };

  const onPress = () => {
    if (!props.notclosable) {
      props.closeModal();
    }
  };
  return (
    <Modal
      statusBarTranslucent
      visible={props.open}
      transparent={true}
      animationType="fade"
      onRequestClose={onRequestClose}>
      <Pressable onPress={onPress} style={styles.pressable}>
        <Pressable style={styles.view}>{props.children}</Pressable>
      </Pressable>
    </Modal>
  );
};

interface ListDialogProps {
  open: boolean;
  closeModal: () => void;
  onPress: (item: string) => void;
  data: string[];
  searchShow: boolean | undefined;
  height?: DimensionValue | number;
  multi?: boolean;
  selected?: string | string[];
}

export const ListDialog: React.FC<ListDialogProps> = ({
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
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 8,
      paddingVertical: 12,
    },
    mainView: {height, width: '100%'},
    searchView: {
      borderColor: Colors.tabColor,
      borderRadius: 10,
      borderWidth: 1,
      marginVertical: 10,
      paddingHorizontal: 10,
    },
    textInput: {
      color: 'white',
      fontFamily: 'Gilroy-Regular',
      height: 40,
    },
  });

  const RenderList = ({item}: {item: string}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSearch('');
          onPress(item);
          if (!multi) {
            closeModal();
          }
        }}
        style={styles.countrydialogtouchable}>
        <SmallText
          style={{
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

  const ItemSeparatorComponent = () => (
    <View
      style={{
        backgroundColor: Colors.tabColor,
        height: 1,
        width: '100%',
      }}
    />
  );

  const ListEmptyComponent = () => (
    <View
      style={{
        height: Dimensions.get('window').height * 0.5,
        justifyContent: 'center',
      }}>
      <ActivityIndicator />
    </View>
  );
  return (
    <Dialog open={open} closeModal={closeModal} style={{alignItems: 'center'}}>
      <View style={styles.mainView}>
        {searchShow && (
          <View style={styles.searchView}>
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
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </Dialog>
  );
};

interface DropDownProps {
  selected: string | null;
  setSelected: (data: string | null) => void;
  placeholder: string;
  data: string[];
  bottom?: number;
  size?: number;
  height?: DimensionValue;
  disabled?: boolean;
  search?: boolean;
}

export const DropDown: React.FC<DropDownProps> = ({
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
  const styles = StyleSheet.create({
    touchable: {
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
      borderRadius: 10,
      flexDirection: 'row',
      height: 55,
      justifyContent: 'space-between',
      marginVertical: 4,
      paddingHorizontal: 15,
    },
  });
  return (
    <View style={{marginTop: 2, marginBottom: bottom}}>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => setModalVisible(true)}
        style={styles.touchable}>
        <Text
          style={{
            color: '#979797',
            fontFamily: 'Poppins-regular',
            fontSize: size,
          }}>
          {selected ? selected : placeholder}
        </Text>
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

interface DropDownSelectorProps {
  data: string[];
  setSelected: (prev: string | string[]) => string[];
  placeholdertext?: string;
  selected: string | string[];
  placeholder: string;
  search?: boolean;
  bottom?: number;
  height?: DimensionValue;
  multi?: boolean;
  disabled?: boolean;
}

export const DropDownSelector: React.FC<DropDownSelectorProps> = ({
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

  const onPress = data => {
    if (multi) {
      setSelected((prev: string | string[]) => {
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
  };
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
            ? Array.isArray(selected) && selected.length > 0
              ? selected.map(d => d).join(', ')
              : placeholder
            : selected && typeof selected === 'string'
            ? capitalizeFirstLetter(selected)
            : placeholder}
        </SmallText>
        <Down />
      </TouchableOpacity>

      <ListDialog
        open={modalVisible}
        onPress={onPress}
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
