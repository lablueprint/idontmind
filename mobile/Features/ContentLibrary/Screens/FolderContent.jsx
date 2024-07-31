import {
  View, Text, TouchableOpacity, ScrollView, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Bookmark from '../../Other/Components/Bookmark';
import styles from './BookmarksStyle';
import TagRectangle from '../Components/TagRectangle';
import Back from '../../../assets/images/back_button.png';

function FolderContent({ navigation }) {
  const route = useRoute();

  // getting the folder's information to display
  const folderName = route.params?.folderName;
  const folderDescription = route.params?.folderDescription;
  const folderResources = route.params?.resources;
  const folderTags = route.params?.tags;

  // resource names, straight from favoritedResources
  const [fetchedResources, setFetchedResources] = useState([]);

  // navigation functions
  const navigateToBookmarks = () => {
    navigation.navigate('Bookmarks');
  };
  const navigateToResource = (resourceName, authorName, content, tags) => {
    navigation.navigate('Resource', {
      resourceName, authorName, content, tags, folderName, folderDescription, folderResources, folderTags, routeName: 'FolderContent',
    });
  };
  const navigateToResourceList = (subtopicName) => {
    navigation.navigate('Resource List', {
      subtopicName, folderName, folderDescription, resources: folderResources, tags: folderTags, route: 'FolderContent',
    });
  };

  // filter stuff
  const filters = ['All', 'Q&A', 'Personal Stories', 'Exercises', 'Articles'];
  const [filterQuery, setFilterQuery] = useState('All');

  // filter function, fetch all the folder's resources that are under this filter
  const handleFilterChange = async (item) => {
    setFilterQuery(item);
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/filterResourcesByFilter`, { resources: folderResources, filter: item });
    setFetchedResources(res.data);
  };

  useEffect(() => {
    handleFilterChange('All');
  }, [folderResources]);

  return (
    <View
      className="mainContainer"
      style={{
        display: 'flex', flexDirection: 'column', paddingHorizontal: 25, paddingTop: 50, flex: 1, backgroundColor: '#BFDBD7',
      }}
    >
      <TouchableOpacity color="black" onPress={navigateToBookmarks} style={{ paddingRight: 10, paddingTop: 10 }}>
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
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          <Text style={{ fontSize: 40, fontFamily: 'recoleta-medium' }}>{folderName}</Text>
          <Text style={{ fontSize: 20, fontFamily: 'cabinet-grotesk-regular' }}>
            Description:&#160;
            {folderDescription}
          </Text>
        </View>
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
                          selected
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
                  folderTags.map((item) => (
                    <Pressable key={item} onPress={() => navigateToResourceList(item)}>
                      <TagRectangle
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
    </View>
  );
}

export default FolderContent;

FolderContent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
