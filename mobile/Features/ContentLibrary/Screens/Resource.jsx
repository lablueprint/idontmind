import {
  View, Text, TouchableOpacity, ScrollView, Pressable, Image, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import BookmarkImage from '../../../assets/bookmark_blue.png';
import styles from './BookmarksStyle';
import BottomHalfModal from './BottomModal';
import NewFolderModal from '../Components/NewFolderModal';
import FolderCreatedModal from '../Components/FolderCreatedModal';
import Back from '../../../assets/images/back_button.png';

function Resource({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleNewFolder, setModalVisibleNewFolder] = useState(false);
  const [modalVisibleCreated, setModalVisibleCreated] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const filters = ['Creativity', 'SelfCare'];
  const [filterQuery, setFilterQuery] = useState('All');

  const route = useRoute();
  const resourceName = route.params?.resourceName;
  const routeName = route.params?.routeName;
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
    if (routeName === 'Resource List') navigation.navigate(routeName, { subtopicName });
    else navigation.navigate(routeName);
  };
  return (
    <View
      className="mainContainer"
      style={{
        display: 'flex', flexDirection: 'column', paddingHorizontal: 25, paddingTop: 50, flex: 1,
      }}
    >
      <TouchableOpacity color="black" onPress={navigateToPreviousRoute} style={{ paddingRight: 10, alignSelf: 'flex-start' }}>
        <Text style={{ fontSize: 34 }}>{'<'}</Text>
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
          flex: 2, display: 'flex', flexDirection: 'column',
        }}
        >
          <Text style={{ fontSize: 24, fontFamily: 'recoleta-regular', textAlign: 'center' }}>{resourceName}</Text>
          <Text style={{ fontSize: 16, fontFamily: 'cabinet-grotesk-regular', textAlign: 'center' }}>By: IDONTMIND Team</Text>
        </View>
        <Pressable onPress={toggleModal}>
          <Image style={{ resizeMode: 'contain', height: 30, width: 30 }} source={BookmarkImage} />
        </Pressable>

      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal>
          <Text style={{ padding: 10 }}>Tags:</Text>
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
      <ScrollView>
        <Text style={{ fontSize: 16, fontFamily: 'cabinet-grotesk-regular' }}>
          When was the last time you did something creative just for fun?
          Seriously, just for fun, with little thought or expectations about
          the end result. That’s a little tough, right? Most of the time,
          we have our eyes on the end result and ignore the actual process
          of creating. But the process is where the benefits are. The process
          is where the healing is. What may seem like just a nice self-care
          activity or a new hobby can actually be one of the best outlets
          for your mental health. When you don’t know how to convey your emotions
          out loud, turning into something artistic gives you the chance to express
          yourself. And each form of creativity has its own benefits. No matter what
          your skill level is, embrace your inner artist with some of these artistic
          outlets. And try not to worry about the final product. Lean into the process
          of creating. COLORING Coloring isn’t just for kids. Sure, there’s a reason
          why we grew up with it: it’s an easy way into the world of art. And the same
          is true now. Embrace the simplicity. Find comfort with coloring in the lines.
          Or express yourself and ignore them completely. Either way can be pretty therapeutic.
          Coloring reduces stress and anxiety, fights depression, helps you sleep, improves your
          focus, helps with mindfulness...well, you get the point. It’s scientifically proven to
          improve your mental health all around. Drawing & Painting All you need to do is watch
          a video of Bob Ross to know the soothing power of art. Sometimes you can’t put into words
          exactly what you’re thinking or feeling, and the only way to get it out of your head is to
          pick up a pencil or paintbrush and cover a canvas. This type of creativity has been
          scientifically proven to help people through trauma, as well as releasing all of those
          feel-good hormones.
          {' '}
        </Text>
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
