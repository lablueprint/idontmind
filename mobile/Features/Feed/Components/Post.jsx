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
  username: {
    fontSize: 18, // Customize username font size
    fontWeight: 'bold', // Make the username bold
  },
  body: {
    marginTop: 8, // Add some space between username and body text
    textAlign: 'left', // Left-align the text
  },
});

export default function Post({
  username, body, timestamp, navigation,
}) {
  const formatDate = (date) => {
    console.log(date);
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
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.body}>{body}</Text>
      <Text style={styles.body}>{formatDate(timestamp)}</Text>
      {/* <Text style={styles.body}>{body}</Text> */}
      {/* <Button
        title="To Landing"
        onPress={navigateToDetails}
      /> */}
    </View>
  );
}

Post.propTypes = {
  username: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
