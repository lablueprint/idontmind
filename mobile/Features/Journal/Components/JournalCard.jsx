import {
  Text, Pressable, View,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './JournalHistoryStyle';

// props: email, prompt, text, timestamp
export default function JournalCard({
  onPress, text, email, prompt, date, type,
}) {
  const handlePress = () => {
    onPress(email, prompt, text, date);
  };
  return (
    <View style={[styles.entryContainer]}>
      <Pressable style={styles.journalCard} onPress={handlePress}>
        <View style={type ? [styles.dateContainer, { backgroundColor: '#82A5A1' }] : styles.dateContainer}>
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
  email: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.bool.isRequired,
};
