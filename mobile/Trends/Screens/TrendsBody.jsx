import {
  View, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import PropTypes from 'prop-types';
import TrendsHeader from '../Components/TrendsHeader';

function TrendSection({
  header, description, buttonText, data, data2, avg,
}) {
  let result = '';
  if (avg < 0) {
    result = `${avg} decreased`;
  } else {
    result = `${avg} increased`;
  }
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
      <Text>
        Your energy trended a
        {' '}
        {result}
        {' '}
        upward from the previous week.
      </Text>
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      timestamp: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  data2: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      timestamp: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  avg: PropTypes.number.isRequired,
};

export default function TrendsBody() {
  const [thisData, setThisData] = useState([]);
  const [thisData2, setThisData2] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    const getAllTimeSeries = async () => {
      try {
        const weekOffset = 1;
        const current = new Date();
        const start = new Date(current);
        const end = new Date(current);
        start.setMonth(current.getMonth() + weekOffset, 1);
        end.setMonth(start.getMonth() + 1, 0);
        const startDate = start.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        const endDate = end.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        console.log(startDate);
        console.log(endDate);
        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/timeSerie/getAllTimeSeries`, {
          email: 'booooooop',
          userId: 'booop',
          startDate,
          endDate,
        });
        const { data, data2, avgData, avgSleep, avgWater } = res.data[0];
        console.log(data);
        console.log(data2);
        console.log(avgData);
        console.log(avgSleep);
        console.log(avgWater);
        setThisData(data);
        setThisData2(data2);
        setAvg(avgData);
      } catch (err) {
        console.error(err);
      }
    };
    getAllTimeSeries();
  }, []);
  return (
    <ScrollView style={{ gap: 35, paddingTop: 50, paddingHorizontal: 30 }}>
      <TrendsHeader />
      <TrendSection header="Energy Levels" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." buttonText="button" data={thisData} data2={thisData2} avg={avg}/>
      <TrendSection header="Sleep Quality" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." buttonText="button" data={thisData} data2={thisData2} avg={avg}/>
      <TrendSection header="Mood and Sleep" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." buttonText="button" data={thisData} data2={thisData2} avg={avg}/>
    </ScrollView>
  );
}
