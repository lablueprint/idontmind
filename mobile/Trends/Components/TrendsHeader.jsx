import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import TrendImage from '../../assets/TrendImage.png';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TrendsContext from '../Context/TrendsContext';

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
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const { initData } = useContext(TrendsContext);

  const toggleButtonChange = () => {

    /* Temp hard coded values */
    const weekOffset = 2;
    const current = new Date();

    if (selectedPeriod === 'Week') {
      setSelectedPeriod('Month');
    } else {
      setSelectedPeriod('Week');
    }

    // if (selectedPeriod === 'Week') {
    //   start.setDate(current.getDate() + (weekOffset * 7) - current.getDay());
    //   end.setDate(start.getDate() + 6);      
    // } else {
    //   start.setMonth(current.getMonth() + weekOffset, 1);
    //   end.setMonth(start.getMonth() + 1, 0);      
    // }
    // setStart(start);
    // setEnd(end);
  };
  useEffect(() => {
    const getUserTimeSeries = async () => {
      try {
        initData();
        // const startDate = start.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        // const endDate = end.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        // console.log(startDate);
        // console.log(endDate);
        // const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/timeSerie/getAllTimeSeries`, {
        //   email: 'booooooop',
        //   userId: 'booop',
        //   startDate,
        //   endDate,
        // });
        // const { data, data2, avgData, avgSleep, avgWater } = res.data[0];
      } catch (err) {
        console.error(err);
      }
    };
    getUserTimeSeries();
  }, [selectedPeriod, start, end]);
  return (
    <View style={[style.header_container]}>
      <View style={[style.header_text_container]}>
        <Image source={TrendImage} style={[style.header_text_image]} />
        <Text style={[style.header_text]}>{title}</Text>
      </View>

      <View style={[style.header_toggle]}
      >
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
}