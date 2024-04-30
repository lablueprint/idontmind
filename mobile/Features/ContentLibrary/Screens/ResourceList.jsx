import {
  View, Text, TouchableOpacity, ScrollView, Pressable, Image, FlatList, Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Bookmark from '../../Other/Components/Bookmark';
import styles from './BookmarksStyle';
import BookmarkImage from '../../../assets/bookmark_blue.png';
import BottomHalfModal from './BottomModal';
import NewFolderModal from '../Components/NewFolderModal';

function ResourceList({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleNewFolder, setModalVisibleNewFolder] = useState(false);
  const route = useRoute();
  const subtopicName = route.params?.subtopicName;
  const resources = [['resource 1', 'nicole'], ['yo mama', 'aaron'], ['haha', 'jeffrey'], ['no', 'alan'], ['well yes', 'daniel']];

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const toggleModalNewFolder = () => {
    setModalVisibleNewFolder(!modalVisibleNewFolder);
  };
  const navigateToTag = () => {
    navigation.navigate('Tag', { index: 0, routeName: 'Content Library' }); // set index to 0 as default for now
  };
  const navigateToResource = (item) => {
    const name = item.Title ? item.Title : 'hardcoded title';
    navigation.navigate('Resource', { resourceName: name, routeName: 'Resource List', subtopicName });
  };

  const filters = ['All', 'Tags', 'Resources'];
  const [filterQuery, setFilterQuery] = useState('All');

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
      <TouchableOpacity color="black" onPress={navigateToTag} style={{ paddingRight: 10, alignSelf: 'flex-start' }}>
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
        <Text style={{ fontSize: 34 }}>{subtopicName}</Text>
        <Pressable onPress={toggleModal}>
          <Image source={BookmarkImage} />
        </Pressable>

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
      </View>
      <View style={{ flex: 1 }} />
      <View style={{
        display: 'flex', flexDirection: 'column', flex: 30,
      }}
      >
        <Text style={{ fontSize: 22 }}>
          Resources
        </Text>

        <View style={{ height: 600, width: '110%' }}>
          <ScrollView>
            {
                  resources.map((item) =>
                    // let resourceName;
                    // if (item.Title) {
                    //   resourceName = item.Title;
                    // } else if (item['Journal Prompts']) {
                    //   resourceName = item['Journal Prompts'];
                    // } else {
                    //   resourceName = item.Question;
                    // }
                    (
                      <Pressable key={item[0]} onPress={() => navigateToResource(item)}>
                        <Bookmark
                          key={item[0]}
                          resourceName={item[0]}
                          author={item[1]}
                          style={{}}
                        />
                      </Pressable>
                    ))
                }
          </ScrollView>
        </View>
      </View>
      <BottomHalfModal modalVisibleParent={modalVisible} toggleModal={toggleModal} toggleModalNewFolder={toggleModalNewFolder} page="Tags" />
      <NewFolderModal
        modalVisibleParent={modalVisibleNewFolder}
        toggleModal={toggleModalNewFolder}
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
