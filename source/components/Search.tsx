import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SearchSvg from '../assets/svg/icons/search.svg';
import FilterSvg from '../assets/svg/icons/filter.svg';

const Search = ({search, setSearch}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
      }}>
      <SearchSvg width={23} height={23} />
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search"
        placeholderTextColor="black"
        style={{
          fontFamily: 'Gilroy-SemiBold',
          paddingVertical: 0,
          height: 45,
          marginLeft: 7,
          flex: 1,
          paddingHorizontal: 0,
          color: 'black',
        }}
      />
      {/* <TouchableOpacity>
        <FilterSvg width={23} height={23} />
      </TouchableOpacity> */}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
