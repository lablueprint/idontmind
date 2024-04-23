import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, ListView, TouchableOpacity, Button
} from 'react-native';
// import CalendarPicker from 'react-native-calendar-picker';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import axios from 'axios';
import JournalCard from '../../Journal/Components/JournalCard';
import LinearGradient from 'react-native-linear-gradient';


export default function CalendarPage({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [allJournals, setAllJournals] = useState([]);
  const [recentJournals, setRecentJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [clickedDate, setClickedDate] = useState(false);
  const [timestamps, setTimestamps] = useState([]);

  const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const datesAreOnSameDay = (first, second) => {
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
      setTimestamps(result.data.map(journal => journal.timestamp.substring(0,10)));
      timestamps.forEach(timestamp => console.log(timestamp));
      allJournals.forEach(journal => console.log(journal))

    } catch (err) {
      console.error(err);
      return err;
    }
  };

  useEffect(() => {
    getAllJournals();
  }, []);
  const handleDateSelect = (date) => {
    // Convert selected date to Pacific Time Zone
    const pacificDate = new Date(`${date.dateString}T00:00:00-07:00`); // Assuming the selected date is in YYYY-MM-DD format

    // Use the Pacific Time Zone date for further processing
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
        setClickedDate(true); // Set clickedDate to true for the current date
      } else {
        setClickedDate(true); // Set clickedDate to true for other dates
      }
      setSelectedDate(objectDate);
      const journals = [...allJournals];
      setFilteredJournals(journals.filter((journal) => datesAreOnSameDay(new Date(journal.timestamp), objectDate)));
      // console.log(`filtered journals: ${filteredJournals}`);
    }
  };
  // console.log("selected Date", selectedDate);
  const getJournalTimestamps = () => ({
    
  });

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

  const navigateToJournalPage = () => {
    navigation.navigate('JournalPage'); // Replace 'JournalPage' with the name of your journal page component
  };

  const navigateToPastJournal = (username, prompt, text, date) => {
    navigation.navigate('JournalDetails', {
      user: username, question: prompt, body: text, day: date,
    });
  }; /* navigate to the past journal entry, isHistory
   is set to true (uneditable text box with the corresponding prompt) */

   

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={{ padding: 20 }}>
      <Text style={styles.header}>Journal Entries</Text>
        <Calendar
          onDayPress={handleDateSelect}
          // customHeader={<CustomHeader month={LocaleConfig.months[month]} year={year} />} // Pass the custom header component here
          markedDates={{
            [selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
            // timestamps.map(timestamp => ({ timestamp: { selected: true } } )),
            ...timestamps.reduce((acc, timestamp) => {
              acc[timestamp] = { selected: true, selectedColor: '#BFDBD7' };
              return acc;
            }, {})
          }}
          // need to figure out styling of calendar
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            lineHeight: '10',
            borderRadius: '5',
          }}

          theme={{
            calendarBackground: '#F6FCFC',
            // backgroundColor: '#82A5A1',
            textMonthFontSize: 14,
            textMonthFontWeight: 'light',
            arrowColor: 'black',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayFontSize: 12,
            textDayHeaderFontFamily: 'monospace',
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
                width: 32, // Adjust the width of each day container
                height: 32, // Adjust the height of each day container
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
                fontSize: 16, // Decrease the font size of month text
                color: 'black',
              },
            },
          }}

          stylesheet={{
            calendar: {
              // Adjust lineHeight to reduce space between rows
              dayHeight: 10, //doesn't work
            },
          //   dayNumFontFamily: {
          //     // Adjust font family for day numbers if needed
          //   },
            // dayNumFontSize: {
            //   // Adjust font size of day numbers
            //   fontSize: 10,
            // },
          //   dayTextColor: {
          //     // Adjust color of day numbers
          //     color: 'black',
          //   },
          //   todayTextColor: {
          //     // Adjust color of today's date
          //     color: 'blue',
          //   },
          //   selectedDayTextColor: {
          //     // Adjust color of selected date
          //     color: 'white',
          //   },
          //   textDayFontFamily: {
          //     // Adjust font family for day text if needed
          //   },
          //   textDayFontSize: {
          //     // Adjust font size of day text if needed
          //   },
          //   textDayFontWeight: {
          //     // Adjust font weight of day numbers
          //     fontWeight: 'bold',
          //   },
          //   textMonthFontFamily: {
          //     // Adjust font family for month text if needed
          //   },
          //   textMonthFontSize: {
          //     // Adjust font size of month text
          //     fontSize: 18,
          //   },
          //   textMonthFontWeight: {
          //     // Adjust font weight of month text
          //     fontWeight: 'bold',
          //   },
          //   textDayHeaderFontSize: {
          //     // Adjust font size of day header
          //     fontSize: 14,
          //   },
          //   textDayHeaderFontWeight: {
          //     // Adjust font weight of day header
          //     fontWeight: 'bold',
          //   },
          //   arrowStyle: {
          //     // Adjust arrow style if needed
          //   },
          }}
        />
      </View>
      {clickedDate
        ? (
          <View style={{paddingHorizontal: 12}}>
            <View flexDirection='row' justifyContent='space-between'>
              <Text style={styles.header}>Recent Entries</Text>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                <TouchableOpacity style={styles.addEntriesButton} onPress={navigateToJournalPage}>
                  <Text>Add Entry +</Text>
                </TouchableOpacity>  
              </LinearGradient>          
            </View>
            <View style={[styles.journalCardContainer, styles.journalCardHorizontal]}>
              {[...filteredJournals].reverse().map((x) => (
                <JournalCard
                  key={x._id}
                  username={x.username}
                  date={formatDate(x.timestamp)}
                  prompt={x.prompt}
                  text={x.text}
                  onPress={navigateToPastJournal}
                />
                /* Recent Entries */
              ))}
            </View>
          </View>
        )
        : (
          <View style={{paddingHorizontal: 12}}>
            <View flexDirection='row' justifyContent='space-between'>
              <Text style={styles.header}>Recent Entries</Text>
              <TouchableOpacity onPress={navigateToJournalPage}>
                <Text>Add Entry +</Text>
              </TouchableOpacity>            
            </View>
            <View style={[styles.journalCardContainer, styles.journalCardHorizontal]}>
              {[...recentJournals].reverse().map((x) => (
                <JournalCard
                  key={x._id}
                  username={x.username}
                  date={formatDate(x.timestamp)}
                  prompt={x.prompt}
                  text={x.text}
                  onPress={navigateToPastJournal}
                />
              ))}
            </View>
          </View>
        ) }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexWrap: "wrap",
    backgroundColor: '#E4F6F3',
    marginTop: 40,
    
  },
  journalCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    maxWidth: 369,
  },

  journalCardHorizontal: {
    justifyContent: 'flex-start',
  },

  header: {
    fontFamily: 'Recoleta',
    fontSize: 22,
    paddingBottom: 10,
  },

  addEntriesButton: {
    borderRadius: 8,
    backgroundColor: '#546967', 
    backgroundImage: 'linear-gradient(93.55deg, #374342 -0.17%, #546967 99.83%)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  addEntriesButtonText: {

  }
});