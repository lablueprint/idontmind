import { useState, useEffect } from 'react';
import {
  Button, Text, View, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

const styles = {
  app: {
    flex: 4, // the number of columns you want to devide the screen into
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
  },
  '1col': {
    backgroundColor: 'lightblue',
    borderColor: '#fff',
    borderWidth: 1,
    flex: 1,
  },
  '2col': {
    backgroundColor: 'purple',
    borderColor: '#fff',
    borderWidth: 1,
    flex: 1,
  },
};

export default function ContentLibrary({ navigation }) {
  const navigateToLanding = () => {
    navigation.navigate('Content Library');
  };

  return (
    <View style={styles.app}>
      <View style={styles.row}>
        <View style={styles['1col']}>
          <Text>Content</Text>
        </View>
        <View style={styles['2col']}>
          <Text>Content</Text>
        </View>
      </View>
      <Button
        title="To Landing"
        onPress={navigateToLanding}
      />
    </View>
  );
}

ContentLibrary.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
