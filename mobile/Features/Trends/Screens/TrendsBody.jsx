import {
  View, Text, ScrollView,
} from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import TrendsHeader from '../Components/TrendsHeader';

function TrendSection({
  header, description, data, data2, avg,
}) {
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
        style={{ backgroundColor: 'black' }}
        data={data}
        data2={data2}
        color1="#bfdbd7"
        color2="#5d9e9f"
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
    const getUserTimeSeries = async () => {
      try {
        const weekOffset = 1;
        const current = new Date('2024-04-15T00:00:00');
        const start = new Date(current);
        const mid = new Date(current);
        const end = new Date(current);

        start.setMonth(current.getMonth() + 2, 1); // May 1st
        mid.setMonth(start.getMonth() + 1, 0); // May 30th
        end.setMonth(mid.getMonth() + 1, 0); // May 30th

        start.setDate(current.getDate() + (7 * weekOffset));
        mid.setDate(start.getDate() + 7);
        end.setDate(start.getDate() + 14);

        const startDate = start.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        const midDate = mid.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        const endDate = end.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/timeSerie/getUserTimeSeries`, {
          email: 'booooooop',
          userId: 'booop',
          startDate,
          midDate,
          endDate,
        });

        const {
          PercentageAvgSleep, PercentageAvgWater, firstPeriod, secondPeriod,
        } = res.data[0];

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
    getUserTimeSeries();
  }, []);
  return (
    <ScrollView>
      <LinearGradient colors={['#E0F1F3', '#E5F8F3']} style={{ gap: 35, paddingTop: 50, paddingHorizontal: 30 }}>
        <TrendsHeader title={title} />
        <TrendSection header="Energy Levels" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." data={lastPeriodWater} data2={currentPeriodWater} avg={avgWaterPercentage} />
        <View style={{ marginBottom: 75 }}>
          <TrendSection header="Sleep Quality" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." data={lastPeriodSleep} data2={currentPeriodSleep} avg={avgSleepPercentage} />
        </View>
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
};
