import { useState } from 'react';
import {
  Text, View, TextInput, Pressable, TouchableWithoutFeedback,
  Keyboard,
  LogBox,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar';
import PropTypes from 'prop-types';
import styles from './MoodStyle';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function AddMood({ navigation }) {
  // get parameters from route
  const route = useRoute();
  const numPages = route.params?.numPages;
  // set progress
  const progress = 1 / numPages;

  // text for new mood
  const [text, setText] = useState('');

  // navigate to AddColor with setAddedMoods, addedMoods, the mood the user typed in, and numPages
  const goToAddColor = () => {
    navigation.navigate('AddColor', {
      mood: text, numPages,
    });
  };
  const handleInputChange = (input) => {
    setText(input);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ProgressBar progress={progress} width={200} style={{ top: '5%' }} />
        <View style={styles.heading}>
          <Text>
            type out a custom emotion here!
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
          <Pressable onPress={goToAddColor}>
            <Text>check</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AddMood;

AddMood.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
