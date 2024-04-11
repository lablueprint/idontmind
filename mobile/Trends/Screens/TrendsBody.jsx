import {
  View, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import PropTypes from 'prop-types';

function TrendSection({ header, description, buttonText, data, data2 }) {
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
  let ThisData = null;
  let ThisData2 = null;
  useEffect(() => {
    const getAllTimeSeries = async () => {
      try {
        const weekOffset = 1;
        const current = new Date();      
        const start = new Date(current);
        const end = new Date(current);      
        start.setMonth(current.getMonth() + weekOffset, 1);
        end.setMonth(start.getMonth() + 1, 0);              
        startDate = start.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        endDate = end.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });             
        console.log(startDate);
        console.log(endDate);
        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/timeSerie/getAllTimeSeries`, {
          email: 'booooooop',
          userId: 'booop',
          startDate,
          endDate,
        });
        const {data, data2} = res.data[0];
        console.log(data);
        console.log(data2);
        ThisData = data;
        ThisData2 = data2;

      } catch (err) {
        console.error(err);
      }
    };
    getAllTimeSeries();
  }, []);
  console.log(ThisData);
  console.log(ThisData2);
  return (
    <ScrollView style={{ gap: 35, paddingTop: 50, paddingHorizontal: 30 }}>
      <TrendSection header="Energy Levels" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." buttonText="button" data={ThisData} data2={ThisData2}/>
      <TrendSection header="Sleep Quality" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." buttonText="button" data={ThisData} data2={ThisData2}/>
      <TrendSection header="Mood and Sleep" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." buttonText="button" data={ThisData} data2={ThisData2}/>
    </ScrollView>
  );
}
