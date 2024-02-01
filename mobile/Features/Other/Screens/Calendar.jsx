import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
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

  return (
    <View style={{ marginTop: 40 }}>
      <CalendarPicker
        onDateChange={handleDateSelect}
      />
      {filteredJournals.map((x) => (
        <Text> {x.text}</Text>
      ))}
    </View>
  );
}
