import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 40,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#E0F1F3',
  },
  heading: {
    fontSize: 40,
    color: '#343A3A',
  },
  subheading: {
    color: '#767C7C',
    fontSize: 16,
  },
  pillTitle: {
    fontSize: 24,
  },
  nonselectedPillText: {
    fontSize: 16,
    color: '#343A3A',
  },
  selectedPillText: {
    fontSize: 16,
    color: '#F6FCFC',
  },
  pills: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  titleButton: {
    display: 'flex',
    flexDirection: 'row',
  },
  down: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  rotated: {
    transform: [{ rotate: '180deg' }],
  },
  showIt: {
    display: 'flex',
  },
  dontShowIt: {
    display: 'none',
  },
  pillArea: {
    marginBottom: 40,
  },
  pill: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    margin: 4,
  },
  selectedPill: {
    backgroundColor: '#374342',
    borderRadius: 99,
  },
  nonselectedPill: {
    backgroundColor: '#D2E4E3',
    borderRadius: 99,
  },
});
