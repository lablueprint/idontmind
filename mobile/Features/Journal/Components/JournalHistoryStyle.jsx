import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  journalCard: {
    width: 163,
    margin: 5,
    borderColor: 'black',
    backgroundColor: '#F6FCFC',
    borderRadius: 10,
    height: 140,
    marginBottom: 12,
  },
  dateContainer: {
    borderRadius: 10,
    alignSelf: "flex-start",
    backgroundColor: "#82A5A1", 
    padding: 12,
  },

  dateText:{
    fontFamily: "Cabinet Grotesk, sans-serif",
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
  },

  contentContainer: {
    // marginTop: 3,
    padding: 10,
  },

  prompt: {
    // textAlign: "center",
    fontFamily: "Cabinet Grotesk, sans-serif",
    fontSize: 13,
  },
  text: {
    marginTop: 8,
    fontFamily: "Cabinet Grotesk, sans-serif",
    fontSize: 12,
    lineHeight: 20,
  },
});
