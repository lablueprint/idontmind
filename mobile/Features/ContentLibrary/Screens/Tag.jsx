import {
  Text, View, Image, ScrollView, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';
import shapeImage from '../../../assets/images/shape.png';
import Back from '../../../assets/images/back_button.png';
import style from '../Components/ContentStyle';
import TagRectangle from '../Components/TagRectangle';
import jsonData from '../../../content_library.json';
import blurbData from '../../../blurbs.json';

import BottomHalfModal from '../Components/BottomModal';
import NewFolderModal from '../Components/NewFolderModal';
import FolderCreatedModal from '../Components/FolderCreatedModal';

import TagContext from '../Context/TagContext';
import Relationships from '../../../assets/images/Relationships.png';
import Coping from '../../../assets/images/coping.png';
import Emotional from '../../../assets/images/emotional.png';
import identity from '../../../assets/images/identity.png';
import Lifestyle from '../../../assets/images/lifestyle.png';
import Mental from '../../../assets/images/mental.png';
import Support from '../../../assets/images/support.png';
import Trauma from '../../../assets/images/trauma.png';
import Improvement from '../../../assets/images/improvement.png';

const imageDict = {
  relationships: Relationships,
  coping: Coping,
  ewb: Emotional,
  identity,
  lifestyle: Lifestyle,
  mental: Mental,
  self: Improvement,
  support: Support,
  trauma: Trauma,
};


export default function Tag({ navigation, route }) {
  const { tagName } = route.params;
  const subtopics = jsonData[tagName];
  const blurb = blurbData[tagName];
  const {
    authHeader, id,
  } = useSelector((state) => state.auth);

  // modal stuff
  const [modalVisible, setModalVisible] = useState(false); // for the bottom modal
  const [modalVisibleNewFolder, setModalVisibleNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [modalVisibleCreated, setModalVisibleCreated] = useState(false);

  // folder stuff
  const [folders, setFolders] = useState([]);
  const [tagOrResourceName, setTagOrResourceName] = useState(''); /* the name of the
  tag or resource that triggered the modal popup */

  // favorited tags
  const [favoritedTags, setFavoritedTags] = useState([]);

  const navigateToPreviousRoute = () => {
    navigation.navigate('Content Library');
  };

  const navigateToResourceList = (subtopicName) => {
    navigation.navigate('Resource List', { subtopicName, tagName, route: 'Tag' });
  };

  // modal functions
  const toggleModal = (name) => {
    if (!modalVisible) {
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

  const getFavorites = async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getFavorites`, { headers: authHeader, params: { id } });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        setFavoritedTags(res.data.favoritedTags);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

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
    <ScrollView
      style={[style.container, { paddingHorizontal: 25 }]}
    >
      <View style={[style.row, { paddingTop: 100 }]}>
        <Pressable
          onPress={navigateToPreviousRoute}

        >
          <Image
            style={{
              resizeMode: 'contain', height: 20, width: 20,
            }}
            source={Back}
          />
        </Pressable>
      </View>
      <View style={{
        flex: 1, flexDirection: 'column',
      }}
      >
        <Image
          style={{
            alignSelf: 'center', width: 200, resizeMode: 'contain', height: 200,
          }}
          source={imageDict[tagName]}
        />
        <View
          style={{ }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 40, fontFamily: 'recoleta-regular' }}
          >
            {tagName}
          </Text>
          <Text
            style={{ fontSize: 16, fontFamily: 'cabinet-grotesk-medium', marginBottom: 20 }}
          >
            {blurb}
          </Text>
          <Text
            style={{ fontSize: 16, fontFamily: 'cabinet-grotesk-medium', paddingBottom: 10 }}
          >
            Click on a subtopic to see specific resources
          </Text>
        </View>

        <View style={{
          flex: 6, width: '110%',
        }}
        >
          <View style={{ flex: 1 }}>
            {
                subtopics.map((item) => (
                  <Pressable key={item} onPress={() => navigateToResourceList(item)}>
                    <TagRectangle
                        // key={resourceName}
                      tagName={item}
                      selected={favoritedTags.includes(item)}
                      toggleModal={toggleModal}
                    />
                  </Pressable>
                ))
              }
          </View>
        </View>

      </View>
      <BottomHalfModal
        modalVisibleParent={modalVisible}
        toggleModal={toggleModal}
        toggleModalNewFolder={toggleModalNewFolder}
        isTag
        folders={folders}
        tagOrResourceName={tagOrResourceName}
      />
      <NewFolderModal
        modalVisibleParent={modalVisibleNewFolder}
        toggleModal={toggleModalNewFolder}
        toggleModalCreated={toggleModalCreated}
        setFolderName={setFolderName}
        tagOrResourceName={tagOrResourceName}
        isTag
      />
      <FolderCreatedModal
        modalVisibleParent={modalVisibleCreated}
        toggleModal={toggleModalCreated}
        newFolderName={newFolderName}
      />

    </ScrollView>

  );
}

Tag.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      index: PropTypes.number,
      routeName: PropTypes.string,
      tagName: PropTypes.string,
      subtopics: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  }).isRequired,
};
