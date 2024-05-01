// This file and all of the Post related files are temporary and primarily used as examples
// Currently, they also act as a quick way to visually check for successful MongoDB connection.
// Addpost is still not good sorry!
import {
  StyleSheet, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    width: 300,
    borderWidth: 1, // Add a border around the component
    borderColor: '#ccc', // Border color (you can customize this)
    padding: 16, // Add padding inside the box
    marginBottom: 16, // Add some space between posts
  },
  email: {
    fontSize: 18, // Customize email font size
    fontWeight: 'bold', // Make the email bold
  },
  body: {
    marginTop: 8, // Add some space between email and body text
    textAlign: 'left', // Left-align the text
  },
});

export default function Post({
  email, body, timestamp,
}) {
  const formatDate = (date) => {
    const testDate = new Date(date);
    const datestring = `Posted On: ${testDate.getDate()}/${
      testDate.getMonth() + 1}/${
      testDate.getFullYear()} @ ${
      testDate.getHours()}:${
      testDate.getMinutes()}:${
      testDate.getSeconds()}`;
    return datestring;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.body}>{body}</Text>
      <Text style={styles.body}>{formatDate(timestamp)}</Text>
    </View>
  );
}

Post.propTypes = {
  email: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
