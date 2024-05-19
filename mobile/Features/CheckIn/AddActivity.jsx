import { useState } from 'react';
import {
  Text, View, TextInput, Pressable, TouchableWithoutFeedback,
  Keyboard,
  LogBox,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import PropTypes from 'prop-types';
import styles from './MoodStyle';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function AddActivity({ navigation }) {
  // get parameters from route
  const route = useRoute();
  // text for new activity
  const [text, setText] = useState('');

  /* navigate to AddIcon with setAddedActivities, addedActivities, the activity
   the user typed in, and numPages */
  const goToAddIcon = () => {
    navigation.navigate('AddIcon', {
      activity: text,
    });
  };
  const handleInputChange = (input) => {
    setText(input);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text>
            type out a custom option here!
          </Text>
        </View>
        <View style={styles.content}>
          <TextInput
            placeholder="Start typing..."
            style={{
              height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 8, width: '90%', alignSelf: 'center',
            }}
            onChangeText={handleInputChange}
            value={text}
          />
          <Pressable onPress={goToAddIcon}>
            <Text>check</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AddActivity;

AddActivity.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
