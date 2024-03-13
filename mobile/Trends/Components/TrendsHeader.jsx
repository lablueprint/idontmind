import PropTypes from 'prop-types';
import {
  View, Text,
} from 'react-native';

export default function TrendsHeader({ props }) {
  console.log(props);
  return (
    <View style={{ marginTop: 40 }}>
      <Text>Header!</Text>
    </View>
  );
}

TrendsHeader.propTypes = {
  props: PropTypes.shape({

  }).isRequired,
};
