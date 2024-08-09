import {
  View, Text, TouchableOpacity, Image, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import TrendImage from '../../../assets/images/TrendImage.png';

const style = StyleSheet.create({
  header_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 40,
    position: 'fixed',
    marginBottom: 20,
  },
  header_text_container: {
    height: '150%',
  },
  header_text_image: {
    position: 'absolute',
    height: 65,
    width: '100%',
  },
  header_text: {
    fontSize: 40,
    fontWeight: 400,
    lineHeight: 52,
    textAlign: 'left',
  },
  header_toggle: {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0 4 10 0 #00000003',
    gap: '10',
    alignSelf: 'center',

  },
  header_toggle_buttons: {
    width: 84,
    height: 40,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: '10 0 0 0',
  },

});

export default function TrendsHeader({ title }) {
  const [selectedPeriod, setSelectedPeriod] = useState('Week');

  // Planning to use this for storying the data at a local/global level.
  // const { initData } = useContext(TrendsContext);

  const toggleButtonChange = () => {
    if (selectedPeriod === 'Week') {
      setSelectedPeriod('Month');
    } else {
      setSelectedPeriod('Week');
    }
  };

  return (
    <View style={[style.header_container]}>
      <View style={[style.header_text_container]}>
        <Image source={TrendImage} style={[style.header_text_image]} />
        <Text style={[style.header_text]}>{title}</Text>
      </View>

      <View style={[style.header_toggle]}>
        {selectedPeriod === 'Week' ? (
          <LinearGradient
            colors={['#374342', '#546967']}
            start={[0, 0]}
            end={[1, 1]}
            style={[style.header_toggle_buttons]}
          >
            <TouchableOpacity
              onPress={toggleButtonChange}
            >
              <Text style={{ fontSize: 18, color: 'white' }}>Week</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            onPress={toggleButtonChange}
            style={[style.header_toggle_buttons]}
          >
            <Text style={{ fontSize: 18 }}>Week</Text>
          </TouchableOpacity>
        )}
        {selectedPeriod === 'Month' ? (
          <LinearGradient
            colors={['#374342', '#546967']}
            start={[0, 0]}
            end={[1, 1]}
            style={[style.header_toggle_buttons]}
          >
            <TouchableOpacity
              onPress={toggleButtonChange}
            >
              <Text style={{ fontSize: 18, color: 'white' }}>Month</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            onPress={toggleButtonChange}
            style={[style.header_toggle_buttons]}
          >
            <Text style={{ fontSize: 18 }}>Month</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

TrendsHeader.propType = {
  title: PropTypes.string.isRequired,
};
