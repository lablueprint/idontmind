import { StyleSheet } from 'react-native';

const TagRectangleStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#D2E4E3',
    marginBottom: 10,
    marginRight: 30,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    height: 70,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    fontFamily: 'cabinet-grotesk-regular',
  },
  imageContainer1: {
    marginLeft: -5,
    marginRight: 10,
  },
  imageContainer2: {
    marginLeft: 15,
    marginRight: 5,
  },
  nameText: {
    fontWeight: 600,
    fontSize: 16,
    fontFamily: 'cabinet-grotesk-bold',
  },
  whiteText: {
    color: '#343A3A',
    fontFamily: 'cabinet-grotesk-bold',
  },
  authorText: {
    marginTop: 10,
  },
});

export default TagRectangleStyle;
