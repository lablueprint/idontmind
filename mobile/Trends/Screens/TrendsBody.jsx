import {
  View, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import PropTypes from 'prop-types';
import TrendsHeader from '../Components/TrendsHeader';
import { LinearGradient } from 'expo-linear-gradient';

function TrendSection({
  header, description, buttonText, data, data2, avg,
}) {
  console.log(data);
  console.log(data2);
  let result = '';
  if (avg < 0) {
    result = `${Math.round(avg) * -1}% decrease `;
  } else {
    result = `${Math.round(avg)}% increase `;
  }
  return (
    <View style={{
      display: 'flex', flexDirection: 'column', gap: 10,
    }}
    >
      <Text style={{ fontSize: 24 }}>{header}</Text>
      <Text style={{ fontSize: 14 }}>{description}</Text>
      <LineChart
      style={{backgroundColor: 'black'}}
        data={data}
        data2={data2}
        color1={'#bfdbd7'}
        color2={'#5d9e9f'}
        thickness={5}        
        width={350}
        height={350}
        curved
        hideDataPoints
        hideRules
        hideYAxisText
        hideAxesAndRules
        yAxisLabelWidth={0}
        yAxisOffset={0}
        isAnimated
        
      />
      <Text>
        Your energy trended a
        {' '}
        <Text style={{ color: '#82ad98' }}>{result}</Text>
        {avg < 0 ? 'downward' : 'upward'}
        {' '}
        from the previous week.
      </Text>
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
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  data2: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  avg: PropTypes.number.isRequired,
};

export default function TrendsBody({ route }) {
  const [lastPeriodSleep, setLastPeriodSleep] = useState([]);
  const [currentPeriodSleep, setCurrentPeriodSleep] = useState([]);
  const [lastPeriodWater, setLastPeriodWater] = useState([]);
  const [currentPeriodWater, setCurrentPeriodWater] = useState([]);  
  const [avgSleepPercentage, setAvgSleepPercentage] = useState(0);
  const [avgWaterPercentage, setAvgWaterPercentage] = useState(0);

  const { title } = route.params;

  useEffect(() => {
    const getSleepTimeSeries = async () => {
      try {
        const weekOffset = 1;
        const current = new Date();
        const start = new Date(current);
        const mid = new Date(current);
        const end = new Date(current);

        start.setMonth(current.getMonth() + 2, 1); // May 1st 
        mid.setMonth(start.getMonth() + 1, 0); // May 30th
        end.setMonth(start.getMonth() + 1, 0); // May 30th

        start.setDate(current.getDate() + (7 * weekOffset));
        mid.setDate(start.getDate() + 7);
        end.setDate(mid.getDate() + 7);

        const startDate = start.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        const midDate = mid.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        const endDate = end.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        console.log(startDate);
        console.log(midDate);
        console.log(endDate);

        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/timeSerie/getSleepTimeSeries`, {
          email: 'booooooop',
          userId: 'booop',
          startDate,
          midDate,
          endDate,
        });
        console.log(res.data[0]);

        const { PercentageAvgSleep, PercentageAvgWater, firstPeriod, secondPeriod } = res.data[0];

        /* Default */
        setLastPeriodSleep(firstPeriod.SleepData);
        setCurrentPeriodSleep(secondPeriod.SleepData);
        setLastPeriodWater(firstPeriod.WaterData);
        setCurrentPeriodWater(secondPeriod.WaterData);
        setAvgSleepPercentage(PercentageAvgSleep);
        setAvgWaterPercentage(PercentageAvgWater);

      } catch (err) {
        console.error(err);
      }
    };
    getSleepTimeSeries();
  }, []);
  return (
      <ScrollView>
        <LinearGradient colors={['#E0F1F3', '#E5F8F3']} style={{ gap: 35, paddingTop: 50, paddingHorizontal: 30 }}>        
          <TrendsHeader title={title} />
          <TrendSection header="Energy Levels" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." buttonText="button" data={lastPeriodWater} data2={currentPeriodWater} avg={avgWaterPercentage}/>
          <View style={{marginBottom: 75}}>
            <TrendSection header="Sleep Quality" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." buttonText="button" data={lastPeriodSleep} data2={currentPeriodSleep} avg={avgSleepPercentage}/>
          </View>      
          {/* <TrendSection header="Mood and Sleep" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." buttonText="button" data={lastPeriodSleep} data2={currentPeriodSleep} avg={avgPercentage}/> */}
        </LinearGradient>        
      </ScrollView>

  );
}

TrendsBody.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
  }).isRequired,
}
