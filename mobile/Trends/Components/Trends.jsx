import { useState } from 'react';
import {
  Button, View, Text, ScrollView, TouchableOpacity,
} from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';
import styles from './TrendsStyle';
import { data, barData } from './TrendsData';
import TrendsHeader from './TrendsHeader';

function TrendSection({header, description, buttonText}) {
  return(
    <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
      <Text style={{fontSize: 24}}>{header}</Text>
      <Text style={{fontSize: 14}}>{description}</Text>
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

TrendSection.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
}

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
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <ScrollView style={{ backgroundColor: '#FFF8F8' }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View className="header" style={{ marginTop: 40 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>Trends</Text>
              <View style={{alignSelf: 'center', display: 'flex', flexDirection: 'row', gap: 20, marginRight: 10}}>
                <TouchableOpacity>
                  <Text style={{fontSize: 18}}>Week</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{fontSize: 18}}>Month</Text>                                
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{ marginBottom: 10, fontSize: 14 }}>
              General Insights
            </Text>
            <View style={styles.line} />
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={{gap: 35}}>
              <TrendSection header="Mood and Sleep" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." buttonText="button"/>
              <TrendSection header="Mood and Sleep" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." buttonText="button"/>
              <TrendSection header="Mood and Sleep" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." buttonText="button"/>        
            </View>    
          </View>                
        </View>
      </ScrollView>
      <View style={{flex: 1}}>
        <View style={[styles.weekContainer, {position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'white'}]}>
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
    </View>    
  </View>    
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
const Tab = createBottomTabNavigator();

export default function Trends() {
  return (
    <TrendTab view="week" />
  );
}
