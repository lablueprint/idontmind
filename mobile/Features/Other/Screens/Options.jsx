import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, Image, Button,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useVideoPlayer, VideoView } from 'expo-video';
import OptionStyle from './OptionStyle';

export default function Options({ navigation }) {
  const options = ['personal info(name, etc)', 'account info (email, pass)', 'mental health info', 'push notifications', 'content recommendations', 'check-ins'];

  const navigateFunctions = (key) => {
    if (key === 4) {
      navigation.navigate('NotificationsTest');
    }
    if (key === 5) {
      navigation.navigate('BannedTags');
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const mediaType = result.assets[0].type;
      if (mediaType === 'video') {
        setSelectedVideo(result.assets[0].uri);
        await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/uploadVideo`, {
          imageObject: result.assets[0],
        });
      } else {
        setSelectedImage(result.assets[0].uri);
        await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/uploadImage`, {
          imageObject: result.assets[0],
        });
      }
    }
  };

  const videoSource = selectedVideo || '';
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const player = useVideoPlayer(videoSource, (p) => {
    const temp = p;
    temp.loop = true;
    temp.play();
  });

  useEffect(() => {
    const subscription = player.addListener('playingChange', (ip) => {
      setIsPlaying(ip);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  return (
    <ScrollView contentContainerStyle={OptionStyle.container}>
      <Text style={OptionStyle.title}>options</Text>
      <Text style={OptionStyle.personalData}>personal data</Text>
      {options.map((option, index) => (
        <View key={option}>
          {index === 3 && <Text style={OptionStyle.customize}> customize </Text>}
          <View style={OptionStyle.optionContainer}>
            <View style={OptionStyle.box} />
            <TouchableOpacity onPress={() => navigateFunctions(index + 1)}>
              <View style={OptionStyle.rowContainer}>
                <Text style={OptionStyle.text}>{option}</Text>
                <Text style={OptionStyle.arrow}>{'>'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View>
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={OptionStyle.image}
          />
        )}
        {selectedVideo && (
        <>
          <VideoView
            ref={ref}
            style={OptionStyle.video}
            player={player}
          />
          <Button
            title={isPlaying ? 'Pause' : 'Play'}
            onPress={() => {
              if (isPlaying) {
                player.pause();
              } else {
                player.play();
              }
              setIsPlaying(!isPlaying);
            }}
          />
        </>
        )}
      </View>
      <TouchableOpacity style={OptionStyle.imageContainer} onPress={pickImage}>
        <Text>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

Options.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
