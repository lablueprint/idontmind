import React, { useState } from 'react';
import {
  View, Text, TextInput, Modal, Button, TouchableOpacity, ScrollView, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import SearchBarStyle from './SearchBarStyle';
import Bookmark from './Bookmark';
import timeline from '../../../assets/time_line.png';
import clear from '../../../assets/clear.png';

export default function SearchBar({
  visible, onClose, onSearch, recentSearches,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Tags');
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('All');
  const [enterPressed, setEnterPressed] = useState(false);
  const searchFilters = ['All', 'Articles', 'Q&A', 'Personal Stories', 'Exercises'];

  const handleSearch = async (search, filter, type = value) => {
    if (type === 'Keywords') {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/searchByKeyword`, { keyword: search, filter });
      setResults(res.data);
    } else if (type === 'Tags') {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/searchByTag`, { tag: search, filter });
      setResults(res.data);
    }
  };

  const handleRecentSearch = (query, type) => {
    setValue(type);
    setSearchQuery(query);
    handleSearch(query, filterQuery, type);
    setEnterPressed(true);
  };

  const [items, setItems] = useState([
    { label: 'Tags', value: 'Tags' },
    { label: 'Keywords', value: 'Keywords' },
  ]);

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={SearchBarStyle.container}>
        <View style={SearchBarStyle.topContainer}>
          <DropDownPicker
            placeholder="Tags"
            defaultValue="Tags"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{ marginLeft: '62%', width: '35%' }}
            dropDownContainerStyle={{ backgroundColor: 'white', marginLeft: '62%', width: '17%' }}
            onChangeValue={async () => {
              if (enterPressed) { await handleSearch(searchQuery, filterQuery); }
            }}
          />
          <TextInput
            style={{ width: '65%', marginRight: '0%', ...SearchBarStyle.searchbar }}
            placeholder="Search..."
            placeholderTextColor="#000"
            value={searchQuery}
            onChangeText={async (text) => {
              setSearchQuery(text);
              if (text === '') {
                setEnterPressed(false);
                return;
              }
              setEnterPressed(true);
              await handleSearch(text, filterQuery);
            }}
            onSubmitEditing={async () => {
              setEnterPressed(true);
              onSearch(searchQuery, value);
              await handleSearch(searchQuery, filterQuery);
            }}
            onFocus={() => setEnterPressed(false)}
          />
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
              setEnterPressed(false);
            }}
            style={{ width: '8%', marginLeft: '-10%', marginRight: '75%' }}
          >
            <Image source={clear} />
          </TouchableOpacity>
        </View>
        <Button
          title="Cancel"
          onPress={() => {
            onClose();
            setResults([]);
            setSearchQuery('');
            setFilterQuery('All');
            setEnterPressed(false);
          }}
        />

        {enterPressed && (
        <View>
          {results.length === 0
            ? <Text style={SearchBarStyle.resultText}>No results found.</Text>
            : (
              <Text style={SearchBarStyle.resultText}>
                Search Results for
                &quot;
                {searchQuery}
                &quot;
              </Text>
            )}
          <View style={SearchBarStyle.filtersContainer}>
            <ScrollView horizontal>
              {searchFilters.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    if (item !== filterQuery) {
                      setFilterQuery(item);
                      handleSearch(searchQuery, item);
                    }
                  }}
                  style={[
                    SearchBarStyle.filterButton,
                    filterQuery === item && SearchBarStyle.filterQuery,
                  ]}
                >
                  <Text style={filterQuery === item
                    ? SearchBarStyle.whiteText : SearchBarStyle.blackText}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        )}

        {!enterPressed
        && (
        <View>
          <Text style={SearchBarStyle.text}> Recent Searches </Text>
          <View>
            {recentSearches.map((item) => (
              <View key={item.query + item.type}>
                <TouchableOpacity
                  style={SearchBarStyle.recentSearch}
                  onPress={() => handleRecentSearch(item.query, item.type)}
                >
                  <View style={SearchBarStyle.rowContainer}>
                    <Image width={1} source={timeline} style={SearchBarStyle.image} />
                    <Text style={SearchBarStyle.recentText}>{item.query}</Text>
                  </View>
                  <View style={SearchBarStyle.recentType}>
                    <Text>{item.type}</Text>
                  </View>
                  <View style={SearchBarStyle.line} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        )}

        {enterPressed && (
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
                      key={resourceName}
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
        )}
      </View>
    </Modal>
  );
}

SearchBar.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  recentSearches: PropTypes.arrayOf(
    PropTypes.shape({
      query: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
