import {
  View, Text, TouchableOpacity, Button,
} from 'react-native';
import { useState } from 'react';
import FilterStyle from './FilterStyle';

export default function Filter({ navigation }) {
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

  const applyAll = () => {
    setSelectedTags([...tags]);
  };

  const getCheckboxColor = (selected) => (selected ? '#404040' : '#D9D9D9');
  const isTagSelected = (tag) => (selectedTags.includes(tag));

  return (
    <View style={FilterStyle.container}>
      <Text style={FilterStyle.title}> advanced filter </Text>
      {tags.map((tag) => (
        <View key={tag} style={FilterStyle.rowContainer}>
          <View style={FilterStyle.tagContainer}>
            <Text style={FilterStyle.text}>
              {tag}
            </Text>
          </View>
          <TouchableOpacity onPress={() => toggleTag(tag)}>
            <View style={[FilterStyle.checkbox,
              { backgroundColor: getCheckboxColor(isTagSelected(tag))}]}
            />
          </TouchableOpacity>
        </View>
      ))}

      <View style={FilterStyle.rowContainer}>
        <TouchableOpacity style={[FilterStyle.buttons, { backgroundColor: '#D9D9D9' }]} onPress={() => clearAll()}>
          <Text style={FilterStyle.text}> clear all </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[FilterStyle.buttons, { backgroundColor: '#404040' }]} onPress={() => applyAll()}>
          <Text style={[FilterStyle.text, { color:'white'}]}> apply all filters </Text>
        </TouchableOpacity>
      </View>
      <Button title="goBack" onPress={() => navigation.goBack()}> go Back </Button>
    </View>
  );
}
