import {
  Button, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { BarChart, LineChart } from 'react-native-gifted-charts';

export default function Chart({ navigation }) {
  /* State Variable for Data Visualization */
  const data = [
    {
      value: 10,
      timestamp: '2023-10-24T00:41:59.057Z',
    },
    {
      value: 11,
      timestamp: '2023-10-23T00:41:59.057Z',
    },
    {
      value: 12,
      timestamp: '2023-10-23T00:41:59.057Z',
    },
    {
      value: 13,
      timestamp: '2023-10-23T00:41:59.057Z',
    },
    {
      value: 14,
      timestamp: '2023-10-23T00:41:59.057Z',
    }];
  /* Bar Data for Data Visualization */
  const barData = [
    {
      value: 230,
      label: 'Jan',
      frontColor: '#4ABFF4',
      sideColor: '#23A7F3',
      topColor: '#92e6f6',
    },
    {
      value: 180,
      label: 'Feb',
      frontColor: '#79C3DB',
      sideColor: '#68BCD7',
      topColor: '#9FD4E5',
    },
    {
      value: 195,
      label: 'Mar',
      frontColor: '#28B2B3',
      sideColor: '#0FAAAB',
      topColor: '#66C9C9',
    },
    {
      value: 250,
      label: 'Apr',
      frontColor: '#4ADDBA',
      sideColor: '#36D9B2',
      topColor: '#7DE7CE',
    },
    {
      value: 320,
      label: 'May',
      frontColor: '#91E3E3',
      sideColor: '#85E0E0',
      topColor: '#B0EAEB',
    }];

  const navigateToLanding = () => {
    navigation.navigate('Landing');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> Demo Form </Text>
      <View>
        <BarChart
          showFractionalValue
          showYAxisIndices
          hideRules
          noOfSections={4}
          maxValue={400}
          data={barData}
          barWidth={40}
          sideWidth={15}
          isThreeD
          side="right"
        />
      </View>
      <View>
        <LineChart
          data={data}
          width={300}
          height={300}
        />
      </View>

      <Button
        title="To Landing"
        onPress={navigateToLanding}
      />
    </View>
  );
}

Chart.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
