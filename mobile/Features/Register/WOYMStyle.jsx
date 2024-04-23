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
    fontFamily: 'recoleta-regular',
  },
  subheading: {
    color: '#767C7C',
    fontSize: 16,
    marginBottom: 40,
    fontFamily: 'cabinet-grotesk-regular',
  },
  pillTitle: {
    fontSize: 24,
    fontFamily: 'recoleta-regular',
  },
  nonselectedPillText: {
    fontSize: 16,
    color: '#343A3A',
    fontFamily: 'cabinet-grotesk-regular',
  },
  selectedPillText: {
    fontSize: 16,
    color: '#F6FCFC',
    fontFamily: 'cabinet-grotesk-regular',
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
  extraMargin: {
    marginBottom: 20,
  },
  down: {
    alignSelf: 'center',
    width: '100%',
    height: 10,
  },
  arrowCont: {
    width: 14,
    marginHorizontal: 10,
    objectFit: 'cover',
    alignSelf: 'center',
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
    fontFamily: 'cabinet-grotesk-bold',
  },
  nextTextReady: {
    color: '#767C7C',
    fontFamily: 'cabinet-grotesk-bold',
  },
  nextTextNot: {
    color: '#F6FCFC',
    fontFamily: 'cabinet-grotesk-bold',
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
    flexDirection: 'row',
  },
  stillButt: {
    position: 'absolute',
    bottom: 74, // why does this look huge
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
