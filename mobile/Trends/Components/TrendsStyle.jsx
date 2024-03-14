import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 38,
    marginBottom: 10,
  },
  line: {
    width: 350,
    borderBottomWidth: 1,
    borderBottomColor: '#26292E',
  },
  displayWeek: {
    padding: 10,
    backgroundColor: 'rgba(169, 232, 34, 0.20)',
    borderRadius: 30,
    width: '70%',
  },
  weekText: {
    textAlign: 'center',
  },
  dateText: {
    textAlign: 'center',
    color: 'rgba(38, 41, 46, 0.60)',
    marginTop: 5,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 25,
  },
  chartWrapper: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    margin: 10,
    width: 350,
  },
  trendHeader: {
    color: '#FFF',
    textAlign: 'left',
    padding: 10,
    fontSize: 20,
    fontWeight: '400',
  },
});
