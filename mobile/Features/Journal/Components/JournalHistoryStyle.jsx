import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  journalCard: {
    width: 170,
    margin: 5,
    borderColor: 'black',
    backgroundColor: '#F6FCFC',
    borderRadius: 10,
    height: 160,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dateContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#BFDBD7',
    padding: 12,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 25,
    width: 106,
    height: 39,
  },

  dateText: {
    fontFamily: 'cabinet-grotesk-regular',
    fontSize: 14,
    textAlign: 'center',
    color: 'black',
  },

  contentContainer: {
    padding: 12,
  },

  prompt: {
    fontFamily: 'cabinet-grotesk-regular',
    fontSize: 18,
  },
  text: {
    marginTop: 8,
    fontFamily: 'cabinet-grotesk-regular',
    fontSize: 14,
    lineHeight: 20,
  },
});
