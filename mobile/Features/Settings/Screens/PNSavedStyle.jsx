import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 700,
    marginTop: '35%',
    alignSelf: 'center',
  },
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  category: {
    marginBottom: 18,
    marginTop: 12,
    fontSize: 15,
  },
  timeOfDayContainer: {
    flexDirection: 'row',
    width: '97%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  timeOfDayText: {
    fontSize: 20,
  },
  setDefaultButton: {
    borderRadius: 8,
    width: '48%',
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 13,
  },
  saveButton: {
    borderRadius: 8,
    width: '48%',
    backgroundColor: '#404040',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 13,
  },
  setDefaultText: {
    fontSize: 18,
  },
  saveText: {
    fontSize: 18,
    color: 'white',
  },
});
