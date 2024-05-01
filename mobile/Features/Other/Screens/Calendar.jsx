import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
// import CalendarPicker from 'react-native-calendar-picker';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import axios from 'axios';
import JournalCard from '../../Journal/Components/JournalCard';

export default function CalendarPage({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [allJournals, setAllJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);

  const datesAreOnSameDay = (first, second) => {
    console.log(`journal's date: ${first.getDate()}`);
    console.log(`selected date: ${second.getDate()}`);
    if (first && second) {
      return (
        first.getFullYear() === second.getFullYear()
      && first.getMonth() === second.getMonth()
      && first.getDate() === second.getDate()
      );
    }
  };

  const getAllJournals = async () => {
    try {
      const result = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/offJournal/getAllJournals`);
      setAllJournals(result.data);
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  useEffect(() => {
    getAllJournals();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const journals = [...allJournals];
    setFilteredJournals(journals.filter((journal) => datesAreOnSameDay(new Date(journal.timestamp), date)));
    console.log(`filtered journals: ${filteredJournals}`);
  };

  const customDayHeaderStyles = ({ dayOfWeek, month, year }) => ({
    style: {
      borderRadius: 6,
      borderWidth: 1,
      backgroundColor: 'lightpurple',
    },
    textStyle: {
      fontSize: 12,
      fontWeight: 'light',
    },
  });

  const customDatesStyles = (date) => ({
    style: {
      backgroundColor: '#55637F',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'light',
    },
  });
  const headerWrapperStyle = () => ({
    textStyle: {
      fontSize: 1,
      borderWidth: 11,
    },

  });
  const dayLabelsWrapper = () => ({
    textStyle: {
      borderWidth: 0,

    },
  });

  const navigateToPastJournal = (text) => {
    navigation.navigate('Journal', { body: text, isHistory: true });
  }; /* navigate to the past journal entry, isHistory
   is set to true (uneditable text box with the corresponding prompt) */

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#91A8D1', margin: 10 }}>
        {/* <CalendarPicker
          todayBackgroundColor={'blue'}
          customDatesStyles={customDatesStyles}
          customDayHeaderStyles={customDayHeaderStyles}
          onDateChange={handleDateSelect}
          headerWrapperStyle={headerWrapperStyle}
          dayLabelsWrapper={dayLabelsWrapper}
        /> */}
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
          }}
          theme={{
            calendarBackground: '#91A8D1',
            backgroundColor: '#91A8D1',
            textMonthFontSize: 24,
            textMonthFontWeight: 'bold',
            arrowColor: 'white',

          }}
        />
      </View>

      <ScrollView>
        {filteredJournals.map((x) => (
          <JournalCard
            key={x._id}
            email={x.email}
            date={x.timestamp}
            prompt={x.prompt}
            text={x.text}
            onPress={navigateToPastJournal}

          />
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'bl',
    marginTop: 40,
  },
});
