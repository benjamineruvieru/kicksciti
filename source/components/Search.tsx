import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import SearchSvg from '../assets/svg/icons/search.svg';

interface SearchProps {
  search: string;
  setSearch: (text: string) => void;
}

const Search: React.FC<SearchProps> = ({search, setSearch}) => {
  return (
    <View style={styles.container}>
      <SearchSvg width={23} height={23} />
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search"
        placeholderTextColor="black"
        style={styles.input}
      />
      {/* <TouchableOpacity>
        <FilterSvg width={23} height={23} />
      </TouchableOpacity> */}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    color: 'black',
    flex: 1,
    fontFamily: 'Gilroy-SemiBold',
    height: 45,
    marginLeft: 7,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
