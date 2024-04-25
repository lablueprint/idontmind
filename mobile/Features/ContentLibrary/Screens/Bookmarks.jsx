import {
  View, Text, TouchableOpacity, ScrollView, Pressable, Image, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Bookmark from '../../Other/Components/Bookmark';
import TagContext from '../Context/TagContext';
import styles from './BookmarksStyle';
import Folder from './Folder';
import TagRectangle from '../Components/TagRectangle';

function Bookmarks({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const hardcodedTags = ['tag1', 'tag2', 'i hate tags'];

  const {
    Favorites, findTag, Tags,
  } = useContext(TagContext);

  const navigateToContentLibrary = () => {
    navigation.navigate('Content Library');
  };
  const navigateToResource = (item) => {
    const resourceName = item.Title ? item.Title : 'hardcoded title';
    navigation.navigate('Resource', { resourceName, routeName: 'Bookmarks' });
  };

  const folderNames = ['folder1', 'im not creative', 'no ideas', 'cant think', 'of another', ''];
  const filters = ['All', 'Tags', 'Resources'];
  const [filterQuery, setFilterQuery] = useState('All');

  useEffect(() => {
    const foo = async () => {
      try {
        /* Filling favorites list */
        const newFavorites = [];
        Favorites.forEach((id) => {
          const index = findTag(id);
          newFavorites.push(Tags[index]);
        });
        setFavorites(newFavorites);
      } catch (err) {
        console.error(err);
      }
    };
    foo();
  }, [Favorites]);

  return (
    <ScrollView
      className="mainContainer"
      style={{
        display: 'flex', flexDirection: 'column', paddingHorizontal: 25, paddingTop: 50, flex: 1,
      }}
    >
      <TouchableOpacity color="black" onPress={navigateToContentLibrary} style={{ paddingRight: 10, alignSelf: 'flex-start' }}>
        <Text style={{ fontSize: 34 }}>{'<'}</Text>
      </TouchableOpacity>
      <View
        className="title"
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderBottomColor: 'lightgray',
          borderBottomWidth: 3,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 20,
        }}
      >
        <Text style={{ fontSize: 34 }}>Bookmarks</Text>
      </View>
      <View style={{
        display: 'flex', flexDirection: 'column', flex: 8, paddingTop: 10,
      }}
      >
        <View style={styles.filtersContainer}>
          <ScrollView horizontal>
            {filters.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  if (item !== filterQuery) {
                    setFilterQuery(item);
                    console.log(filterQuery);
                  }
                }}
                style={[
                  styles.filterButton,
                  filterQuery === item && styles.filterQuery,
                ]}
              >
                <Text style={filterQuery === item
                  ? styles.whiteText : styles.blackText}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <Text style={{ fontSize: 22 }}>Folders </Text>
        <View style={{ alignItems: 'center', justifyContents: 'center' }}>
          <FlatList
            data={folderNames}
            renderItem={({ item }) => <Folder folderName={item} />}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={{ margin: -10 }}
          />
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <View style={{
        display: 'flex', flexDirection: 'column', flex: 8,
      }}
      >
        <Text style={{ fontSize: 22 }}>
          Resources
        </Text>

        <View style={{ width: '110%' }}>

          {
                favorites.map((item) => {
                  let resourceName;
                  if (item.Title) {
                    resourceName = item.Title;
                  } else if (item['Journal Prompts']) {
                    resourceName = item['Journal Prompts'];
                  } else {
                    resourceName = item.Question;
                  }
                  return (
                    <Pressable key={resourceName} onPress={() => navigateToResource(item)}>
                      <Bookmark
                        // key={resourceName}
                        resourceName={resourceName}
                        author={item.Author}
                        style={{}}
                      >
                        {item.Author}
                      </Bookmark>
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
        <Text style={{ fontSize: 22 }}>
          Tags
        </Text>

        <View style={{ width: '110%' }}>

          {
                hardcodedTags.map((item) => (
                  <Pressable key={item} onPress={() => navigateToResource(item)}>
                    <TagRectangle
                        // key={resourceName}
                      tagName={item}
                    />
                  </Pressable>
                ))
              }
        </View>
      </View>
    </ScrollView>
  );
}

export default Bookmarks;

Bookmarks.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
