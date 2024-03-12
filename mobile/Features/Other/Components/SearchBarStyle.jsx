import { StyleSheet } from 'react-native';

const SearchBarStyle = StyleSheet.create({
  container: {
    height: 400,
    marginTop: 30,
    marginLeft: 40,
    paddingTop: 20,
  },

  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0%',
    zIndex: 1,
  },

  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  filtersContainer: {
    marginBottom: 20,
  },

  filterButton: {
    backgroundColor: '#D2E4E3',
    borderRadius: 50,
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  filterQuery: {
    backgroundColor: '#546967',
  },

  whiteText: {
    color: 'white',
  },

  blackText: {
    color: '#343A3A',
  },

  searchbar: {
    height: 50,
    backgroundColor: '#D9D9D9',
    color: 'black',
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
