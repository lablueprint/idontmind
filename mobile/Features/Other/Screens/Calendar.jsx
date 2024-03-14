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
  const [recentJournals, setRecentJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [clickedDate, setClickedDate] = useState(false);


  const datesAreOnSameDay = (first, second) => {
    console.log(`firstTime: ${first}`);
    console.log(`secondTime: ${second}`);
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
      const recent_journals = result.data.length >= 10 ? result.data.slice(-10) : result.data;
      setAllJournals(result.data);
      setRecentJournals(recent_journals);
    } catch (err) {
      console.error(err);
      return err;
    }
  };


  useEffect(() => {
    getAllJournals();
  }, []);


  const handleDateSelect = (date) => {
    object_date = new Date(date.dateString);
    todayDate = new Date();
    console.log("OBJECT FULL DATE:", object_date);
    console.log("TODAY FULL DATE:", todayDate);

    console.log("OBJECT DAY:", object_date.getUTCDate());
    console.log("TODAY DAY:", todayDate.getDate());
    
  
    if (
      object_date.getUTCDate() === todayDate.getDate() &&
      object_date.getUTCMonth() === todayDate.getMonth() &&
      object_date.getYear() === todayDate.getYear()
    ) {
      setClickedDate(false);
    } else {
      setClickedDate(true);
    }
    setSelectedDate(object_date);
    const journals = [...allJournals];
    setFilteredJournals(journals.filter((journal) => datesAreOnSameDay(new Date(journal.timestamp), object_date)));
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
      <ScrollView>
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
          onDayPress={handleDateSelect}
          markedDates={{
        [selectedDate]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
          }}
          //need to figure out styling of calendar
          style={{
            borderWidth: 1,
            borderColor: 'gray',
          }}
          
          theme={{
            calendarBackground: '#91A8D1',
            backgroundColor: '#91A8D1',
            textMonthFontSize: 24,
            textMonthFontWeight: 'bold',
            arrowColor: 'white',
            'stylesheet.calendar.header': {
              calendar: {
                lineHeight: 20,
              },      
              header: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 6,
                alignItems: 'center',
              },
              monthText: {
                fontSize: 16, // Decrease the font size of month text
                fontWeight: 'bold',
                color: 'white',
              },
            },
          }}

          stylesheet={{
            calendar: {
              // Adjust lineHeight to reduce space between rows
              lineHeight: 50,
            },
            dayNumFontFamily: {
              // Adjust font family for day numbers if needed
            },
            dayNumFontSize: {
              // Adjust font size of day numbers
              fontSize: 16,
            },
            dayTextColor: {
              // Adjust color of day numbers
              color: 'black',
            },
            todayTextColor: {
              // Adjust color of today's date
              color: 'blue',
            },
            selectedDayTextColor: {
              // Adjust color of selected date
              color: 'white',
            },
            textDayFontFamily: {
              // Adjust font family for day text if needed
            },
            textDayFontSize: {
              // Adjust font size of day text if needed
            },
            textDayFontWeight: {
              // Adjust font weight of day numbers
              fontWeight: 'bold',
            },
            textMonthFontFamily: {
              // Adjust font family for month text if needed
            },
            textMonthFontSize: {
              // Adjust font size of month text
              fontSize: 18,
            },
            textMonthFontWeight: {
              // Adjust font weight of month text
              fontWeight: 'bold',
            },
            textDayHeaderFontSize: {
              // Adjust font size of day header
              fontSize: 14,
            },
            textDayHeaderFontWeight: {
              // Adjust font weight of day header
              fontWeight: 'bold',
            },
            arrowStyle: {
              // Adjust arrow style if needed
            },
          }}
        />
      </View>
      {clickedDate ? 
      <View>
        <Text>Past Entries</Text>
          {filteredJournals.reverse().map((x) => (
            <JournalCard
              key={x._id}
              username={x.username}
              date={x.timestamp}
              prompt={x.prompt}
              text={x.text}
              onPress={navigateToPastJournal}

            />
          ))}
      </View> :
      <View>
        <Text>Recent Entries</Text>
          {recentJournals.reverse().map((x) => (
            <JournalCard
              key={x._id}
              username={x.username}
              date={x.timestamp}  
              prompt={x.prompt}
              text={x.text}
              onPress={navigateToPastJournal}

            />
          ))}
      </View> 
      }
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
