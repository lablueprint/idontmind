import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  recommendationCard: {
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
  row: {
    flexDirection: 'row',
  },
  recommendationCardInfo: {
    flexDirection: 'row', flex: 1,
  },
  recommendationText: {
    color: 'black', flexWrap: 'wrap', flex: 1, fontSize: 18, fontWeight: 600,
  },
  bookmark: {
    width: 17, height: 22,
  },
  recommendationImage: {
    width: '80%', height: '95%', marginLeft: 65, resizeMode: 'contain',
  },
});
