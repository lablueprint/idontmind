import {
  Text, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './JournalHistoryStyle';

// props: username, prompt, text, timestamp
export default function JournalCard({
  onPress, text, username, prompt, date, image
}) {
  const handlePress = () => {
    onPress(username, prompt, text, date, image);
  }; /* calls the onPress function from props,
  which is a function in JournalHistoryPage
  to navigate to the past journal entry with the previously written text */

  return (
    <Pressable style={styles.journalCard} onPress={handlePress}>
      <Text style={styles.date}>
        {date}
      </Text>
      <Text style={styles.prompt}>
        {prompt}
      </Text>
      <Text style={styles.text}>
        {text}
      </Text>
    </Pressable>
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
