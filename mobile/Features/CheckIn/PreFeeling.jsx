import { useState } from 'react';
import {
  Text, View, Pressable, TouchableOpacity, Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import { useRoute } from '@react-navigation/native';
import styles from './PreFeelingStyles';
import infoButton from '../../assets/images/infobutton.png';
import CheckInModal from './CheckInModal';

function Feeling({ navigation }) {
  const route = useRoute();
  const numPages = route.params?.numPages;
  const progress = 1 / numPages;

  const { width } = Dimensions.get('window');

  const images = [
    require('../../assets/images/crylilguy.png'),
    require('../../assets/images/sadlilguy.png'),
    require('../../assets/images/normallilguy.png'),
    require('../../assets/images/smilinglilguy.png'),
    require('../../assets/images/happylilguy.png'),
  ];

  const captions = [
    'Worst',
    'Poor',
    'Okay',
    'Good',
    'Great',
  ];

  const [slider, setSlider] = useState(2);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onSliderChange = (sliderValue) => {
    setSlider(sliderValue);
  };

  const onImagePress = (index) => {
    setSlider(index);
  };

  const continueButton = () => {
    navigation.navigate('Feeling', { numPages, moodValueChosen: slider + 1 });
  };

  // const skipButton = () => {
  //   // note: if we skip, what do we set mood as for this day? should it be null or 2
  //   navigation.navigate('Feeling', { numPages, moodValueChosen: null });
  // };

  return (
    <View style={{ backgroundColor: '#E5F8F3' }}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
        <Text style={styles.heading}>
          How are you feeling today, really?
        </Text>
        <Pressable onPress={toggleModal}>
          <Image source={infoButton} style={{width: 16, height: 16, marginTop: 12, marginLeft: 10}} />
        </Pressable>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 0.9 }}>
          {images.map((image, index) => (
            <Pressable key={index} onPress={() => onImagePress(index)}>
              <View key={index} style={{ alignItems: 'center' }}>
                <View style={[
                  styles.imageContainer,
                  { width: 40 + (slider === index ? 20 : 0), height: 40 + (slider === index ? 20 : 0) },
                  slider === index ? styles.shadowEffect : null,
                ]}
                >
                  <Image
                    source={image}
                    style={[
                      styles.image,
                      { width: 40 + (slider === index ? 20 : 0), height: 40 + (slider === index ? 20 : 0) },
                    ]}
                  />
                </View>
                <Text style={{ display: slider === index ? 'flex' : 'none', fontSize: 40, fontWeight: 600 }}>{captions[index]}</Text>
                <View style={{ height: 10 }} />
              </View>
            </Pressable>
          ))}
        </View>
        <Slider
          style={{ width: width * 0.9, marginTop: 20 }}
          minimumValue={0}
          maximumValue={4}
          step={1}
          value={slider}
          onValueChange={onSliderChange}
          minimumTrackTintColor="#374342"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#374342"
        />
        <Pressable style={styles.continueButton} onPress={continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </Pressable>
        {/* <TouchableOpacity onPress={skipButton} style={styles.skip}>
          <Text>
            SKIP
          </Text>
        </TouchableOpacity> */}
      </View>
      <CheckInModal 
        checkInQNum = {0}
        modalVisible = {modalVisible}
        toggleModal = {toggleModal}
        />
    </View>
  );
}

export default Feeling;

Feeling.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
