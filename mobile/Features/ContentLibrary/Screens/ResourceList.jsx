import {
  View, Text, TouchableOpacity, ScrollView, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Bookmark from '../../Other/Components/Bookmark';
import styles from './BookmarksStyle';
import BookmarkImage from '../../../assets/images/bookmark_blue.png';
import unfilledBookmark from '../../../assets/images/unfilledBookmark.png';
import BottomHalfModal from '../Components/BottomModal';
import NewFolderModal from '../Components/NewFolderModal';
import FolderCreatedModal from '../Components/FolderCreatedModal';
import Back from '../../../assets/images/back_button.png';

function ResourceList({ navigation }) {
  const {
    authHeader, id,
  } = useSelector((state) => state.auth);
  // route params stuff
  const route = useRoute();
  const subtopicName = route.params?.subtopicName; // subtopicName actually refers to the tag
  const tagName = route.params?.tagName; // tagName refers to "supertag" or category
  const prevRoute = route.params?.route;

  const folderName = route.params?.folderName;
  const folderDescription = route.params?.folderDescription;
  const folderResources = route.params?.resources;
  const folderTags = route.params?.tags;

  // filter stuff
  const filters = ['All', 'Q&A', 'Personal Stories', 'Exercises', 'Articles'];
  const [filterQuery, setFilterQuery] = useState('All');

  // modal stuff
  const [modalVisible, setModalVisible] = useState(false); // for the bottom modal
  const [modalVisibleNewFolder, setModalVisibleNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [modalVisibleCreated, setModalVisibleCreated] = useState(false);

  // resources and favoriting stuff
  const [resources, setResources] = useState([]); // list of resources under this tag
  const [favoritedResources, setFavoritedResources] = useState([]);
  const [subtopicFavorited, setSubtopicFavorited] = useState(false);

  // folder stuff
  const [folders, setFolders] = useState([]);
  const [isTag, setIsTag] = useState(true); /* tells the bottom modal what triggered the popup
(whether a tag or resource was pressed) */
  const [tagOrResourceName, setTagOrResourceName] = useState(subtopicName); /* the name of the
  tag or resource that triggered the modal popup */

  // modal functions
  const toggleModal = (tag, name) => {
    if (!modalVisible) {
      setIsTag(tag);
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

  // navigation to Tag.jsx and Resource.jsx
  const navigateToPreviousRoute = () => {
    if (prevRoute === 'Bookmarks') {
      navigation.navigate('Bookmarks'); // set index to 0 as default for now
    } else if (prevRoute === 'FolderContent') {
      navigation.navigate('FolderContent', {
        folderName, folderDescription, resources: folderResources, tags: folderTags,
      }); // set index to 0 as default for now
    } else if (prevRoute === 'Content Library') {
      navigation.navigate('Content Library'); // set index to 0 as default for now
    }
    else {
      navigation.navigate('Tag', { index: 0, routeName: 'Content Library', tagName }); // set index to 0 as default for now
    }
  };
  const navigateToResource = (resourceName, authorName, content, tags) => {
    navigation.navigate('Resource', {
      resourceName, authorName, content, tags, routeName: 'Resource List', subtopicName, tagName,
    });
  };

  // filter function, get all the resources under this tag and filter
  const handleFilterChange = async (item) => {
    setFilterQuery(item);
    // get all the tags under this filter
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/searchByTag`, { tag: subtopicName, filter: item });
    setResources(res.data);
  };

  // get all the resources under this tag
  const fetchResources = async () => {
    try {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/searchByTag`, { tag: subtopicName, filter: 'All' });
      setResources(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
        if (res.data.favoritedTags.includes(subtopicName)) setSubtopicFavorited(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpperBookmark = async () => {
    if (!subtopicFavorited) {
      // favorite the tag
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/favoriteTag`, { id, tag: subtopicName }, { headers: authHeader });
    } else {
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/unfavoriteTag`, { id, tag: subtopicName }, { headers: authHeader });
    }
    setSubtopicFavorited(!subtopicFavorited);
    if (!subtopicFavorited) {
      // await getFoldersForSubtopic(subtopicName);
      toggleModal(true, subtopicName);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [subtopicName]);
  useEffect(() => {
    getFolders();
  }, [modalVisibleCreated]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavorites();
    });
  
    // Cleanup the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      className="mainContainer"
      style={{
        display: 'flex', flexDirection: 'column', paddingHorizontal: 25, paddingTop: 50, flex: 1,
      }}
    >
      {modalVisible && (
        <View style={styles.overlay} />
      )}
      <TouchableOpacity
        onPress={navigateToPreviousRoute}
        style={{ paddingRight: 10, paddingTop: 20, marginBottom: -10 }}
      >
        <Image style={{ resizeMode: 'contain', height: 20, width: 20 }} source={Back} />
      </TouchableOpacity>
      <View
        className="title"
        style={{
          display: 'flex',
          flexDirection: 'row',

          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 20,
        }}
      >
        <Text style={{
          flex: 6, textAlign: 'center', fontSize: 40, fontFamily: 'recoleta-regular',
        }}
        >
          {subtopicName}
        </Text>
        <Pressable style={{ flex: 0.5 }} onPress={handleUpperBookmark}>
          <Image style={{ resizeMode: 'contain', height: 30, width: 30 }} source={subtopicFavorited ? BookmarkImage : unfilledBookmark} />
        </Pressable>

      </View>
      <View style={{
        display: 'flex', flexDirection: 'column', flex: 5, paddingTop: 10,
      }}
      >
        <View style={styles.filtersContainer}>
          <ScrollView horizontal>
            {filters.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  if (item !== filterQuery) {
                    handleFilterChange(item);
                  }
                }}
                style={[
                  styles.filterButton,
                  filterQuery === item && styles.filterQuery,
                ]}
              >
                <Text style={filterQuery === item
                  ? styles.whitePillText : styles.blackPillText}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <View style={{
        display: 'flex', flexDirection: 'column', flex: 40,
      }}
      >

        <View style={{ height: 600, width: '110%' }}>
          <ScrollView>
            {
                  resources.map((item) => {
                    // the title and author fields are different depending on the content type
                    // Q&A
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
      </View>
      <BottomHalfModal
        modalVisibleParent={modalVisible}
        toggleModal={toggleModal}
        toggleModalNewFolder={toggleModalNewFolder}
        isTag={isTag}
        folders={folders}
        tagOrResourceName={tagOrResourceName}
      />
      <NewFolderModal
        modalVisibleParent={modalVisibleNewFolder}
        toggleModal={toggleModalNewFolder}
        toggleModalCreated={toggleModalCreated}
        setFolderName={setFolderName}
        tagOrResourceName={tagOrResourceName}
        isTag={isTag}
      />
      <FolderCreatedModal
        modalVisibleParent={modalVisibleCreated}
        toggleModal={toggleModalCreated}
        newFolderName={newFolderName}
      />
    </View>
  );
}

export default ResourceList;

ResourceList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
