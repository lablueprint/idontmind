import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  sv: {
    flex: 1,
    backgroundColor: '#E0F1F3',
  },
  container: {
    paddingTop: 100,
    paddingHorizontal: 40,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    fontSize: 16,
  },
  heading: {
    fontSize: 40,
    color: '#343A3A',
    marginBottom: 24,
  },
  subheading: {
    color: '#767C7C',
    fontSize: 16,
    marginBottom: 40,
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
    marginBottom: 20,
  },
  down: {
    width: 12,
    height: 6,
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
    paddingVertical: 12,
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
  nextText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextTextReady: {
    color: '#767C7C',
  },
  nextTextNot: {
    color: '#F6FCFC',
  },
  nextButt: {
    borderRadius: 99,
    backgroundColor: '#C6CECE',
    paddingVertical: 26,
    width: 277,
    alignItems: 'center',
  },
  nextReady: {
    backgroundColor: '#C6CECE',
  },
  nextNot: {
    backgroundColor: '#374342',
  },
  nextButtContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
  },
  arrow: {
    alignSelf: 'center',
  },
  stillButt: {
    position: 'absolute',
    bottom: 74, // why does this look huge
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
