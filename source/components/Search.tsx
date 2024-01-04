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
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    fontFamily: 'Gilroy-SemiBold',
    paddingVertical: 0,
    height: 45,
    marginLeft: 7,
    flex: 1,
    paddingHorizontal: 0,
    color: 'black',
  },
});
