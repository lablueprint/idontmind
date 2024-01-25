import {
  View, Text, TouchableOpacity, Button,
} from 'react-native';
import { useState } from 'react';
import ContentRecsStyle from './ContentRecsStyle';

export default function ContentRecs({ navigation }) {
  const tags = ['abuse', 'addiction', 'anger',
    'anger management', 'anxiety',
    'bipolar disorder', 'body dysmorphia',
    'body image', 'breakups', 'burnout'];

  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selected) => selected !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearAll = () => {
    setSelectedTags([]);
  };

  const getCheckboxColor = (selected) => (selected ? '#404040' : '#D9D9D9');
  const isTagSelected = (tag) => (selectedTags.includes(tag));

  return (
    <View style={ContentRecsStyle.container}>
      <Text style={ContentRecsStyle.title}> content recommendations </Text>
      <Text>
        select any tags that you would prefer to not have content
        recommended to you for.
      </Text>
      {tags.map((tag) => (
        <View key={tag} style={ContentRecsStyle.rowContainer}>
          <View style={ContentRecsStyle.tagContainer}>
            <Text style={ContentRecsStyle.text}>
              {tag}
            </Text>
          </View>
          <TouchableOpacity onPress={() => toggleTag(tag)}>
            <View style={[ContentRecsStyle.checkbox,
              { backgroundColor: getCheckboxColor(isTagSelected(tag)) }]}
            />
          </TouchableOpacity>
        </View>
      ))}

      <View style={ContentRecsStyle.rowContainer}>
        <TouchableOpacity style={[ContentRecsStyle.buttons, { backgroundColor: '#D9D9D9' }]} onPress={() => clearAll()}>
          <Text style={ContentRecsStyle.text}> clear all </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[ContentRecsStyle.buttons, { backgroundColor: '#404040' }]}>
          <Text style={[ContentRecsStyle.text, { color: 'white' }]}> save </Text>
        </TouchableOpacity>
      </View>
      <Button title="goBack" onPress={() => navigation.goBack()}> go Back </Button>
    </View>
  );
}
