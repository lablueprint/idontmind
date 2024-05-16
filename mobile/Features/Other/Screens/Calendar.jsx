import { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import XDate from 'xdate';
import PropTypes from 'prop-types';
import JournalCard from '../../Journal/Components/JournalCard';
import styles from './CalendarStyle';

const calendarBackground = require('../../../assets/images/calendarbackground.png');

function CustomHeader({ currentMonth }) {
  function getLocale() {
    return XDate.locales[XDate.defaultLocale];
  }

  function formatNumbers(date) {
    const { numbers } = getLocale();
    return numbers ? date.toString().replace(/[0-9]/g, (char) => numbers[+char]) : date;
  }

  return (
    <View style={[styles.calendarHeader, { justifyContent: 'space-between', marginTop: 5 }]}>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ fontFamily: 'recoleta-alt-regular', fontSize: 18 }}>
          {formatNumbers(currentMonth?.toString('MMMM yyyy'))}
        </Text>
        <View style={styles.highlight} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
        <View style={{ width: 8 }} />
        <View style={{
          width: 15, height: 15, borderRadius: 20, backgroundColor: '#BFDBD7', marginRight: 5,
        }}
        />
        <Text style={{ fontSize: 10, fontFamily: 'cabinet-grotesk-regular' }}>Free Write</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
        <View style={{
          width: 15, height: 15, borderRadius: 20, backgroundColor: '#82A5A1', marginRight: 4,
        }}
        />
        <Text style={{ fontSize: 10, fontFamily: 'cabinet-grotesk-regular' }}>Guided</Text>
      </View>
    </View>
  );
}

CustomHeader.propTypes = {
  currentMonth: PropTypes.shape({
  }).isRequired,
};

export default function CalendarPage({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [allJournals, setAllJournals] = useState([]);
  const [recentJournals, setRecentJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [clickedDate, setClickedDate] = useState(false);
  const [timestamps, setTimestamps] = useState([]);
  const [freeTimestamps, setFreeTimestamps] = useState([]);
  const [guidedTimestamps, setGuidedTimestamps] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new XDate());

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
  }

  const datesAreOnSameDay = (first, second) => {
    if (first && second) {
      return (
        first.getFullYear() === second.getFullYear()
      && first.getMonth() === second.getMonth()
      && first.getDate() === second.getDate()
      );
    }
    return false;
  };

  const getAllJournals = async () => {
    try {
      const result = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/getAllJournals`);
      const tenRecentJournals = result.data.length >= 10 ? result.data.slice(-10) : result.data;
      setAllJournals(result.data);
      setRecentJournals(tenRecentJournals);
      return result.data;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getAllJournals();
  }, []);

  useEffect(() => {
    const timestampsArray = allJournals.map((journal) => new XDate(journal.timestamp).toString('yyyy-MM-dd'));

    const freeTimestampsArray = [];
    const guidedTimestampsArray = [];

    allJournals.forEach((journal) => {
      const timestamp = new XDate(journal.timestamp).toString('yyyy-MM-dd');
      if (journal.type) {
        freeTimestampsArray.push(timestamp);
      } else {
        guidedTimestampsArray.push(timestamp);
      }
    });

    setTimestamps(timestampsArray);
    setFreeTimestamps(freeTimestampsArray);
    setGuidedTimestamps(guidedTimestampsArray);
  }, [allJournals]);

  const handleDateSelect = (date) => {
    // convert selected date to Pacific Time Zone
    const pacificDate = new Date(`${date.dateString}T00:00:00-07:00`);

    const objectDate = new Date(pacificDate);
    const todayDate = new Date();

    if (selectedDate && objectDate.getTime() === selectedDate.getTime() && clickedDate) {
      setClickedDate(false);
    } else {
      if (
        objectDate.getDate() === todayDate.getDate()
            && objectDate.getMonth() === todayDate.getMonth()
            && objectDate.getFullYear() === todayDate.getFullYear()
      ) {
        setClickedDate(true);
      } else {
        setClickedDate(true);
      }
      setSelectedDate(objectDate);
      const journals = [...allJournals];
      setFilteredJournals(journals.filter(
        (journal) => datesAreOnSameDay(new Date(journal.timestamp), objectDate),
      ));
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.clone().addMonths(-1));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.clone().addMonths(1));
  };

  const navigateToJournalPage = () => {
    navigation.navigate('JournalPage');
  };

  const navigateToPastJournal = (username, prompt, text, date) => {
    navigation.navigate('JournalDetails', {
      user: username, question: prompt, body: text, day: date,
    });
  };

  const handleVisibleMonthsChange = (months) => {
    if (months.length > 0) {
      setCurrentMonth(new XDate(months[0].dateString));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={calendarBackground}
          style={{ position: 'absolute', top: -120, resizeMode: 'cover' }}
        />
        <View style={{ padding: 20 }}>
          <Text style={[styles.header, { color: '#F6FCFC' }]}>Journal Entries</Text>
          <Calendar
            initialDate={currentMonth.toString('yyyy-MM-dd')}
            onDayPress={handleDateSelect}
            markingType="custom"
            customHeaderTitle={<CustomHeader currentMonth={currentMonth} />}
            onPressArrowLeft={goToPreviousMonth}
            onPressArrowRight={goToNextMonth}
            onVisibleMonthsChange={handleVisibleMonthsChange}
            markedDates={{
              ...freeTimestamps.reduce((acc, timestamp) => {
                acc[timestamp] = {
                  selected: true,
                  customStyles: {
                    container: {
                      backgroundColor: '#BFDBD7',
                      width: 25,
                      height: 25,
                      borderRadius: 15,
                      marginTop: -3,
                    },
                    text: {
                      color: '#3B3133',
                    },
                  },
                };
                return acc;
              }, {}),
              ...guidedTimestamps.reduce((acc, timestamp) => {
                acc[timestamp] = {
                  selected: true,
                  customStyles: {
                    container: {
                      backgroundColor: '#82A5A1',
                      width: 25,
                      height: 25,
                      borderRadius: 15,
                      marginTop: -3,
                    },
                    text: {
                      color: '#3B3133',
                    },
                  },
                };
                return acc;
              }, {}),
              ...timestamps.reduce((acc, timestamp) => {
                if (freeTimestamps.includes(timestamp) && guidedTimestamps.includes(timestamp)) {
                  acc[timestamp] = {
                    selected: true,
                    customStyles: {
                      container: {
                        backgroundColor: '#82A5A1',
                        borderWidth: '4.9',
                        borderColor: '#BFDBD7',
                        width: 25,
                        height: 25,
                        borderRadius: 15,
                        marginTop: -3,
                      },
                      text: {
                        color: '#3B3133',
                        marginTop: 2,
                      },
                    },
                  };
                }
                return acc;
              }, {}),
            }}
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              lineHeight: '10',
              borderRadius: '5',
            }}
            theme={{
              calendarBackground: '#F6FCFC',
              textMonthFontSize: 14,
              textMonthFontWeight: 'light',
              arrowColor: 'black',
              textDayFontFamily: 'cabinet-grotesk-regular',
              textMonthFontFamily: 'monospace',
              textDayFontSize: 10,
              textDayHeaderFontFamily: 'cabinet-grotesk-regular',
              radius: 4,
              'stylesheet.calendar.main': {
              // Adjust the row height
                week: {
                  marginTop: 1,
                  marginBottom: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                },
                dayContainer: {
                  width: 32,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
              'stylesheet.calendar.header': {
                header: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginTop: 6,
                  alignItems: 'left',
                },
                monthText: {
                  fontSize: 16,
                  color: 'black',
                },
              },
            }}
          />
        </View>
        {clickedDate
          ? (
            <View style={{ paddingHorizontal: 12 }}>
              <View flexDirection="row" justifyContent="space-between">
                <Text style={styles.header}>Past Entries</Text>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#374342', '#546967']} style={styles.addEntriesButton}>
                  <TouchableOpacity onPress={navigateToJournalPage}>
                    <Text style={styles.addEntriesButtonText}>Add Entry +</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
              <View style={[styles.journalCardContainer, styles.journalCardHorizontal]}>
                {filteredJournals.length === 0 ? (
                  <Text style={styles.noEntriesText}>
                    You currently have no logged journal entries for this day
                  </Text>
                ) : (
                  [...filteredJournals].reverse().map((x) => (
                    <JournalCard
                      key={x._id}
                      username={x.username}
                      date={formatDate(x.timestamp)}
                      prompt={x.prompt}
                      text={x.text}
                      type={x.type}
                      onPress={navigateToPastJournal}
                    />
                  ))
                )}
              </View>
            </View>
          )
          : (
            <View style={{ paddingHorizontal: 12 }}>
              <View flexDirection="row" justifyContent="space-between">
                <Text style={styles.header}>Recent Entries</Text>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#374342', '#546967']} style={styles.addEntriesButton}>
                  <TouchableOpacity onPress={navigateToJournalPage}>
                    <Text style={styles.addEntriesButtonText}>Add Entry +</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
              <View style={[styles.journalCardContainer, styles.journalCardHorizontal]}>
                {recentJournals.length === 0 ? (
                  <Text style={styles.noEntriesText}>
                    You currently have no logged journal entries
                  </Text>
                ) : (
                  [...recentJournals].reverse().map((x) => (
                    <JournalCard
                      key={x._id}
                      username={x.username}
                      date={formatDate(x.timestamp)}
                      prompt={x.prompt}
                      text={x.text}
                      type={x.type}
                      onPress={navigateToPastJournal}
                    />
                  ))
                )}
              </View>
            </View>
          ) }
      </ScrollView>
    </View>
  );
}

CalendarPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
