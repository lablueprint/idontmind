import {
    Text, View, TouchableOpacity, StyleSheet,
  } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3F5F4',
    },
    arrowContainer: {
        position: 'absolute',
        top: 100,
        left: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
    },
    inputContainer: {
        marginTop: 20,
        alignItems: 'flex-start',
    },
    inputWrapper: {
        flexDirection: 'row', 
        alignItems: 'center',
        height: 63,
        width: 350,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 5,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    inputBox: {
        height: 40,
        width: 300,
        marginTop: 5,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    buttonShape: {
        backgroundColor: '#C0C0C0',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginTop: 20,
        width: 258,
        height: 70,
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 12,
    },
    eyeIcon: {
        marginTop: 5,
    },
    paginationContainer: {
        flexDirection: 'row',
        marginTop: 20,
        width: 62,
        justifyContent: 'center',
    },
    activePaginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'black',
    },
    inactivePaginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'gray',
    }
});

export default function Customization({ navigation }) {

  const navigateToPersonalInfo = () => {
    navigation.navigate('PersonalInfo');
  };

  const navigateToFeed = () => {
    navigation.navigate('Feed');
  };

  return (
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
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

Customization.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};