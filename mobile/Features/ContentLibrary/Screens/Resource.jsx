import {
  View, Text, TouchableOpacity, ScrollView, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BookmarkImage from '../../../assets/images/bookmark_blue.png';
import unfilledBookmark from '../../../assets/images/unfilledBookmark.png';
import styles from './BookmarksStyle';
import BottomHalfModal from '../Components/BottomModal';
import NewFolderModal from '../Components/NewFolderModal';
import FolderCreatedModal from '../Components/FolderCreatedModal';
import Back from '../../../assets/images/back_button.png';

function Resource({ navigation }) {
  const {
    authHeader, id,
  } = useSelector((state) => state.auth);

  // route params
  const route = useRoute();
  const resourceName = route.params?.resourceName;
  let authorName = route.params?.authorName;
  if (!authorName) authorName = 'Anonymous'; // placeholder
  const content = route.params?.content;

  const routeName = route.params?.routeName;
  const tagName = route.params?.tagName;
  const subtopicName = route.params?.subtopicName;

  // modal stuff
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleNewFolder, setModalVisibleNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [modalVisibleCreated, setModalVisibleCreated] = useState(false);

  // folder stuff
  const [folders, setFolders] = useState([]);

  // whether or not the resource is favorited, determines if top right bookmark is selected
  const [resourceFavorited, setResourceFavorited] = useState(false);

  // filter stuff
  const filters = route.params?.tags;
  const [filterQuery] = useState('All');

  // modal functions
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

  // navigation to previous route
  const navigateToPreviousRoute = () => {
    if (routeName === 'Resource List') navigation.navigate(routeName, { subtopicName, tagName });
    else navigation.navigate(routeName);
  };

  // retrieve all the favoritedFolders so we can display them in the bottom modal
  const getFolders = async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/folder/getFavoritedFolders`, { headers: authHeader, params: { id } });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log('This is the get folder data:');
        console.log(res.data);
        console.log(Object.keys(res.data));
        setFolders(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // get favorited data to find out whether or not this resource is favorited
  const getFavorited = async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getFavorites`, { headers: authHeader, params: { id } });
      if (res.data.error) {
        console.error(res.data.error);
      } else if (res.data.favoritedResources.includes(resourceName)) setResourceFavorited(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpperBookmark = async () => {
    if (!resourceFavorited) {
      // favorite the resource
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/favoriteResource`, { id, resource: resourceName }, { headers: authHeader });
    } else {
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/unfavoriteResource`, { id, resource: resourceName }, { headers: authHeader });
    }
    setResourceFavorited(!resourceFavorited);
    if (!resourceFavorited) {
      toggleModal();
    }
  };

  useEffect(() => {
    getFolders();
  }, [modalVisibleCreated]);
  useEffect(() => {
    getFavorited();
  }, []);

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
        <Pressable onPress={handleUpperBookmark}>
          <Image
            style={{
              flex: 1, resizeMode: 'contain', height: 30, width: 30,
            }}
            source={resourceFavorited ? BookmarkImage : unfilledBookmark}
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
        {content.map((item) => {
          if (item[0].trim() !== '' && item[1].trim !== '') {
            return (
              <View>
                <Text key={item[0]} style={{ fontSize: 24, fontFamily: 'recoleta' }}>
                  {item[0]}
                </Text>
                <Text key={item[1]} style={{ fontSize: 16, fontFamily: 'cabinet-grotesk-regular' }}>
                  {item[1]}
                  {'\n'}
                </Text>
              </View>
            );
          }
          if (item[0].trim() !== '') {
            return (
              <Text key={item[0]} style={{ fontSize: 24, fontFamily: 'recoleta' }}>
                {item[0]}
              </Text>
            );
          }
          if (item[1].trim() !== '') {
            return (
              <Text key={item[1]} style={{ fontSize: 16, fontFamily: 'cabinet-grotesk-regular' }}>
                {item[1]}
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
        <BottomHalfModal
          modalVisibleParent={modalVisible}
          toggleModal={toggleModal}
          toggleModalNewFolder={toggleModalNewFolder}
          isTag={false}
          folders={folders}
          tagOrResourceName={resourceName}
        />
        <NewFolderModal
          modalVisibleParent={modalVisibleNewFolder}
          toggleModal={toggleModalNewFolder}
          toggleModalCreated={toggleModalCreated}
          setFolderName={setFolderName}
          tagOrResourceName={resourceName}
          isTag={false}
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
