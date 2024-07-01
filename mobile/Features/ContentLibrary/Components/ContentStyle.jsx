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
    paddingTop: 75,
    paddingRight: 40,
    flexBasis: 125,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
  horizontalCard: {
    paddingHorizontal: 20,
    paddingTop: 15,
    marginRight: 12,
    marginVertical: 20,
    backgroundColor: '#F6FCFC',
    borderRadius: 8,
    flex: 1,
    flexDirection: 'column',
    shadowColor: '#748384',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.40,
    shadowRadius: 5,
  },
  star: {
    width: 17, height: 22,
  },
  horizontalCardInfo: {
    flexDirection: 'row', flex: 1,
  },
  horizontalText: {
    color: 'black', flexWrap: 'wrap', flex: 1, fontSize: 18, fontWeight: 600,
  },
  verticalCard: {
    padding: 10,
    marginVertical: 8,
    marginRight: 16,
    backgroundColor: '#F6FCFC',
    borderRadius: 8,
    flex: 1,
    flexDirection: 'column',
    shadowColor: '#748384',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.40,
    shadowRadius: 5,
  },
  horizontalShape: {
    width: '80%', height: '95%', marginLeft: 65,
  },
  verticalShape: {
    marginLeft: 10,
  },
  verticalCardInfo: {
    flex: 1, flexDirection: 'row',
  },
  verticalImageContainer: {
    flex: 1, flexDirection: 'row', paddingBottom: 10,
  },
  verticalText: {
    fontSize: 18, fontWeight: 600, flexWrap: 'wrap',
  },
  whiteBox: {
    borderRadius: 8, marginBottom: 5, marginLeft: 5,
  },
  subTopic: {
    borderRadius: 4,
    width: 90,
    height: 20,
  },
  subTopicText: {
    color: 'white',
    fontFamily: 'cabinet-grotesk-bold',
    fontWeight: 700,
    lineHeight: 21,
    alignSelf: 'center',
  },
  bookmarkBackground: {
    backgroundColor: '#F6FCFC',
    borderRadius: '50%',
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#748384',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.40,
    shadowRadius: 5,
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
