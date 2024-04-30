import {
  Text, Pressable, View, ImageBackground
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './JournalHistoryStyle';

// props: username, prompt, text, timestamp
export default function JournalCard({
  onPress, text, username, prompt, date, type
}) {
  const handlePress = () => {
    onPress(username, prompt, text, date);
  }; /* calls the onPress function from props,
  which is a function in JournalHistoryPage
  to navigate to the past journal entry with the previously written text */

  return (
    <View style={[styles.entryContainer]} >
    <Pressable style={styles.journalCard} onPress={handlePress}>
      <View style={type ? [styles.dateContainer, { backgroundColor: '#BFDBD7' }] : styles.dateContainer}>
        <Text style={styles.dateText}>
          {date}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.prompt} numberOfLines={1} ellipsizeMode="tail">
          {prompt}
        </Text>
        <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">
          {text}
        </Text>
      </View>
    </Pressable>
    </View>
  ); /* Journal Card only shows username, date, and prompt;
  you see the body/text when you click on the card and it
  takes you to the past journal entry page */
}

JournalCard.propTypes = {
  username: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
};