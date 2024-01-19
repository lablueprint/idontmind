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

  const [postList, setPostList] = useState([]);
  const navigateToLanding = () => {
    navigation.navigate('Landing');
  };

  useEffect(() => {
    const foo = async () => {
      try {
        const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/posts/fetchPosts`);
        setPostList(res.data);
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
      } catch (err) {
        console.log(err);
      }
    };
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
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    pushPosts({
      username: postDraftUser,
      body: postDraftBody,
      timestamp,
    });
  };

  const onChangeDraftBody = (val) => {
    setPostDraftBody(val);
  };

  const onChangeDraftUser = (val) => {
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
