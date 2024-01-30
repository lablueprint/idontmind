import {
  View, Text, TouchableOpacity, Button,
} from 'react-native';
import { useState } from 'react';
import FilterAndBannedTagsStyle from './FilterAndBannedTagsStyle';

export default function FilterAndBannedTags({ navigation, screenOption }) {
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
    <View style={FilterAndBannedTagsStyle.container}>
      {tags.map((tag) => (
        <View key={tag} style={FilterAndBannedTagsStyle.rowContainer}>
          <View style={FilterAndBannedTagsStyle.tagContainer}>
            <Text style={FilterAndBannedTagsStyle.text}>
              {tag}
            </Text>
          </View>
          <TouchableOpacity onPress={() => toggleTag(tag)}>
            <View style={[FilterAndBannedTagsStyle.checkbox,
              { backgroundColor: getCheckboxColor(isTagSelected(tag)) }]}
            />
          </TouchableOpacity>
        </View>
      ))}

      <View style={FilterAndBannedTagsStyle.rowContainer}>
        <TouchableOpacity style={[FilterAndBannedTagsStyle.buttons, { backgroundColor: '#D9D9D9' }]} onPress={() => clearAll()}>
          <Text style={FilterAndBannedTagsStyle.text}> clear all </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[FilterAndBannedTagsStyle.buttons, { backgroundColor: '#404040' }]} onPress={() => (screenOption === 1 ? applyAll() : null)}>
          <Text style={[FilterAndBannedTagsStyle.text, { color: 'white' }]}>
            {(screenOption === 1 ? 'apply all' : 'save')}
          </Text>
        </TouchableOpacity>
      </View>
      <Button title="goBack" onPress={() => navigation.goBack()}> go Back </Button>
    </View>
  );
}
