import {
    Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard
  } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Components/OnboardingStyling'

export default function Customization({ navigation }) {

  const navigateToPersonalInfo = () => {
    navigation.navigate('PersonalInfo');
  };

  const navigateToFeed = () => {
    navigation.navigate('NavigationBar');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity onPress={navigateToPersonalInfo} style={styles.arrowContainer}>
          <Icon name="arrow-left" size={30} color="black"/>
        </TouchableOpacity>
        <Text style={styles.title}>What's on your mind?</Text>
        <View style={styles.paginationContainer}>
          <View style={[styles.inactivePaginationDot]} />
          <View style={[styles.inactivePaginationDot]} />
          <View style={[styles.activePaginationDot]} />
        </View>
        <View style={styles.buttonShape}>
          <TouchableOpacity
            onPress={navigateToFeed}
          >
            <Text style={styles.buttonText}>All Set!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

Customization.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};