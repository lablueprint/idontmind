import {
  ScrollView, View, Text, TouchableOpacity, Image, StyleSheet,
} from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import axios from 'axios';
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

  const uploadPhotoStyles = StyleSheet.create({
    container: {
      height: '10%',
      width: '90%',
      borderRadius: 10,
      backgroundColor: 'lightgrey',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 16,
      borderRadius: 50,
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/uploadImage`, {
        imageObject:
       result.assets[0],
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={OptionStyle.container}>
      <Text style={OptionStyle.title}> options </Text>
      <Text style={OptionStyle.personalData}> personal data </Text>
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
      {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View> */}
      {selectedImage !== '' ? (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200 }}
        />
      ) : ''}
      <TouchableOpacity style={uploadPhotoStyles.container} onPress={pickImage}>
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
