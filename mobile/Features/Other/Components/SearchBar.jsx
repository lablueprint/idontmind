import React, { useState } from 'react';
import {
  View, Text, TextInput, Modal, Button, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';
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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    { label: 'Tag', value: 'tag' },
    { label: 'Keyword', value: 'keyword' },
  ]);

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={SearchBarStyle.container}>
        <View style={SearchBarStyle.topContainer}>
          <DropDownPicker
            placeholder="Select"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{ marginLeft: '52%', width: '45%' }} // Adjust width and margin as needed
            dropDownContainerStyle={{ backgroundColor: 'white', marginLeft: '52%', width: '35%' }} // Adjust width as needed
          />
          <TextInput
            style={{ width: '55%', marginRight: '65%', ...SearchBarStyle.searchbar }} // Use flex: 1 to take remaining space
            placeholder="Search..."
            placeholderTextColor="#000"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        <Button
          title="Search"
          onPress={handleSearch}
        />

        <Text style={SearchBarStyle.text}> Recent Searches </Text>
        <View style={SearchBarStyle.rowContainer}>
          {recentSearches.slice(0, 3).map((item) => (
            <View key={item}>
              <TouchableOpacity
                style={SearchBarStyle.recentSearch}
                onPress={() => handleRecentSearch(item)}
              >
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

SearchBar.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  recentSearches: PropTypes.arrayOf(PropTypes.string).isRequired,
};
