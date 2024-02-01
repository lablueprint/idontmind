import { useState, useEffect } from 'react';
import { View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import axios from 'axios';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [allJournals, setAllJournals] = useState([]);

  const datesAreOnSameDay = (first, second) => {
    return (
    first.getFullYear() === second.getFullYear()
    && first.getMonth() === second.getMonth()
    && first.getDate() === second.getDate()
    )
  };
  
  const getAllJournals = async () => {
    try {
      const result = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/getAllJournals`);
      console.log(`result data: ${result.data}`);
      setAllJournals(result.data);
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  useEffect(() => {
    getAllJournals();
  }, []);

  const filterForDate = (date) => {
    const filteredJournals = allJournals.filter((journal) => datesAreOnSameDay(journal.timestamp, currentDate))
    console.log(filteredJournals);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const filteredJournals = allJournals.filter((journal) => datesAreOnSameDay(journal.timestamp, currentDate))
    console.log(filteredJournals);
  };

  console.log(selectedDate);

  return (
    <View style={{ marginTop: 40 }}>
      <CalendarPicker
        onDateChange={handleDateSelect}
      />
    </View>
  );
}
