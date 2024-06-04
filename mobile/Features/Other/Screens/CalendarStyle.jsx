import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4F6F3',
    marginTop: 40,

  },
  journalCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  journalCardHorizontal: {
    justifyContent: 'flex-start',
  },

  header: {
    fontFamily: 'recoleta-alt-regular',
    fontSize: 32,
    paddingBottom: 10,
  },

  addEntriesButton: {
    borderRadius: 8,
    backgroundColor: '#546967',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 37,
  },
  addEntriesButtonText: {
    color: 'white',
    fontSize: 12,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  circle: {
    position: 'absolute',
    top: -1150,
    left: 10,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: 542,
    height: 450,
    borderRadius: 250,
  },

  highlight: {
    backgroundColor: '#C9E2DE',
    top: 10,
    width: '100%',
    height: '50%',
    position: 'absolute',
    zIndex: -1,
  },
});
