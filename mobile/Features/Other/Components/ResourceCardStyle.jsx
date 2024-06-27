import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  categoryCard: {
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
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
  },
  categoryText: {
    fontSize: 18, fontWeight: 600, flexWrap: 'wrap',
  },
  categoryImageContainer: {
    flex: 1, flexDirection: 'row', paddingBottom: 10,
  },
  categoryImage: {
    marginLeft: 10,
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
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
  continue: {
    backgroundColor: '#546967',
    alignItems: 'center',
    borderRadius: 99,
    marginHorizontal: 17,
  },
  contText: {
    marginVertical: 12,
    fontFamily: 'cabinet-grotesk-bold',
    fontSize: 14,
    color: '#F6FCFC',
  },
  authorContainer: {
    borderBottomWidth: 1,
    borderColor: '#C6CECE',
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  book: {
    resizeMode: 'contain',
    width: 27,
    height: 40,
  },
  bookContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  authorText: {
    marginTop: 2,
    fontFamily: 'cabinet-grotesk-bold',
    fontSize: 18,
    fontWeight: 700,
  },
});
