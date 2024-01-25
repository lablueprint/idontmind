import { StyleSheet } from 'react-native';

const SearchBarStyle = StyleSheet.create({
  container: {
    height: 400,
    marginTop: 30,
    marginLeft: 40,
  },

  rowContainer: {
    flexDirection: 'row',
  },

  searchbar: {
    height: 40,
    backgroundColor: '#D9D9D9',
    color: 'black',
    width: '80%',
    borderRadius: 15,
    padding: 10,
  },

  recentSearch: {
    width: 149,
    height: 29,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },

  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default SearchBarStyle;
