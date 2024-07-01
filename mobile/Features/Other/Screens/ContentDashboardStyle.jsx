import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  largeText: {
    fontFamily: 'recoleta-regular',
    fontSize: 40,
    color: 'rgba(246, 252, 252, 1)',
    paddingTop: 12,
  },
  medText: {
    fontFamily: 'recoleta-regular',
    fontSize: 32,
    color: 'rgba(246, 252, 252, 1)',
  },
  capitalLetter: {
    fontFamily: 'pinyon-script',
    fontSize: 60,
    color: 'rgba(246, 252, 252, 1)',
    paddingRight: 5,
  },
  insights: {
    fontFamily: 'cabinet-grotesk-regular',
    fontSize: 24,
    color: 'rgba(246, 252, 252, 1)',
    paddingBottom: 5,
    paddingTop: 15,
  },
  resourceContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resources: {
    fontFamily: 'cabinet-grotesk-medium',
    fontSize: 24,
    color: '#343A3A',
  },
  allResources: {
    justifyContent: 'center',
  },
  allResourcesText: {
    fontFamily: 'cabinet-grotesk-bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  dailydiscovery: {
    fontFamily: 'cabinet-grotesk-regular',
    fontSize: 24,
    color: 'rgba(52, 58, 58, 1)',
  },
  middleButtons: {
    backgroundColor: '#6A8784',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  rightChev: {
    height: 15,
    width: 10,
  },
  leftChev: {
    height: 15,
    width: 10,
    opacity: 0,
  },
  moodTendencies: {
    backgroundColor: '#6A8784',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
  },
  MTText: {
    color: '#F6FCFC',
    fontSize: 24,
    marginVertical: 50,
    fontFamily: 'recoleta-regular',
  },
  offWhite: {
    color: '#F6FCFC',
    fontSize: 24,
    marginVertical: 25,
    fontFamily: 'recoleta-regular',
  },
  yourBookmarks: {
    color: '#3A4645',
    textDecorationLine: 'underline',
  },
  dailyBookmarkLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  gearBackground: {
    backgroundColor: '#F6FCFC',
    borderRadius: '50%',
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearContainer: {
    objectFit: 'cover',
  },
  gear: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
  },
  DDButtons: {
    backgroundColor: '#6A8784',
    alignItems: 'center',
    borderRadius: 8,
    width: '47%',
  },
  DDText: {
    color: '#F6FCFC',
    fontSize: 24,
    height: 200,
    fontFamily: 'recoleta-regular',
  },
});
