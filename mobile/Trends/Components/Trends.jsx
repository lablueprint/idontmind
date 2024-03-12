import { useState } from 'react';
import {
  Button, View, Text, ScrollView,
} from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PropTypes from 'prop-types';
import styles from './TrendsStyle';
import { data, barData } from './TrendsData';

function TrendTab({ view }) {
  // -1 = last week, 0 = this week, 1 = next week, etc.
  const [weekOffset, setWeekOffset] = useState(0);
  // changes the week when navigating the < > buttons
  const changeWeek = (val) => {
    if (weekOffset + val > 0) return;
    setWeekOffset(weekOffset + val);
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
        startDate = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        endDate = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
    <ScrollView style={{ backgroundColor: '#FFF8F8' }}>
      <View style={styles.container}>
        <Text style={styles.title}>trends</Text>
        <Text>
          your tendencies in this past
          {' '}
          {view}
          .
        </Text>
        <View style={styles.line} />
        <View style={styles.weekContainer}>
          <Button title="<" color="black" onPress={() => changeWeek(-1)} />
          <View style={styles.displayWeek}>
            <Text style={styles.weekText}>
              {getWeekText()}
            </Text>
            <Text style={styles.dateText}>
              {getDate()}
            </Text>
          </View>
          <Button title=">" color="black" onPress={() => changeWeek(1)} />
        </View>
        <View style={styles.chartWrapper}>
          <Text style={styles.trendHeader}>trend header</Text>
          <BarChart
            showFractionalValue
            showYAxisIndices
            hideRules
            noOfSections={4}
            maxValue={400}
            data={barData}
            barWidth={40}
            sideWidth={15}
            isThreeD
            side="right"
          />
        </View>
        <View style={styles.chartWrapper}>
          <Text style={styles.trendHeader}>trend header</Text>
          <LineChart
            data={data}
            width={300}
            height={300}
          />
        </View>
      </View>
    </ScrollView>
  );
}
TrendTab.propTypes = {
  view: PropTypes.string.isRequired,
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
export default function Trends() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Week" component={WeekTab} />
      <Tab.Screen name="Month" component={MonthTab} />
      <Tab.Screen name="Year" component={YearTab} />
    </Tab.Navigator>
  );
}
