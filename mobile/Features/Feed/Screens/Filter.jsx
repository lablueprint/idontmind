import { View, Text, TouchableOpacity, Button } from 'react-native';
import { useState } from 'react';

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
  console.log(selectedTags);

  return (
    <View>
      {tags.map((tag) => (
        <>
          <Text>
            {' '}
            {tag}
          </Text>
          <TouchableOpacity key={tag} onPress={() => toggleTag(tag)}>
            <Text> x </Text>
          </TouchableOpacity>
        </>
      ))}

      <TouchableOpacity onPress={() => clearAll()}>
        <Text> clear all </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => applyAll()}>
        <Text> apply all filters </Text>
      </TouchableOpacity>
      <Button title="goBack" onPress={() => navigation.goBack()}> go Back </Button>
    </View>
  );
}
