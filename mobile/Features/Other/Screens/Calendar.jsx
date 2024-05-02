import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, ListView, TouchableOpacity, Button
} from 'react-native';
// import CalendarPicker from 'react-native-calendar-picker';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import JournalCard from '../../Journal/Components/JournalCard';
import { LinearGradient } from 'expo-linear-gradient';
import XDate from 'xdate';

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
  };

  const getAllJournals = async () => {
    try {
      const result = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/getAllJournals`);
      const recent_journals = result.data.length >= 10 ? result.data.slice(-10) : result.data;
      setAllJournals(result.data);
      setRecentJournals(recent_journals);
      // setTimestamps(result.data.map(journal => journal.timestamp.substring(0,10)));

      // const localTimestamps = result.data.map(journal => {
      //   const timestamp = new Date(journal.timestamp);
      //   return timestamp.toISOString().substring(0, 10); // Convert to local time string and extract date part
      // });
      // const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // const localTimestamps = result.data.map(journal => {
      //   const timestamp = new Date(journal.timestamp);
      //   // Convert to local time string and extract date part
      //   return timestamp.toLocaleDateString(undefined, { timeZone: localTimezone });
      // });

      const freeTimestampsArray = [];
      const guidedTimestampsArray = [];
    
      allJournals.forEach(journal => {
        const timestamp = new XDate(journal.timestamp).toString('yyyy-MM-dd');
        if (journal.type) {
          freeTimestampsArray.push(timestamp);
        } else {
          guidedTimestampsArray.push(timestamp);
        }
      });
    
      setFreeTimestamps(freeTimestampsArray);
      setGuidedTimestamps(guidedTimestampsArray);
    

      //BEFORE HERE WAS GOOD
      const localTimestamps = result.data.map(journal => {
        const timestamp = new XDate(journal.timestamp);
        // Convert to local time string and extract date part
        return timestamp.toString('yyyy-MM-dd');
      });

      setTimestamps(localTimestamps);
  
      timestamps.forEach(timestamp => console.log("TIMESTAMP:", timestamp));
      allJournals.forEach(journal => console.log(journal))

    } catch (err) {
      console.error(err);
      return err;
    }
  };

  useEffect(() => {
    getAllJournals();
  }, [[selectedDate]]);
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

  function getLocale() {
    return XDate.locales[XDate.defaultLocale];
  }

  function formatNumbers(date) {
    const numbers = getLocale().numbers;
    return numbers ? date.toString().replace(/[0-9]/g, (char) => numbers[+char]) : date;
  }

  // Function to handle navigation to the previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => prevMonth.clone().addMonths(-1));
  };

  // Function to handle navigation to the next month
  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => prevMonth.clone().addMonths(1));
  };
  

  const CustomHeader = ({ currentMonth }) => {
    // const webProps = Platform.OS === 'web' ? {'aria-level': webAriaLevel} : {};

    return (
      <View style={[styles.calendarHeader, { justifyContent: 'space-between' }]}>
        <Text style={{fontFamily: 'recoleta-alt-regular', size: 32}}>
            {formatNumbers(currentMonth?.toString('MMMM yyyy'))}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
          <View style={{ width: 30}}></View>
            <View style={{ width: 12, height: 12, borderRadius: 20, backgroundColor: '#BFDBD7', marginRight: 4 }} />
            <Text style={{ fontSize: 10, fontFamily: 'cabinet-grotesk-regular' }}>Free Write</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
            <View style={{ width: 12, height: 12, borderRadius: 20, backgroundColor: '#82A5A1', marginRight: 4 }} />
            <Text style={{ fontSize: 10, fontFamily: 'cabinet-grotesk-regular'}}>Guided Write</Text>
      </View>
    </View>
    );
  };



  const navigateToJournalPage = () => {
    navigation.navigate('JournalPage');
  };

  const navigateToPastJournal = (username, prompt, text, date) => {
    navigation.navigate('JournalDetails', {
      user: username, question: prompt, body: text, day: date,
    });
  }; /* navigate to the past journal entry, isHistory
   is set to true (uneditable text box with the corresponding prompt) */

  const handleVisibleMonthsChange = (months) => {
    if (months.length > 0) {
      // const month = months[0].dateString; // Assuming months is an array with one element
      // const monthName = monthNames[month - 1]; // Subtract 1 because arrays are zero-indexed
      setCurrentMonth(new XDate(months[0].dateString))
      // Now you can use monthName as needed
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={{ padding: 20 }}>
      <Text style={styles.header}>Journal Entries</Text>
      {/* <CalendarHeader /> */}
        <Calendar
          initialDate={currentMonth.toString('yyyy-MM-dd')}
          onDayPress={handleDateSelect}
          markingType={'custom'}
          // customHeader={<CustomHeader month={LocaleConfig.months[month]} year={year} />} // Pass the custom header component here
          customHeaderTitle={<CustomHeader currentMonth={currentMonth}/>}
          onPressArrowLeft={goToPreviousMonth} 
          onPressArrowRight={goToNextMonth} 
          onVisibleMonthsChange={handleVisibleMonthsChange}
          markedDates={{
            [selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
            // timestamps.map(timestamp => ({ timestamp: { selected: true } } )),
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
              //selectedColor: '#BFDBD7' 
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
                    color: '#3B3133', //change this
                  },
                },
              };
              //selectedColor: '#BFDBD7' 
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
                      color: '#3B3133', //change this
                      marginTop: 2,
                    },
                  },
                };
              }
              //selectedColor: '#BFDBD7' 
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
          }}
        />
      </View>
      {clickedDate
        ? (
          <View style={{paddingHorizontal: 12}}>
            <View flexDirection='row' justifyContent='space-between'>
              <Text style={styles.header}>Past Entries</Text>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#374342', '#546967']} style={styles.addEntriesButton}>
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
          <View style={{paddingHorizontal: 12}}>
            <View flexDirection='row' justifyContent='space-between'>
              <Text style={styles.header}>Recent Entries</Text>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#374342', '#546967']} style={styles.addEntriesButton}>
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
    fontFamily: 'recoleta-alt-regular',
    fontSize: 32,
    paddingBottom: 10,
  },

  addEntriesButton: {
    borderRadius: 8,
    backgroundColor: '#546967', 
    justifyContent: 'center',
    alignItems: 'center',
    width: 120, 
    height: 37,
  },
  addEntriesButtonText: {
    color: 'white',
    fontSize: 12,
  },
  calendarHeader: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 8,
  }
});
