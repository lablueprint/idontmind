import {
  View, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import PropTypes from 'prop-types';
import { data, data2 } from '../Components/TrendsData';

function TrendSection({ header, description, buttonText }) {
  useEffect(() => {
    const getAllTimeSeries = async () => {
      try {
        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/timeSerie/getAllTimeSeries`, {
          email: 'booooooop',
          userId: 'booop',
        });
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getAllTimeSeries();
  }, []);
  return (
    <View style={{
      display: 'flex', flexDirection: 'column', gap: 10,
    }}
    >
      <Text style={{ fontSize: 24 }}>{header}</Text>
      <Text style={{ fontSize: 14 }}>{description}</Text>
      <LineChart
        data={data}
        data2={data2}
        width={300}
        height={300}
        curved
        hideDataPoints
        hideRules
        hideYAxisText
        hideAxesAndRules
        showXAxisIndices
        color1="skyblue"
        color2="orange"
      />
      <Text>some response</Text>
      <TouchableOpacity>
        <Text>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

TrendSection.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default function TrendsBody() {
  return (
    <ScrollView style={{ gap: 35, paddingTop: 50, paddingHorizontal: 30 }}>
      <TrendSection header="Energy Levels" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." buttonText="button" />
      <TrendSection header="Sleep Quality" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." buttonText="button" />
      <TrendSection header="Mood and Sleep" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." buttonText="button" />
    </ScrollView>
  );
}
