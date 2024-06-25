import {
  View, Text, TouchableOpacity, ScrollView, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Bookmark from '../../Other/Components/Bookmark';
import styles from './BookmarksStyle';
import BookmarkImage from '../../../assets/images/bookmark_blue.png';
import BottomHalfModal from '../Components/BottomModal';
import NewFolderModal from '../Components/NewFolderModal';
import FolderCreatedModal from '../Components/FolderCreatedModal';
import Back from '../../../assets/images/back_button.png';

function ResourceList({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleNewFolder, setModalVisibleNewFolder] = useState(false);
  const [modalVisibleCreated, setModalVisibleCreated] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const route = useRoute();
  const subtopicName = route.params?.subtopicName;
  const tagName = route.params?.tagName;

  const [resources, setResources] = useState([]);

  const toggleModal = () => {
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
  const navigateToTag = () => {
    navigation.navigate('Tag', { index: 0, routeName: 'Content Library', tagName }); // set index to 0 as default for now
  };
  const navigateToResource = (resourceName, authorName, content, tags) => {
    navigation.navigate('Resource', {
      resourceName, authorName, content, tags, routeName: 'Resource List', subtopicName, tagName,
    });
  };

  const filters = ['All', 'Q&A', 'Personal Stories', 'Exercises', 'Articles'];
  const [filterQuery, setFilterQuery] = useState('All');

  const handleFilterChange = async (item) => {
    setFilterQuery(item);
    // get all the tags under this filter
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/searchByTag`, { tag: subtopicName, filter: item });
    setResources(res.data);
    // console.log(resources);
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/searchByTag`, { tag: subtopicName, filter: 'All' });
        setResources(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchResources();
  }, [subtopicName]);

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
        onPress={navigateToTag}
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
        <Pressable style={{ flex: 0.5 }} onPress={toggleModal}>
          <Image style={{ resizeMode: 'contain', height: 30, width: 30 }} source={BookmarkImage} />
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
                        .map((excerpt) => excerpt.trim())
                        .filter(Boolean);
                      const excerptTitles = Object.values(item.excerpt_titles)
                        .map((title) => title.trim())
                        .filter(Boolean);
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
                        />

                      </Pressable>
                    );
                  })
                }
          </ScrollView>
        </View>
      </View>
      <BottomHalfModal modalVisibleParent={modalVisible} toggleModal={toggleModal} toggleModalNewFolder={toggleModalNewFolder} page="Tags" />
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

export default ResourceList;

ResourceList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
