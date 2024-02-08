import React, { useState } from 'react';
import {
  View, Text, TextInput, Modal, Button, TouchableOpacity,
} from 'react-native';
import SearchBarStyle from './SearchBarStyle';

export default function SearchBar({
  visible, onClose, onSearch, recentSearches,
}) {
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
        <View>
          <TextInput
            style={SearchBarStyle.searchbar}
            placeholder="Search..."
            placeholderTextColor="#000"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <Button
            title="Search"
            onPress={handleSearch}
          />
        </View>

        <Text style={SearchBarStyle.text}> Recent Searches </Text>
        <View style={SearchBarStyle.rowContainer}>
          {recentSearches.slice(0,3).map((item, index) => (
            <View key={index+1}>
              <TouchableOpacity style={SearchBarStyle.recentSearch} onPress={() => handleRecentSearch(item)} >
                <Text style={SearchBarStyle.text}>{item}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Button title="Close" onPress={onClose} />
      </View>

    </Modal>

  );
}
