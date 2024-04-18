import {
  View, Text, TouchableOpacity, Image, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import TrendImage from '../../assets/TrendImage.png';

const style = StyleSheet.create({
  header_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'fill',
    height: '40px',
    position: 'fixed',
    marginBottom: 20,
  },
  header_text_container: {
    fontSize: '2rem',
    position: 'relative',
  },
  header_text_image: {
    position: 'absolute',
    height: 65,
    width: '100%',
  },
  header_text: {
    fontSize: '40px',
    fontWeight: 400,
    lineHeight: '52px',
    letterSpacing: '-0.01em',
    textAlign: 'left',
  },
  header_toggle: {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0px 4px 10px 0px #00000003',
    gap: '10px',
    alignSelf: 'center',

  },
  header_toggle_buttons: {
    width: '84px',
    height: '40px',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: '10px 0px 0px 0px',
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
              <Text style={{ fontSize: '18px', color: 'white' }}>Week</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            onPress={toggleButtonChange}
            style={[style.header_toggle_buttons]}
          >
            <Text style={{ fontSize: '18px' }}>Week</Text>
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
              <Text style={{ fontSize: '18px', color: 'white' }}>Month</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            onPress={toggleButtonChange}
            style={[style.header_toggle_buttons]}
          >
            <Text style={{ fontSize: '18px' }}>Month</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

TrendsHeader.propType = {
  title: PropTypes.string.isRequired,
};
