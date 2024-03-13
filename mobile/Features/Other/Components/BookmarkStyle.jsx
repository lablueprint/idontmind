import { StyleSheet } from 'react-native';

const BookmarkStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#546967',
    marginBottom: 10,
    marginRight: 30,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    marginLeft: 15,
    marginRight: 5,
  },
  nameText: {
    fontWeight: 600,
    fontSize: 14,
  },
  whiteText: {
    color: 'white',
  },
  authorText: {
    marginTop: 10,
  },
});

export default BookmarkStyle;
