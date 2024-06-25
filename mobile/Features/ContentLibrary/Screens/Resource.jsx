import {
  View, Text, TouchableOpacity, ScrollView, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import BookmarkImage from '../../../assets/images/bookmark_blue.png';
import styles from './BookmarksStyle';
import BottomHalfModal from '../Components/BottomModal';
import NewFolderModal from '../Components/NewFolderModal';
import FolderCreatedModal from '../Components/FolderCreatedModal';
import Back from '../../../assets/images/back_button.png';

function Resource({ navigation }) {
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleNewFolder, setModalVisibleNewFolder] = useState(false);
  const [modalVisibleCreated, setModalVisibleCreated] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const filters = route.params?.tags;
  const [filterQuery, setFilterQuery] = useState('All');

  const resourceName = route.params?.resourceName;
  let authorName = route.params?.authorName;
  if (!authorName) authorName = 'Anonymous'; // placeholder
  const content = route.params?.content;
  console.log(content);

  const routeName = route.params?.routeName;
  const tagName = route.params?.tagName;
  const subtopicName = route.params?.subtopicName;
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
  const navigateToPreviousRoute = () => {
    if (routeName === 'Resource List') navigation.navigate(routeName, { subtopicName, tagName });
    else navigation.navigate(routeName);
  };
  return (
    <View
      className="mainContainer"
      style={{
        display: 'flex', flexDirection: 'column', paddingHorizontal: 25, paddingTop: 50, flex: 1,
      }}
    >
      <View
        className="title"
        style={{
          display: 'flex',
          flexDirection: 'row',

          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 20,
          paddingTop: 20,
        }}
      >
        <TouchableOpacity color="black" onPress={navigateToPreviousRoute} style={{ flex: 1, paddingRight: 10, alignSelf: 'flex-start' }}>
          <Image
            style={{
              resizeMode: 'contain', height: 20, width: 20, marginBottom: -10,
            }}
            source={Back}
          />
        </TouchableOpacity>
        <View style={{
          flex: 8, display: 'flex', flexDirection: 'column',
        }}
        >
          <Text style={{ fontSize: 24, fontFamily: 'recoleta-regular', textAlign: 'center' }}>{resourceName}</Text>
          <Text style={{ fontSize: 16, fontFamily: 'cabinet-grotesk-regular', textAlign: 'center' }}>
            By:
            {' '}
            {authorName}
          </Text>
        </View>
        <Pressable onPress={toggleModal}>
          <Image
            style={{
              flex: 1, resizeMode: 'contain', height: 30, width: 30,
            }}
            source={BookmarkImage}
          />
        </Pressable>

      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal>
          <Text style={{ padding: 10 }}>Tags:</Text>
          {filters.map((item) => (
            <View
              key={item}
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
            </View>
          ))}
        </ScrollView>
      </View>
      <ScrollView>
        {content.map((excerpt) => {
          if (excerpt.trim() !== '') {
            return (
              <Text key={excerpt} style={{ fontSize: 16, fontFamily: 'cabinet-grotesk-regular' }}>

                {excerpt}
                {'\n'}

              </Text>
            );
          }
          return null; // or any other fallback value if needed
        })}
        <View style={{
          display: 'flex', justifyContent: 'center', flex: 1, alignItems: 'center',
        }}
        >
          <Pressable style={styles.nextResource}>
            <Text style={{ color: 'white', textAlign: 'center' }}>next resource</Text>
          </Pressable>

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

      </ScrollView>

    </View>
  );
}

export default Resource;

Resource.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
