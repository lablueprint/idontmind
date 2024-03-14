import {
  Text, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './JournalHistoryStyle';

// props: username, prompt, text, timestamp
export default function JournalCard({
  onPress, text, username, prompt, date,
}) {
  const handlePress = () => {
    onPress(username, prompt, text, date);
  }; /* calls the onPress function from props,
  which is a function in JournalHistoryPage
  to navigate to the past journal entry with the previously written text */

  return (
    <Pressable style={styles.journalCard} onPress={handlePress}>
      <Text>
        username:
        {username}
      </Text>
      <Text>
        date:
        {date}
      </Text>
      <Text>
        prompt:
        {prompt}
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
