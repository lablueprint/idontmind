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
    fontSize: 23,
    fontWeight: 600,
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    overflow: 'hidden',
    borderColor: '#8C8C8C',
    color: '#8C8C8C',
  },
  timeOfDayContainer: {
    display: 'flex',
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
  unselected: {
    color: 'lightgray',
  },
});
