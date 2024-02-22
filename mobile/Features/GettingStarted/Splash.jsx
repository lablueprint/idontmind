import { useState, useEffect } from 'react';
import {
  Text, View, Pressable, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import IDMlogo from '../../assets/idontmindlogo.png';
import styles from './SplashStyle';

function Splash({ navigation }) {

    const navigateToSplash = () => {
        navigation.navigate('Terms');
      };
  
  return (
    <View style={styles.container}>
        <Image source={IDMlogo} style={styles.logo} />
        <Text style={styles.underLogo}>
            The short-term relationship that's good for your mental health.
        </Text>
        <Text style={styles.termsPrivacy}>
            <Text>By registering or signing in, you are agreeing to our</Text>
            <TouchableOpacity onPress={navigateToSplash}>
                <Text>Terms of Service</Text>
            </TouchableOpacity>
            <Text>and</Text>
            <TouchableOpacity onPress={navigateToSplash}>
                <Text>Privacy Policy</Text>
            </TouchableOpacity>
            <Text>.</Text>
        </Text>
        <Pressable style={styles.getStarted}>
            <Text>Get Started</Text>
        </Pressable>
        <Pressable style={styles.signIn}>
            <Text>Sign In</Text>
        </Pressable>
    </View>
  );
}

export default Splash;