import {
  View, Text, TouchableOpacity, ScrollView, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Bookmark from '../../Other/Components/Bookmark';
import styles from './BookmarksStyle';
import Folder from '../Components/Folder';
import TagRectangle from '../Components/TagRectangle';
import Back from '../../../assets/images/back_button.png';
import NewFolderModal from '../Components/NewFolderModal';
import FolderCreatedModal from '../Components/FolderCreatedModal';

function Bookmarks({ navigation }) {
  const {
    authHeader, id,
  } = useSelector((state) => state.auth);

  const [favoritedResources, setFavoritedResources] = useState([]);
  // resource names, straight from favoritedResources
  const [fetchedResources, setFetchedResources] = useState([]);
  const [favoritedTags, setFavoritedTags] = useState([]);

  const [folders, setFolders] = useState([]);

  const [modalVisibleNewFolder, setModalVisibleNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [modalVisibleCreated, setModalVisibleCreated] = useState(false);

  const toggleModalNewFolder = () => {
    setModalVisibleNewFolder(!modalVisibleNewFolder);
  };
  const toggleModalCreated = () => {
    setModalVisibleCreated(!modalVisibleCreated);
  };
  const setFolderName = (name) => {
    setNewFolderName(name);
  };

  const navigateToContentLibrary = () => {
    navigation.navigate('Content Library');
  };
  const navigateToResource = (resourceName, authorName, content, tags) => {
    navigation.navigate('Resource', {
      resourceName, authorName, content, tags, routeName: 'Bookmarks',
    });
  };
  const navigateToResourceList = (subtopicName) => {
    navigation.navigate('Resource List', { subtopicName, route: 'Bookmarks' });
  };

  const filters = ['All', 'Q&A', 'Personal Stories', 'Exercises', 'Articles'];
  const [filterQuery, setFilterQuery] = useState('All');

  // filter function, get all the favorited resources under this filter
  const handleFilterChange = async (item) => {
    setFilterQuery(item);
    // get all the tags under this filter
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/filterResourcesByFilter`, { resources: favoritedResources, filter: item });
    setFetchedResources(res.data);
  };

  const getFavorites = async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getFavorites`, { headers: authHeader, params: { id } });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        setFavoritedResources(res.data.favoritedResources);
        setFavoritedTags(res.data.favoritedTags);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getFolders = async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/folder/getFavoritedFolders`, { headers: authHeader, params: { id } });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        setFolders(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    handleFilterChange('All');
  }, [favoritedResources]);

  useEffect(() => {
    getFolders();
  }, [modalVisibleCreated]);

  return (
    <View
      className="mainContainer"
      style={{
        display: 'flex', flexDirection: 'column', paddingHorizontal: 25, paddingTop: 50, flex: 1, backgroundColor: '#BFDBD7',
      }}
    >
      <TouchableOpacity color="black" onPress={navigateToContentLibrary} style={{ paddingRight: 10, paddingTop: 10 }}>
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
        <Text style={{ fontSize: 40, fontFamily: 'recoleta-medium' }}>Bookmarks</Text>
      </View>
      <View>
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
      <ScrollView>
        <View style={{
          display: 'flex', flexDirection: 'row',
        }}
        >
          <Text style={{ flex: 1, fontSize: 32, fontFamily: 'recoleta-medium' }}>
            Folders
          </Text>
          <Text style={{
            flex: 1, textAlign: 'right', fontSize: 14, alignSelf: 'center', fontFamily: 'cabinet-grotesk-regular',
          }}
          >
            sort by Name
          </Text>
        </View>
        <View style={{ alignItems: 'center', justifyContents: 'center' }}>
          <View style={{
            flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingVertical: 10,
          }}
          >
            {Object.keys(folders).map((folderName) => (
              <Folder
                key={folderName}
                navigation={navigation}
                folderName={folderName}
                folderDescription={folders[folderName].description}
                tags={folders[folderName].tags}
                resources={folders[folderName].resources}
              />
            ))}
            <Pressable onPress={toggleModalNewFolder}>
              <Folder key="+" folderName="" toggleModalNewFolder={toggleModalNewFolder} />
            </Pressable>
          </View>
        </View>
        <View style={{ display: 'flex', flex: 1 }}>
          <View style={{
            display: 'flex', flexDirection: 'column', flex: 8,
          }}
          >
            <View style={{
              display: 'flex', flexDirection: 'row',
            }}
            >
              <Text style={{ flex: 1, fontSize: 32, fontFamily: 'recoleta-medium' }}>
                Resources
              </Text>
              <Text style={{
                flex: 1, textAlign: 'right', fontSize: 14, alignSelf: 'center', fontFamily: 'cabinet-grotesk-regular',
              }}
              >
                sort by Date
              </Text>
            </View>

            <View style={{ width: '110%' }}>

              {
                fetchedResources.map((item) => {
                  // the title and author fields are different depending on the content type
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
                      />

                    </Pressable>
                  );
                })
              }
            </View>
          </View>

          <View style={{
            display: 'flex', flexDirection: 'column', flex: 8,
          }}
          >
            <View style={{
              display: 'flex', flexDirection: 'row', paddingTop: 20,
            }}
            >
              <Text style={{ flex: 1, fontSize: 32, fontFamily: 'recoleta-medium' }}>
                Tags
              </Text>
              <Text style={{
                flex: 1, textAlign: 'right', fontSize: 14, alignSelf: 'center', fontFamily: 'cabinet-grotesk-regular',
              }}
              >
                sort by Date
              </Text>
            </View>
            <View style={{ width: '110%' }}>

              {
                favoritedTags.map((item) => (
                  <Pressable key={item} onPress={() => navigateToResourceList(item)}>
                    <TagRectangle
                        // key={resourceName}
                      tagName={item}
                      selected
                    />
                  </Pressable>
                ))
              }
            </View>

          </View>
        </View>
      </ScrollView>
      <NewFolderModal
        modalVisibleParent={modalVisibleNewFolder}
        toggleModal={toggleModalNewFolder}
        toggleModalCreated={toggleModalCreated}
        setFolderName={setFolderName}
      />
      <FolderCreatedModal
        modalVisibleParent={modalVisibleCreated}
        toggleModal={toggleModalCreated}
        newFolderName={newFolderName}
      />
    </View>
  );
}

export default Bookmarks;

Bookmarks.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
