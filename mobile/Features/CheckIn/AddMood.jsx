// import { useState } from 'react';
// import { Dimensions } from 'react-native';
// import {
//   Text, View, TextInput, StyleSheet, Pressable, Image,
// } from 'react-native';
// import styles from './MoodStyle';

// function AddMood({ navigation }) {

//   const continueButton = () => {
//     console.log('continue');
//     navigation.navigate('Sleep');
//   };

//   const skipButton = () => {
//     console.log('skip');
//   };

//   const pressMood = () => {
//     console.log('mood');
//   };

//   const addMood = () => {
//     console.log('addedMood');
//   };
  
//   return (
//     <View style={styles.container}>
//       <View style={styles.heading}>
//         <Text>
//           how are you feeling today, really?
//         </Text>
//       </View>
//       <View style={styles.content}>
//         <View style={styles.moodRow}>
//             <Pressable onPress={pressMood}>
//                 <Image
//                     source={(require('../../assets/sleepFace.png'))}
//                 />
//             </Pressable>
//             <Pressable onPress={pressMood}>
//                 <Image
//                     source={(require('../../assets/sleepFace.png'))}
//                 />
//             </Pressable>
//             <Pressable onPress={pressMood}>
//                 <Image
//                     source={(require('../../assets/sleepFace.png'))}
//                 />
//             </Pressable>
//         </View>
//         <View style={styles.moodRow}>
//             <Pressable onPress={pressMood}>
//                 <Image
//                     source={(require('../../assets/sleepFace.png'))}
//                 />
//             </Pressable>
//             <Pressable onPress={pressMood}>
//                 <Image
//                     source={(require('../../assets/sleepFace.png'))}
//                 />
//             </Pressable>
//             <Pressable onPress={pressMood}>
//                 <Image
//                     source={(require('../../assets/sleepFace.png'))}
//                 />
//             </Pressable>
//         </View>
//         <View style={styles.moodRow}>
//             <Pressable onPress={pressMood}>
//                 <Image
//                     source={(require('../../assets/sleepFace.png'))}
//                 />
//             </Pressable>
//             <Pressable onPress={pressMood}>
//                 <Image
//                     source={(require('../../assets/sleepFace.png'))}
//                 />
//             </Pressable>
//             <Pressable onPress={pressMood}>
//                 <Image
//                     source={(require('../../assets/sleepFace.png'))}
//                 />
//             </Pressable>
//         </View>
//       </View>
//       <View>
//         <Pressable onPress={addMood}>
//             +
//         </Pressable>
//       </View>
//       <View style={styles.buttons}>
//         <Pressable onPress={continueButton}>
//           <Text>CONTINUE</Text>
//         </Pressable>
//         <Pressable onPress={skipButton}>
//           <Text>SKIP</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// export default Mood;
