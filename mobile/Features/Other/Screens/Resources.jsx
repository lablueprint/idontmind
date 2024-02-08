import {
  Text, View, StyleSheet, TouchableOpacity, Image, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';

/* Style Sheet */
const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
  horizontalCard: {
    padding: 10, marginVertical: 8, marginRight: 16, backgroundColor: 'lightgrey', borderRadius: 10, width: 122, flex: 1,
  },
  star: {
    width: 20, height: 20, opacity: 0.4,
  },
  horizontalCardInfo: {
    flexDirection: 'row', flex: 1, width: 70,
  },
  horizontalText: {
    color: 'black', alignSelf: 'flex-end', marginBottom: 20, flexWrap: 'wrap', flex: 1, fontSize: 16, marginLeft: 5,
  },
  verticalCard: {
    padding: 10, marginVertical: 8, marginRight: 16, backgroundColor: 'lightgrey', borderRadius: 10, flex: 1, flexDirection: 'column',
  },
  shape: {
    width: 95, height: 85, marginRight: 15,
  },
  verticalCardInfo: {
    flex: 1, flexDirection: 'row-reverse',
  },
  verticalText: {
    fontSize: 25,
  },
  whiteBox: {
    backgroundColor: 'white', width: 100, height: 25, borderRadius: 8, marginBottom: 5, marginLeft: 5,
  },
});

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

export default function Resources({ navigation, route }) {
  const navigateToLanding = () => {
    navigation.navigate('Landing');
  };

  const { tagName } = route.params;

  return (
    <View
      style={[style.container, { paddingHorizontal: 25 }]}
    >
      <View style={[style.row, { paddingTop: 65 }]}>
        <View style={{
          flex: 1, flexDirection: 'row', height: 38,
        }}
        >
          <TouchableOpacity
            onPress={() => navigateToLanding}
            style={[style.button, {
              flexBasis: 37,
            }]}
          >
            <Image
              style={{
                marginRight: 3, height: 38, width: 38,
              }}
              source={require('../../../assets/cancel.png')}
            />
          </TouchableOpacity>
          <View
            style={{ flex: 4 }}
          />
          <TouchableOpacity
            onPress={() => navigateToLanding}
            style={[style.button, {
              flexBasis: 37, justifyContent: 'center', backgroundColor: 'lightgray', width: 110, flexDirection: 'row', flex: 1,
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
              Add
            </Text>

          </TouchableOpacity>
        </View>
      </View>
      <View style={[style.row, {
        flexBasis: 35, flex: 2, flexDirection: 'column',
      }]}
      >
        <Image
          style={{
            alignSelf: 'center', flexDirection: 'row', width: 200, flex: 3, resizeMode: 'contain',
          }}
          source={require('../../../assets/shape.png')}
        />
        <View
          style={{ height: 15 }}
        />
        <View
          style={{
            flex: 2, flexDirection: 'column', borderBottomColor: 'lightgrey', borderBottomWidth: 1,
          }}
        >
          <Text
            style={{ fontSize: 32 }}
          >
            {tagName}
          </Text>
          <ScrollView
            style={{ flex: 1 }}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={{
                flex: 5, fontSize: 15, opacity: 0.75, marginTop: 5,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <View
              style={{ flex: 1 }}
            />
          </ScrollView>
        </View>

      </View>
      <View
        style={{ flex: 2 }}
      >
        <View
          style={{ flex: 1, flexDirection: 'row' }}
        >
          <View
            style={{
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <View>
              <Image
                style={{
                  width: 15, height: 15, marginTop: 7, marginRight: 3, opacity: 0.4,
                }}
                source={require('../../../assets/left.png')}
              />
            </View>
          </View>
          <View style={{
            flex: 3, alignItems: 'center', justifyContent: 'center',
          }}
          >
            <Text style={{ opacity: 0.5, fontSize: 22, paddingTop: 8 }}>
              explore.

            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <View style={{ alignSelf: 'flex-end' }}>
              <Image
                style={{
                  width: 15, height: 15, marginTop: 7, marginRight: 3, opacity: 0.4,
                }}
                source={require('../../../assets/right.png')}
              />
            </View>
          </View>
        </View>
        <View
          style={{ flex: 4 }}
        >
          <Swiper
            loop={false}
          >
            {DATA.map((item) => (
              <View style={{
                flex: 1, padding: 10,
              }}
              >
                <View style={{
                  flex: 3, backgroundColor: 'lightgrey', borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                }}
                >
                  <Text>
                    {item.tagName}

                  </Text>
                </View>
                <View style={{
                  flex: 1,
                }}
                />
              </View>
            ))}
          </Swiper>
        </View>
      </View>
    </View>

  );
}

Resources.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      tagName: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
