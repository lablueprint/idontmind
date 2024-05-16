import {
  View, Text, TouchableOpacity, ScrollView, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './BookmarksStyle';
import Back from '../../../assets/images/back_button.png';
import noBookmarks from '../../../assets/images/noBookmarks.png';

function BookmarksEdgeCase({ navigation }) {
  const navigateToContentLibrary = () => {
    navigation.navigate('Content Library');
  };

  const filters = ['All', 'Q&A', 'Personal Stories', 'Exercises', 'Articles'];
  const [filterQuery, setFilterQuery] = useState('All');

  return (
    <View
      style={{
        display: 'flex', flexDirection: 'column', paddingHorizontal: 25, paddingTop: 50, flex: 1, backgroundColor: '#BFDBD7',
      }}
    >
      <View style={{ display: 'flex', flex: 2 }}>
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
      <View style={{
        display: 'flex', flex: 5, justifyContent: 'center', alignItems: 'center',
      }}
      >
        <Text style={{ fontSize: 16, fontFamily: 'cabinet-grotesk-regular', paddingBottom: 100 }}>You currently have no bookmarked tags.</Text>
      </View>
      <View style={{
        flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: -70,
      }}
      >
        <Image style={{ resizeMode: 'contain', height: 300, width: 300 }} source={noBookmarks} />
      </View>

    </View>
  );
}

export default BookmarksEdgeCase;

BookmarksEdgeCase.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
