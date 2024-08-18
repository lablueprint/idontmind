import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: 25,
    gap: 30,
  },
  header: {
    flexDirection: 'column',
    marginTop: '20%',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 500,
    letterSpacing: -1.6,
  },
  headerOptions: {
    fontSize: 14,
    marginBottom: 10,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  bellIcon: {
    height: 48,
    width: 48,
  },
  leftIcon: {
    height: 15,
    width: 15,
  },
  subSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  subSectionHeader: {
    fontSize: 21,
    zIndex: 2,
  },
  subSectionText: {
    fontSize: 15,
    letterSpacing: -0.5,
    color: '#929999',
  },
  setDefaultButton: {
    borderRadius: 99,
    width: '45%',
    backgroundColor: '#C6CECE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  saveButton: {
    borderRadius: 99,
    width: '55%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 13,
  },
  setDefaultText: {
    fontSize: 14,
  },
  saveText: {
    fontSize: 14,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: '10%',
    width: '92%',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  toggleContainerText: {
    color: '#26292E99',
  },
  allToggleContainers: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
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
  unselected: {
    color: 'lightgray',
  },
});
