import { useState, useEffect } from 'react';
import {
  Button, Text, View, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BarChart, LineChart } from 'react-native-gifted-charts';

export default function Chart({ navigation }) {
  const [newNum, setNewNum] = useState();
  const [newAmt, setNewAmt] = useState(1);
  /* State Variable for Data Visualization */
  const [data, setData] = useState([
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
    }]);
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

  useEffect(() => {
    const foo = async () => {
      try {
        /* Gets all users */
        // const users = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/posts/getUsers`);

        // console.log(users);
      } catch (err) {
        console.log(err);
      }
    };
    foo();
  }, []);
  /* Adds users to database */
  const addUser = (e) => {
    e.preventDefault();
    const foo = async () => {
      try {
        await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/posts/createUsers`, { amount: newAmt });
      } catch (err) {
        console.log(err);
      }
    };
    foo();
    setNewAmt(1);
  };
  /* Adds the new number stored to line graph */
  const addNewNum = (e) => {
    e.preventDefault();
    const tempPostList = data;
    tempPostList.push({
      value: newNum,
      timestamp: new Date().toDateString(),
    });
    setData(tempPostList);
    setNewNum('');
  };
  /* Sets Value for new number you wish to add to line graph */
  const onChangeNewNum = (val) => {
    setNewNum(val);
  };
  /* Sets Value for amount of users you wish to create */
  const onChangeNewAmt = (val) => {
    setNewAmt(val);
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

      <View>
        <TextInput
          name="value"
          placeholder="value"
          value={newAmt}
          onChangeText={onChangeNewAmt}
        />
        <Button
          title="Add Users"
          onPress={addUser}
        />
      </View>

      <View>
        <TextInput
          name="value"
          placeholder="value"
          value={newNum}
          onChangeText={onChangeNewNum}
        />
        <Button
          title="AddNewNum"
          onPress={addNewNum}
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
