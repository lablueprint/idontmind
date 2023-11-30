import { useState, useEffect } from 'react';
import {
  Button, Text, View, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import Post from '../Components/Post';

export default function Feed({ navigation }) {
  const [postDraftBody, setPostDraftBody] = useState('');
  const [postDraftUser, setPostDraftUser] = useState('');
  const [newNum, setNewNum] = useState();
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

  // const GIVEN_POSTS = [
  //   {
  //     _id: 1,
  //     username: 'James',
  //     body: 'Mobile development is fun!',
  //   },
  //   {
  //     _id: 2,
  //     username: 'Sidd',
  //     body: 'I just finished watching another movie. It was interesting, but kind of boring :(',
  //   },
  //   {
  //     _id: 3,
  //     username: 'Jerry',
  //     body: 'I am excited to see everyone become friends!',
  //   },
  // ];

  const [postList, setPostList] = useState([]);
  const navigateToLanding = () => {
    navigation.navigate('Landing');
  };

  useEffect(() => {
    const foo = async () => {
      try {
        const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/posts/fetchPosts`);
        // const res2 = await axios.get('http://localhost:4000/posts/fetchPosts');
        // // const squirreltime = new Date(res.data[5].timestamp);

        // const testdate = `Last Sync: ${squirreltime.getDate()}/${
        //   squirreltime.getMonth() + 1}/${
        //   squirreltime.getFullYear()} @ ${
        //   squirreltime.getHours()}:${
        //   squirreltime.getMinutes()}:${
        //   squirreltime.getSeconds()}`;
        setPostList(res.data);
        // console.log(testdate);
      } catch (err) {
        console.log(err);
      }
    };
    foo();
  }, []);

  const pushPosts = async (rdata) => {
    const foo = async () => {
      try {
        await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/posts/createPost`, rdata);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    // const currentdate = new Date();
    // const datetime = `Last Sync: ${currentdate.getDate()}/${
    //   currentdate.getMonth() + 1}/${
    //   currentdate.getFullYear()} @ ${
    //   currentdate.getHours()}:${
    //   currentdate.getMinutes()}:${
    //   currentdate.getSeconds()}`;
    // console.log(currentdate);
    // console.log(datetime);
    foo();
  };

  const addPost = (e) => {
    e.preventDefault();
    const tempPostList = postList;
    tempPostList.push({
      _id: postList.length + 1,
      username: postDraftUser,
      body: postDraftBody,
    });
    setPostList(tempPostList);
    setPostDraftBody('');
    setPostDraftUser('');
    pushPosts({
      username: postDraftUser,
      body: postDraftBody,
    });
  };

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

  const onChangeDraftBody = (val) => {
    // console.log(val);
    setPostDraftBody(val);
  };

  const onChangeNewNum = (val) => {
    setNewNum(val);
  };

  const onChangeDraftUser = (val) => {
    // console.log(val);
    setPostDraftUser(val);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {postList.map(
        (p) => (
          <Post
            key={p._id}
            username={p.username}
            body={p.body}
            timestamp={p.timestamp}
            navigation={navigation}
          />
        ),
      )}
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
          value={newNum}
          onChangeText={onChangeNewNum}
        />
        <Button
          title="AddNewNum"
          onPress={addNewNum}
        />
      </View>
      <View>
        <TextInput
          name="startdate"
          placeholder=""
          value={newNum}
          onChangeText={onChangeNewNum}
        />
        <Button
          title="AddNewNum"
          onPress={addNewNum}
        />
      </View>
      <View>
        <TextInput
          name="username"
          placeholder="username"
          value={postDraftUser}
          onChangeText={onChangeDraftUser}
        />
        <TextInput
          name="body"
          placeholder="body"
          value={postDraftBody}
          onChangeText={onChangeDraftBody}
        />
        <Button
          title="AddPost"
          onPress={addPost}
        />
      </View>

      <Button
        title="To Landing"
        onPress={navigateToLanding}
      />
    </View>
  );
}

Feed.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
