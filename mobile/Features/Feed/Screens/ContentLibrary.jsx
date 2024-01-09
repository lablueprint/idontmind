import { useState, useEffect } from 'react';
import {
  Button, Text, View, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function ContentLibrary({ navigation }) {
  const navigateToLanding = () => {
    navigation.navigate('Content Library');
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text>Content</Text>
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
