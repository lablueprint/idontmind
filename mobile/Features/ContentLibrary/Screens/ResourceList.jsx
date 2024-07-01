import {
  View, Text, TouchableOpacity, ScrollView, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useState } from 'react';
// import axios from 'axios';
import { useRoute } from '@react-navigation/native';
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
  const routeName = route.params?.routeName;
  const resources = [['resource 1', 'nicole'], ['yo mama', 'aaron'], ['haha', 'jeffrey'], ['no', 'alan'], ['well yes', 'daniel']];

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
  // const navigateToTag = () => {
  //   navigation.navigate('Tag', { index: 0, routeName: 'Content Library' }); // set index to 0 as default for now
  // };
  const navigateToPreviousRoute = () => {
    if (routeName === 'Content Library') navigation.navigate(routeName);
    else navigation.navigate('Tag', { index: 0, routeName: 'Content Library' });
  };
  const navigateToResource = (item) => {
    const name = item.Title ? item.Title : 'hardcoded title';
    navigation.navigate('Resource', { resourceName: name, routeName: 'Resource List', subtopicName });
  };

  const filters = ['All', 'Q&A', 'Personal Stories', 'Exercises', 'Articles'];
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
      </View>
      <View style={{ flex: 1 }} />
      <View style={{
        display: 'flex', flexDirection: 'column', flex: 40,
      }}
      >

        <View style={{ height: 600, width: '110%' }}>
          <ScrollView>
            {
                  resources.map((item) => (
                    <Pressable key={item[0]} onPress={() => navigateToResource(item)}>
                      <Bookmark
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
