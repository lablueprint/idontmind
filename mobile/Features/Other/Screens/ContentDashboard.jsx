import {
  View, Text, TouchableOpacity, Image,
  ScrollView, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import gear from '../../../assets/images/gear.png';
import background from '../../../assets/images/contentbackground.png';
import styles from './ContentDashboardStyle';
import rightChev from '../../../assets/images/rightChevron.png';
import ResourceCard from '../Components/ResourceCard';

export default function ContentDashboard({ navigation }) {
  const [resources, setResources] = useState([]);
  const { id, authHeader } = useSelector((state) => state.auth);

  /* width of screen */
  const { width } = Dimensions.get('window');

  useEffect(() => {
    const getRecommendedResources = async () => {
      try {
        const resResources = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getRecommendedResources`, { id }, { headers: authHeader });
        const recommendedResources = resResources.data;

        setResources(recommendedResources);
      } catch (e) {
        console.error(e);
      }
    };
    getRecommendedResources();
  }, []);

  const navigateToDayChallenge = () => {
    navigation.navigate('Detox');
  };

  // TODO-3:
  const navigateToResource = (resource) => {
    navigation.navigate('Resource', { resource, routeName: 'Content Dashboard' });
  };

  const navigateToOptions = () => {
    navigation.navigate('Options');
  };

  const navigateToContentLibrary = () => {
    navigation.navigate('Content Library');
    // navigation.navigate('Content', {
    //   screen: 'Content Library',
    // });
  };

  const navigateToCheckin = () => {
    navigation.navigate('CheckIn');
  };

  return (
    <ScrollView>
      <View style={{ position: 'absolute' }}>
        <Image
          source={background}
        />
      </View>
      <View style={{
        display: 'flex', flexDirection: 'column', marginTop: 100, width: '80%', alignSelf: 'center',
      }}
      >
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity
            style={styles.gearBackground}
            onPress={navigateToOptions}
          >
            <View style={styles.gearContainer}>
              <Image
                source={gear}
                style={styles.gear}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{
          display: 'flex', flexDirection: 'column', fontSize: 38,
        }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.largeText}>Welcome!</Text> 
          </View>
          <Text style={styles.medText}>We&apos;re so glad you&apos;re here!</Text>
        </View>
        <View style={{ height: 20 }} />
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TouchableOpacity style={styles.middleButtons} onPress={navigateToCheckin}>
            <Image
              source={rightChev}
              style={styles.leftChev}
            />
            <Text style={styles.offWhite}>Check-In</Text>
            <Image
              source={rightChev}
              style={styles.rightChev}
            />
          </TouchableOpacity>
          <View style={{ height: 20 }} />
          <TouchableOpacity
            style={styles.middleButtons}
            onPress={navigateToDayChallenge}
          >
            <Image
              source={rightChev}
              style={styles.leftChev}
            />
            <Text style={styles.offWhite}>30 Day Challenge</Text>
            <Image
              source={rightChev}
              style={styles.rightChev}
            />
          </TouchableOpacity>
        </View>
        <View style={{ height: 20 }} />
        <View style={[styles.resourceContainer]}>
          <Text style={styles.resources}>Daily Resource Discovery</Text>          
        </View>
        <View>
          {resources.map(
            (resource) => (
              <ResourceCard
                resource={resource.resource}
                navigateToResource={navigateToResource}
                key={resource.resource._id}
              />
            ),
          )}
        </View>
      </View>
    </ScrollView>
  );
}

ContentDashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
