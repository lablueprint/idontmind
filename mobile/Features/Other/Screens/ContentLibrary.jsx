import {
  Text, View, TouchableOpacity, FlatList, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import style from './ContentLibraryStyle';

/* Fake Data */
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'resource name',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'resource name',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'resource name',
  },
  {
    id: 'bd7acbea-c1b1-42c2-aed5-3ad53abb28ba',
    title: 'resource name',
  },
  {
    id: '3ac68afc-c605-46d3-a4f8-fbd91aa97f63',
    title: 'resource name',
  },
  {
    id: '58694a0f-3da2-471f-bd96-145571e29d72',
    title: 'resource name',
  },
];

const DATA2 = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'subtopic header',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'subtopic header',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'subtopic header',
  },
  {
    id: 'bd7acbea-c1b1-42c2-aed5-3ad53abb28ba',
    title: 'subtopic header',
  },
  {
    id: '3ac68afc-c605-46d3-a4f8-fbd91aa97f63',
    title: 'subtopic header',
  },
  {
    id: '58694a0f-3da2-471f-bd96-145571e29d72',
    title: 'subtopic header',
  },
];

export default function ContentLibrary({ navigation }) {
  const navigateToLanding = () => {
    navigation.navigate('Landing');
  };

  const horizontalRenderItem = ({ item }) => (
    <TouchableOpacity
      style={[style.horizontalCard]}
    >
      <TouchableOpacity>
        <Image
          style={[style.star,
            { alignSelf: 'flex-end' },
          ]}
          source={require('../../../assets/star.png')}
        />
      </TouchableOpacity>
      <View
        style={[style.horizontalCardInfo]}
      >
        <Text
          style={[style.horizontalText]}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const verticalRenderItem = ({ item }) => (
    <TouchableOpacity
      style={[style.verticalCard]}
    >
      <Text
        style={[style.verticalText]}
      >
        {item.title}
      </Text>
      <View style={[style.verticalCardInfo]}>
        <Image
          style={[style.shape]}
          source={require('../../../assets/shape.png')}
        />
      </View>
      <View
        style={[style.whiteBox]}
      />
    </TouchableOpacity>
  );

  return (
    <View
      style={[style.container, { paddingLeft: 25 }]}
    >
      <View style={[style.row, { paddingTop: 75, flexBasis: 125, backgroundColor: 'white' }]}>
        <Text style={{ fontSize: 30, flex: 3, paddingLeft: 5 }}>content</Text>
        <View
          style={[style.container, { flex: 3 }]}
        >
          <TouchableOpacity
            onPress={() => navigateToLanding}
            style={[style.button, {
              flexBasis: 37, justifyContent: 'center', backgroundColor: 'lightgray', width: 110, flexDirection: 'row',
            }]}
          >
            <Image
              style={{
                width: 20, height: 20, marginTop: 7, marginRight: 3, opacity: 0.4,
              }}
              source={require('../../../assets/star.png')}
            />
            <Text style={{
              textAlign: 'center', fontSize: 16, marginTop: 9, marginRight: 2,
            }}
            >
              favorites
            </Text>

          </TouchableOpacity>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', marginTop: 5 }}>
          <Image
            style={{ width: 20, height: 31, marginRight: 15 }}
            source={require('../../../assets/search.png')}
          />
          <Image
            style={{ width: 20, height: 31 }}
            source={require('../../../assets/filter.png')}
          />
        </View>
      </View>
      <View style={[style.row, { flexBasis: 35 }]}>
        <Text style={{ fontSize: 16, flex: 1, color: 'gray' }}>recommended for you</Text>
      </View>
      <View style={[style.row, { flex: 1 }]}>
        <FlatList
          horizontal
          data={DATA}
          renderItem={horizontalRenderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{ borderBottomColor: 'grey', borderBottomWidth: 0.75, opacity: 0.25 }}
      />
      <View style={[style.row, { flex: 2, paddingTop: 25 }]}>
        <FlatList
          data={DATA2}
          renderItem={verticalRenderItem}
          showsVerticalScrollIndicator={false}
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
