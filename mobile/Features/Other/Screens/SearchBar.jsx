import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Modal, Button, TouchableOpacity, ScrollView, Image, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SearchBarStyle from './SearchBarStyle';
import Bookmark from '../Components/Bookmark';
import timeline from '../../../assets/images/time_line.png';
import clear from '../../../assets/images/clear.png';
import BottomHalfModal from '../../ContentLibrary/Components/BottomModal';
import NewFolderModal from '../../ContentLibrary/Components/NewFolderModal';
import FolderCreatedModal from '../../ContentLibrary/Components/FolderCreatedModal';

export default function SearchBar({
  navigation, visible, onClose, onSearch, recentSearches,
}) {
  const { id, authHeader } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Tags');
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('All');
  const [enterPressed, setEnterPressed] = useState(false);
  const searchFilters = ['All', 'Articles', 'Q&A', 'Personal Stories', 'Exercises'];

  // modal stuff
  const [modalVisible, setModalVisible] = useState(false); // for the bottom modal
  const [modalVisibleNewFolder, setModalVisibleNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [modalVisibleCreated, setModalVisibleCreated] = useState(false);

  // folder stuff
  const [folders, setFolders] = useState([]);
  const [tagOrResourceName, setTagOrResourceName] = useState(''); /* the name of the
  tag or resource that triggered the modal popup */

  // resources and favoriting stuff
  const [favoritedResources, setFavoritedResources] = useState([]);

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

  const navigateToResource = (resourceName, authorName, content, tags) => {
    onClose();
    setResults([]);
    setSearchQuery('');
    setFilterQuery('All');
    setEnterPressed(false);

    navigation.navigate('Resource', {
      resourceName, authorName, content, tags, routeName: 'Content Library',
    });
  };

  const [items, setItems] = useState([
    { label: 'Tags', value: 'Tags' },
    { label: 'Keywords', value: 'Keywords' },
  ]);

  // modal functions
  const toggleModal = (tag, name) => {
    if (!modalVisible) {
      setTagOrResourceName(name);
    }
    setModalVisible(!modalVisible);
  };
  const toggleModalNewFolder = () => {
    setModalVisibleNewFolder(!modalVisibleNewFolder);
  };
  const toggleModalCreated = () => {
    setModalVisibleCreated(!modalVisibleCreated);
  };
  const setFolderName = (name) => {
    setNewFolderName(name);
  };

  // retrieve all the favoritedFolders so we can display them in the bottom modal
  const getFolders = async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/folder/getFavoritedFolders`, { headers: authHeader, params: { id } });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        // console.log('This is the get folder data:');
        // console.log(res.data);
        // console.log(Object.keys(res.data));
        setFolders(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // get favorited resources and whether or not tag is favorited (choose bookmark icons accordingly)
  const getFavorites = async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getFavorites`, { headers: authHeader, params: { id } });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log('This is get favorites data:');
        console.log(res.data.favoritedTags);
        setFavoritedResources(res.data.favoritedResources);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFolders();
  }, [modalVisibleCreated]);
  useEffect(() => {
    getFavorites();
  }, []);

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
            dropDownContainerStyle={{ backgroundColor: 'white', marginLeft: '62%', width: '35%' }}
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
              }
              // setEnterPressed(true);
              // await handleSearch(text, filterQuery);
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
                  let authorName;
                  let content;
                  if (item.title) {
                    resourceName = item.title;
                    authorName = item.author;
                    // format: [[excerpt_title_1, excerpt_1], [excerpt_title_2, excerpt_2]...]
                    const excerptStrings = Object.values(item.excerpts)
                      .map((excerpt) => excerpt.trim());
                    const excerptTitles = Object.values(item.excerpt_titles)
                      .map((title) => title.trim());
                    const maxLength = Math.max(excerptStrings.length, excerptTitles.length);
                    const filledExcerpts = [...excerptStrings, ...Array(maxLength - excerptStrings.length).fill('')];
                    const filledTitles = [...excerptTitles, ...Array(maxLength - excerptTitles.length).fill('')];
                    content = filledExcerpts.map(
                      (excerpt, index) => [filledTitles[index], excerpt],
                    );

                    // content = excerptStrings;
                  } else if (item['Journal Prompts']) {
                    resourceName = item['Journal Prompts'];
                  } else {
                    resourceName = item.question;
                    authorName = item.who_answered;
                    content = [['', item.answer]];
                  }

                  return (
                    <Pressable
                      key={resourceName}
                      onPress={() => navigateToResource(
                        resourceName,
                        authorName,
                        content,
                        item.tags,
                      )}
                    >
                      <Bookmark
                        resourceName={resourceName}
                        author={authorName}
                        selected={favoritedResources.includes(resourceName)}
                        modalVisibleParent={modalVisible}
                        toggleModal={toggleModal}
                      />

                    </Pressable>
                  );
                })
              }
            </ScrollView>
          </View>
        )}
      </View>
      <BottomHalfModal
        modalVisibleParent={modalVisible}
        toggleModal={toggleModal}
        toggleModalNewFolder={toggleModalNewFolder}
        isTag={false}
        folders={folders}
        tagOrResourceName={tagOrResourceName}
      />
      <NewFolderModal
        modalVisibleParent={modalVisibleNewFolder}
        toggleModal={toggleModalNewFolder}
        toggleModalCreated={toggleModalCreated}
        setFolderName={setFolderName}
        tagOrResourceName={tagOrResourceName}
        isTag={false}
      />
      <FolderCreatedModal
        modalVisibleParent={modalVisibleCreated}
        toggleModal={toggleModalCreated}
        newFolderName={newFolderName}
      />
    </Modal>
  );
}

SearchBar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
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
