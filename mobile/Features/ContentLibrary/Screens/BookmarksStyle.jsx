import { StyleSheet } from 'react-native';

const BookmarksStyle = StyleSheet.create({
  folderContainer: {
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
  nextResource: {
    backgroundColor: '#374342',
    borderRadius: 50,
    height: 50,
    width: '50%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    margin: 20,

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black
    zIndex: 1, // Ensure the overlay is on top of other content
  },
  whitePillText: {
    color: '#F6FCFC',
    fontFamily: 'cabinet-grotesk-regular',
    fontSize: 16,
  },
  blackPillText: {
    color: '#343A3A',
    fontFamily: 'cabinet-grotesk-regular',
    fontSize: 16,
  },
});

export default BookmarksStyle;
