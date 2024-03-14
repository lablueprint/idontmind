// import {
//     View, TouchableOpacity, Pressable, Image,
//   } from 'react-native';
//   import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//   import JournalPage from './JournalPage';
//   import { useRoute } from '@react-navigation/native';

// export default function JournalTabs({ navigation}) {
//     const route = useRoute();
//     const body = route.params?.body;
//     const isHistory = route.params?.isHistory;

//     function GuidedPrompt({ navigation }) {
//         return (
//           <JournalPage navigation={navigation} freeWrite={false} isHistory={isHistory} body={body} isDetails={false}/>
//         );
//       }
//       function FreeWrite({ navigation }) {
//         return <JournalPage navigation={navigation} freeWrite isHistory={isHistory} body={body} isDetails={false}/>;
//       }


//     const navigateToCalendar = () => {
//       navigation.navigate('Calendar');
//     };
  
//     const Tab = createMaterialTopTabNavigator();
//     return (
//       <View style={{ flex: 1 }}>
//         <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 40 }}>
//           <TouchableOpacity style={{ margin: 10 }} onPress={navigateToCalendar}>
//             <Image
//               style={{ width: 30, height: 31 }}
//               source={require('../../../assets/calendar.png')}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={{ margin: 10 }}>
//             <Image
//               style={{ width: 20, height: 31 }}
//               source={require('../../../assets/search.png')}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={{ marginRight: 40, margin: 10 }}>
//             <Image
//               style={{ width: 20, height: 31 }}
//               source={require('../../../assets/filter.png')}
//             />
//           </TouchableOpacity>
//         </View>
  
//         <Tab.Navigator style={{ marginTop: 10 }}>
//           <Tab.Screen name="Guided Prompt" component={GuidedPrompt} />
//           <Tab.Screen name="Free Write" component={FreeWrite} />
//         </Tab.Navigator>
//       </View>
//     );
//   }
  