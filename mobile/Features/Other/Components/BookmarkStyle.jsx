import { StyleSheet } from 'react-native';

const BookmarkStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#546967',
    marginBottom: 10,
    marginRight: 30,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    height: 70,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  imageContainer1: {
    marginLeft: 0,
    marginRight: 15,
  },
  imageContainer2: {
    marginLeft: 15,
    marginRight: 5,
  },
  nameText: {
    marginTop: 10,
    fontWeight: 700,
    fontSize: 16,
    fontFamily: 'cabinet-grotesk-regular',
    color: '#F6FCFC',

  },
  whiteText: {
    color: 'white',
  },
  authorText: {
    fontFamily: 'cabinet-grotesk-regular',
    color: '#A9B2B2',
  },
});

export default BookmarkStyle;
