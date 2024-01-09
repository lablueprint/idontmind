import { useState, useEffect } from 'react';
import {
  Button, Text, View, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../Components/Post';

export default function Feed({ navigation }) {
  const [postDraftBody, setPostDraftBody] = useState('');
  const [postDraftUser, setPostDraftUser] = useState('');

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
    navigation.navigate('Content Library');
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

  const pushPosts = async (data) => {
    const foo = async () => {
      try {
        await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/posts/createPost`, data);
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

  const onChangeDraftBody = (val) => {
    // console.log(val);
    setPostDraftBody(val);
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
