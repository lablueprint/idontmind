import {
  View, Text, TouchableOpacity, ScrollView, Pressable, Image, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
import Bookmark from '../../Other/Components/Bookmark';
import TagContext from '../Context/TagContext';
import styles from './BookmarksStyle';
import Folder from '../Components/Folder';
import TagRectangle from '../Components/TagRectangle';
import Back from '../../../assets/images/back_button.png';

function Bookmarks({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const hardcodedResources = [['My Resource', 'Nicole Jew'], ['My Resource 2', 'Alice Ju'], ['My Resource 3']];
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
  const filters = ['All', 'Q&A', 'Personal Stories', 'Exercises', 'Articles'];
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
                  ? styles.whitePillText : styles.blackPillText}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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
          <FlatList
            data={folderNames}
            renderItem={({ item }) => <Folder folderName={item} />}
            keyExtractor={(item) => item.toString()}
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
        <View style={{
          display: 'flex', flexDirection: 'row', paddingTop: 20,
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
                hardcodedResources.map((item) => {
                  let resourceName;
                  return (
                    <Pressable key={resourceName} onPress={() => navigateToResource(item)}>
                      <Bookmark
                        // key={resourceName}
                        resourceName={item[0]}
                        author={item[1]}
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
