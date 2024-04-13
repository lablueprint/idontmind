import { StyleSheet } from 'react-native';

const BookmarksStyle = StyleSheet.create({
  folderContainer: {
    height: 90,
    width: 100,
    backgroundColor: '#D2E4E3',
    jutifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  addContainer: {
    flex: 1,
    jutifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: 100,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  plus: {
    fontSize: 50,
    color: '#767C7C',
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
  pill: {
    backgroundColor: '#D2E4E3',

    padding: 10,
    margin: 5,

    borderRadius: 50,
  },
  pills: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    top: 100,

  },
});

export default BookmarksStyle;
