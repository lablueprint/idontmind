import React, { useState } from 'react';
import {
  View, Text, TextInput, Modal, Button,
} from 'react-native';
import SearchBarStyle from './SearchBarStyle';

export default function SearchBar({ visible, onClose, onSearch, recentSearches }) {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
    onSearch(searchQuery);
    setSearchQuery('');
    onClose();
  };

  const handleRecentSearch = (query) => {
    onSearch(query);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={SearchBarStyle.container}>
        <TextInput
          style={SearchBarStyle.searchbar}
          placeholder="search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <Button
          title="Search"
          onPress={handleSearch}
        />

        <Text> Recent Searches </Text>
        {recentSearches.map((item) => (
          <Text onPress={() => handleRecentSearch(item)}>{item}</Text>
        ))}

        <Button title="Close" onPress={onClose} />
      </View>

    </Modal>

  );
}
