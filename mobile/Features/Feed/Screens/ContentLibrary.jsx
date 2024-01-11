import { useState, useEffect } from 'react';
import {
  Button, Text, View, TextInput, StyleSheet, TouchableOpacity, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
// import axios from 'axios';

/* Style Sheet */
const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'yellow',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'lightgreen',
    borderRadius: 20,
  },
});

/* Fake Data */
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-42c2-aed5-3ad53abb28ba',
    title: 'Forth Item',
  },
  {
    id: '3ac68afc-c605-46d3-a4f8-fbd91aa97f63',
    title: 'Fifth Item',
  },
  {
    id: '58694a0f-3da2-471f-bd96-145571e29d72',
    title: 'Sixth Item',
  },
];

export default function ContentLibrary({ navigation }) {
  const [selected, setSelected] = useState('false');
  const navigateToLanding = () => {
    navigation.navigate('Content Library');
  };

  const renderItem = (item) => {
    const backgroundColor = 'lightgreen';
    const color = 'black';
    return (
      <TouchableOpacity
        style={[style.button, {
          padding: 20, marginVertical: 8, marginHorizontal: 16,
        }]}
      >
        <Text
          style={{ backgroundColor, color, height: 100 }}
        >
          Resource Name
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[style.container, { paddingLeft: 20 }]}
    >
      <View style={[style.row, { paddingTop: 100, flexBasis: 150, backgroundColor: 'lightgreen' }]}>
        <Text style={{ fontSize: 28, flex: 2 }}>Content</Text>
        <View
          style={[style.container, { flex: 2, alignItems: 'center' }]}
        >
          <TouchableOpacity
            onPress={() => setSelected('True')}
            style={[style.button, { flexBasis: 30, justifyContent: 'center' }]}
          >
            <Text style={{ textAlign: 'center' }}>favorites</Text>

          </TouchableOpacity>
        </View>
        <Text style={{ flex: 1 }}>stuff</Text>
      </View>
      <View style={[style.row, { flexBasis: 35, backgroundColor: 'lightblue' }]}>
        <Text style={{ fontSize: 15, flex: 1 }}>recommended for you</Text>
      </View>
      <View style={[style.row, { flex: 1, backgroundColor: 'lightgrey' }]}>
        <FlatList
          horizontal
          data={DATA}
          renderItem={renderItem}
        />
      </View>
      <View
        style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}
      />
      <View style={[style.row, { flex: 2, backgroundColor: 'lightgrey', paddingTop: 25 }]}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

ContentLibrary.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
