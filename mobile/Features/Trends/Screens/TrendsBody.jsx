import {
  View, Text, ScrollView,
} from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BarChart, LineChart } from 'react-native-gifted-charts';
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

function BarGraphSection({
  header, description, data, modeLabel,
}) {
  return (
    <View style={{
      display: 'flex', flexDirection: 'column', gap: 10,
    }}
    >
      <Text style={{ fontSize: 24 }}>{header}</Text>
      <Text style={{ fontSize: 14 }}>{description}</Text>
      <BarChart
        data={data}
        height={150}
        width={350}
        hideRules
        hideYAxisText
        scrollAnimation={false}
        disableScroll
        maxValue={10}
        hideAxesAndRules
      />
      <Text>
        On average, you&apos;ve been drinking
        {' '}
        <Text style={{ color: '#82ad98' }}>{modeLabel}</Text>
        {' '}
        water.
      </Text>
    </View>
  );
}

BarGraphSection.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  modeLabel: PropTypes.number.isRequired,
};

export default function TrendsBody({ route }) {
  const [lastPeriodSleep, setLastPeriodSleep] = useState([]);
  const [currentPeriodSleep, setCurrentPeriodSleep] = useState([]);
  const [lastPeriodWater, setLastPeriodWater] = useState([]);
  const [currentPeriodWater, setCurrentPeriodWater] = useState([]);
  const [avgSleepPercentage, setAvgSleepPercentage] = useState(0);
  const [avgWaterPercentage, setAvgWaterPercentage] = useState(0);
  const [currentWeek, setCurrentWeek] = useState([]);
  const [modeLabel, setModelLabel] = useState(0);

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

        const mapValue = (value) => {
          if (value < 1) return 0;
          if (value >= 1 && value <= 3) return 2.5;
          if (value >= 4 && value <= 6) return 5;
          if (value >= 7 && value <= 9) return 7.5;
          if (value > 9) return 10;
          return value;
        };

        const mapLabel = (label) => {
          switch (label) {
            case 'S':
              return 'Sat';
            case 'U':
              return 'Sun';
            case 'M':
              return 'Mon';
            case 'T':
              return 'Tue';
            case 'W':
              return 'Wed';
            case 'R':
              return 'Thu';
            case 'F':
              return 'Fri';
            default:
              return label;
          }
        };

        const currWeek = secondPeriod.WaterData.slice(0, 7).map((item) => ({
          label: mapLabel(item.label),
          value: mapValue(item.value),
        }));
        setCurrentWeek(currWeek);

        const calculateMode = (currData) => {
          if (currData.length === 0) return null;

          const countMap = {};
          let modeValue = null;
          let maxCount = 0;

          currData.forEach((obj) => {
            const { value } = obj;
            countMap[value] = (countMap[value] || 0) + 1;

            if (countMap[value] > maxCount) {
              maxCount = countMap[value];
              modeValue = value;
            }
          });

          switch (modeValue) {
            case 0:
              return 'no';
            case 2.5:
              return 'not enough';
            case 5:
              return 'some amount of';
            case 7.5:
              return 'enough';
            case 10:
              return 'a lot of';
            default:
              return '';
          }
        };
        setModelLabel(calculateMode(currWeek));
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
        <BarGraphSection header="Staying Hydrated" description="Drinking a sufficient amount of water every day improves mood and overall health" data={currentWeek} modeLabel={modeLabel} />
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
