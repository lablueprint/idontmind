import {
  Text, View, Pressable, ScrollView, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import back from '../../assets/images/left-chev.png';
import styles from './TermsStyle';

function Terms({ navigation }) {
  const navigateToSplash = () => {
    navigation.navigate('Splash');
  };

  return (
    <ScrollView style={styles.sv}>
      <View>
        <View style={styles.container}>
          <Pressable style={styles.back} onPress={navigateToSplash}>
            <Image source={back} style={styles.chevron} />
          </Pressable>
          <View>
            <Text style={styles.title}>Terms of Service</Text>
            <Text style={styles.heading}>Overview</Text>
            <Text style={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Etiam eu turpis molestie, dictum est a, mattis tellus.
              Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
              lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit,
              sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
              enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            </Text>
          </View>
          <View>
            <Text style={styles.heading}>Account</Text>
            <Text style={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Etiam eu turpis molestie, dictum est a, mattis tellus.
              Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
              lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit,
              sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
              enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            </Text>
          </View>
          <View>
            <Text style={styles.heading}>Content</Text>
            <Text style={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Etiam eu turpis molestie, dictum est a, mattis tellus.
              Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
              lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit,
              sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
              enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            </Text>
          </View>
          <View>
            <Text style={styles.heading}>Terms of Service</Text>
            <Text style={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Etiam eu turpis molestie, dictum est a, mattis tellus.
              Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
              lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit,
              sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
              enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            </Text>
          </View>
          <View>
            <Text style={styles.heading}>Terms of Service</Text>
            <Text style={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Etiam eu turpis molestie, dictum est a, mattis tellus.
              Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
              lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit,
              sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
              enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            </Text>
          </View>
          <View>
            <Text style={styles.heading}>Terms of Service</Text>
            <Text style={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Etiam eu turpis molestie, dictum est a, mattis tellus.
              Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
              lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit,
              sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
              enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Terms;

Terms.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
