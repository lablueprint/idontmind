import { useState } from 'react';
import {
  Button, View, Text, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './TrendsStyle';
import { data } from './TrendsData';
import TrendsHeader from './TrendsHeader';
import Arrow from '../../../assets/images/arrow.png';

function TrendSection({ header, description, buttonText }) {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Text style={{ fontSize: 24 }}>{header}</Text>
      <Text style={{ fontSize: 14 }}>{description}</Text>
      <LineChart
        data={data}
        width={300}
        height={300}
      />
      <Text>some response</Text>
      <TouchableOpacity>
        <Text>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

function CircleProgress() {
  return (
    <View>
      <AnimatedCircularProgress
        size={90}
        width={12}
        fill={75}
        tintColor="#374342"
        backgroundColor="#F6FCFC"
        rotation={180}
        lineCap="round"
      />
    </View>
  );
}

function CircleSection({ header, description, navigateToTrendsBody }) {
  return (
    <View style={[styles.column, { marginBottom: 30 }]}>
      <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 30 }]}>
        <View style={[styles.column]}>
          <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 20 }}>
            {header}
          </Text>
          <Text>
            {description}
          </Text>
        </View>
        <View>
          <LinearGradient colors={['#E0F1F3', '#E5F8F3']}>
            <TouchableOpacity onPress={navigateToTrendsBody}>
              <Image source={Arrow} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <CircleProgress />
        <CircleProgress />
        <CircleProgress />
      </View>
    </View>

  );
}

function WaterSection() {
  return (
    <View style={[styles.column]}>
      <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 30, paddingHorizontal: 50 }]}>
        <CircleProgress />
        <CircleProgress />
      </View>
    </View>
  );
}

TrendSection.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

CircleSection.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  navigateToTrendsBody: PropTypes.func.isRequired,
};

function TrendTab({ view, navigation }) {
  // -1 = last week, 0 = this week, 1 = next week, etc.
  const [weekOffset, setWeekOffset] = useState(0);
  // changes the week when navigating the < > buttons
  const changeWeek = (val) => {
    if (weekOffset + val > 0) return;
    setWeekOffset(weekOffset + val);
  };

  const navigateToTrendsBody = () => {
    navigation.navigate('TrendsBody', { title: 'Activity' });
  };

  // map week number to displayed text
  const getWeekText = () => {
    if (weekOffset === 0) {
      return `this ${view}.`;
    } if (weekOffset === -1) {
      return `last ${view}.`;
    }
    return `${Math.abs(weekOffset)} ${view}s ago.`;
  };

  const getDate = () => {
    const current = new Date();
    const start = new Date(current);
    const end = new Date(current);
    let startDate = '';
    let endDate = '';
    switch (view) {
      case 'week': // week does not work
        start.setDate(current.getDate() + (weekOffset * 7) - current.getDay());
        end.setDate(start.getDate() + 6);
        startDate = start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        endDate = end.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        return `${startDate} - ${endDate}`.toLowerCase();

      case 'month':
        start.setMonth(current.getMonth() + weekOffset, 1);
        end.setMonth(start.getMonth() + 1, 0);
        startDate = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        endDate = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `${startDate} - ${endDate}`.toLowerCase();

      case 'year':
        start.setFullYear(current.getFullYear() + weekOffset, 0, 1);
        end.setFullYear(start.getFullYear(), 11, 31);
        startDate = start.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        endDate = end.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        return `${startDate} - ${endDate}`.toLowerCase();
      default:
    }
    return '';
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#E0F1F3', '#E5F8F3']} style={[styles.container, { flex: 1 }]}>
          <View className="header" style={{ marginTop: 40, marginBottom: 150 }}>
            <TrendsHeader title="Trends" />
            <CircleSection header="Activity" description="Water, food, and movement at a glance." navigateToTrendsBody={navigateToTrendsBody} />
            <WaterSection />
            <CircleSection header="Emotion" description="Feelings, goals, and outlook" navigateToTrendsBody={navigateToTrendsBody} />
          </View>
        </LinearGradient>
      </ScrollView>
      <View style={{ flex: 1 }}>
        <View style={[styles.weekContainer, {
          position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#BFDBD7', borderTopLeftRadius: 50, borderTopRightRadius: 50,
        }]}
        >
          <Button title="<" color="black" onPress={() => changeWeek(-1)} />
          <LinearGradient colors={['#374342', '#546967']} style={styles.displayWeek}>
            <Text style={styles.dateText}>
              {getDate()}
            </Text>
          </LinearGradient>
          <Button title=">" color="black" onPress={() => changeWeek(1)} />
        </View>
      </View>
    </View>
  );
}

TrendTab.propTypes = {
  view: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

function WeekTab() {
  return <TrendTab view="week" />;
}
function MonthTab() {
  return <TrendTab view="month" />;
}
function YearTab() {
  return <TrendTab view="year" />;
}
const Tab = createBottomTabNavigator();

export default function Trends({ navigation }) {
  return (
    <TrendTab view="week" navigation={navigation} />
  );
}

Trends.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
