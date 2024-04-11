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
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 5,
    marginTop: 15,
    width: '90%',
  },
  recentText: {
    fontSize: 15,
    color: 'rgba(81, 82, 86, 0.80)',
  },
  recentType: {
    backgroundColor: '#D2E4E3',
    borderRadius: '50%',
    padding: '3%',
  },
  text: {
    fontSize: 17,
    color: 'black',
    marginTop: 5,
    marginBottom: 5,
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginTop: 5,
  },
  image: {
    marginRight: 10,
  },
  resultText: {
    marginBottom: 15,
  },
});

export default SearchBarStyle;
