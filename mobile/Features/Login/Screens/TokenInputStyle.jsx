import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: '2%' },
  space: 4,
  cell: {
    width: 40,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    backgroundColor: '#F6FCFC',
    textAlign: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    paddingTop: 5,
  },
  focusCell: {
    borderColor: '#000',
  },
});
