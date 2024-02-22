import { useState, useEffect } from 'react';
import {
  Text, View, TextInput, StyleSheet, Pressable, ScrollView,
} from 'react-native';
import IDMlogo from '../../assets/idontmindlogo.png';
import styles from './TermsStyle';

function Terms({ navigation }) {

    const navigateToSplash = () => {
        navigation.navigate('Splash');
      };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Pressable style={styles.back} onPress={navigateToSplash}>
                    <Text>Back</Text>
                </Pressable>
                <View>
                    <Text>Terms of Service</Text>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam eu turpis molestie, dictum est a, mattis tellus. 
                        Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin 
                        lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent 
                        per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus 
                        enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
                    </Text>
                </View>
                <View>
                    <Text>Account</Text>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam eu turpis molestie, dictum est a, mattis tellus. 
                        Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin 
                        lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent 
                        per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus 
                        enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
                    </Text>
                </View>
                <View>
                    <Text>Content</Text>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam eu turpis molestie, dictum est a, mattis tellus. 
                        Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin 
                        lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent 
                        per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus 
                        enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
                    </Text>
                </View>
                <View>
                    <Text>Terms of Service</Text>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam eu turpis molestie, dictum est a, mattis tellus. 
                        Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin 
                        lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent 
                        per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus 
                        enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
                    </Text>
                </View>
                <View>
                    <Text>Terms of Service</Text>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam eu turpis molestie, dictum est a, mattis tellus. 
                        Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin 
                        lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent 
                        per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus 
                        enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
                    </Text>
                </View>
                <View>
                    <Text>Terms of Service</Text>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam eu turpis molestie, dictum est a, mattis tellus. 
                        Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin 
                        lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent 
                        per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus 
                        enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
                    </Text>
                </View>
            </View>
        </ScrollView>
  );
}

export default Terms;