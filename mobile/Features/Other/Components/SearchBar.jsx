import React, { useState } from 'react';
import {
  View, Text, TextInput, Modal, Button, TouchableOpacity, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import SearchBarStyle from './SearchBarStyle';
import Bookmark from './Bookmark';

export default function SearchBar({
  visible, onClose, onSearch, recentSearches,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('tag');
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    if (value === 'keyword') {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/searchByKeyword`, { keyword: searchQuery });
      setResults([...res.data[0], ...res.data[1], ...res.data[2]]);
    } else if (value === 'tag') {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/searchByTag`, { tag: searchQuery });
      setResults([...res.data[0], ...res.data[1], ...res.data[2]]);
    }
    onSearch(searchQuery);
    setSearchQuery('');
    // onClose();
  };

  const handleRecentSearch = (query) => {
    onSearch(query);
    onClose();
  };

  const [items, setItems] = useState([
    { label: 'Tags', value: 'tag' },
    { label: 'Keywords', value: 'keyword' },
  ]);

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={SearchBarStyle.container}>
        <View style={SearchBarStyle.topContainer}>
          <DropDownPicker
            placeholder="Tags"
            defaultValue="tag"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{ marginLeft: '62%', width: '35%' }} // Adjust width and margin as needed
            dropDownContainerStyle={{ backgroundColor: 'white', marginLeft: '62%', width: '17%' }}
          />
          <TextInput
            style={{ width: '65%', marginRight: '75%', ...SearchBarStyle.searchbar }} // Use flex: 1 to take remaining space
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

        <Button
          title="Close"
          onPress={() => {
            onClose();
            setResults([]);
          }}
        />
        <View style={{ height: 600 }}>
          <ScrollView>
            {
          results.map((item) => {
            let resourceName;
            if (item.Title) {
              resourceName = item.Title;
            } else if (item['Journal Prompts']) {
              resourceName = item['Journal Prompts'];
            } else {
              resourceName = item.Question;
            }
            return (
              <Bookmark
                key={item.id}
                resourceName={resourceName}
                author={item.Author}
              >
                {item.Author}
              </Bookmark>
            );
          })
        }

          </ScrollView>
        </View>
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
