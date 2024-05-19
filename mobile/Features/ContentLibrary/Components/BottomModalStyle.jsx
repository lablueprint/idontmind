import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zindex: 2,
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '40%',
    borderRadius: 20,
    backgroundColor: 'white',

    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flex: 0.1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#DFE5E5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  collections: {
    flex: 3,
    display: 'flex',
    backgroundColor: '#C6CECE',
    flexDirection: 'column',
    padding: 30,

  },
  collectionsHeader: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  folderRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },

});
export default styles;
