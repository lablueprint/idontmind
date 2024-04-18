import PropTypes from 'prop-types';
import Trends from '../Components/Trends';

export default function TrendsPage({ navigation }) {
  return (
    <Trends navigation={navigation} />
  );
}
TrendsPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
