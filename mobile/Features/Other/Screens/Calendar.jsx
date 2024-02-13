import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import axios from 'axios';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
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
      const result = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/getAllJournals`);
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

  const customDayHeaderStyles = ({dayOfWeek, month, year}) => {
    return {
      style: {
        borderRadius: 12,
        backgroundColor: 'lightpurple',
      },
      textStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      }
    };
  };

  const customDatesStyles = date => {
    return {
      style: {
        backgroundColor: 'pink',
      },
      textStyle: {
        color: 'blue',
        fontWeight: 'bold',
      }
    };
  };

  return (
    <View style={styles.container}>
      <CalendarPicker
        todayBackgroundColor={'white'}
        customDatesStyles={customDatesStyles}
        customDayHeaderStyles={customDayHeaderStyles}
        onDateChange={handleDateSelect}
      />
      {filteredJournals.map((x) => (
        <Text> {x.text}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    marginTop: 40,
  },
});