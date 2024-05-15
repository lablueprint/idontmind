import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E5F8F3',
  },
  title: {
    fontFamily: 'recoleta-regular',
    fontSize: 40,
    color: '#343A3A',
  },
  subheading: {
    fontSize: 24,
    flex: 1,
    fontFamily: 'recoleta-regular',
    color: '#343A3A',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
  horizontalCard: {
    padding: 10, marginVertical: 8, marginRight: 16, backgroundColor: 'lightgrey', borderRadius: 10, width: 122, flex: 1,
  },
  star: {
    width: 20, height: 20, opacity: 0.4,
  },
  horizontalCardInfo: {
    flexDirection: 'row', flex: 1, width: 70,
  },
  horizontalText: {
    color: 'black', alignSelf: 'flex-end', marginBottom: 20, flexWrap: 'wrap', flex: 1, fontSize: 16, marginLeft: 5,
  },
  verticalCard: {
    padding: 10, marginVertical: 8, marginRight: 16, backgroundColor: 'lightgrey', borderRadius: 10, flex: 1, flexDirection: 'column',
  },
  shape: {
    width: 95, height: 85, marginRight: 15,
  },
  verticalCardInfo: {
    flex: 1, flexDirection: 'row-reverse',
  },
  verticalText: {
    fontSize: 25,
  },
  whiteBox: {
    backgroundColor: 'white', width: 100, height: 25, borderRadius: 8, marginBottom: 5, marginLeft: 5,
  },
  bookmarkBackground: {
    backgroundColor: '#A9B2B2',
    borderRadius: '50%',
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkContainer: {
    objectFit: 'cover',
  },
  bookmark: {
    resizeMode: 'contain',
    width: 16,
    height: 20,
  },
  search: {
    resizeMode: 'contain',
    width: 19,
    height: 19,
  },
});
