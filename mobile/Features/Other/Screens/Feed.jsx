import { useState, useEffect } from 'react';
import {
  Button, Text, View, TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../Components/Post';
import { logout } from '../../../redux/authSlice';

export default function Feed({ navigation }) {
  const [postDraftBody, setPostDraftBody] = useState('');
  const [postDraftUser, setPostDraftUser] = useState('');

  // Grabs user firstName and authentication token for current user session
  const { email, firstName , authHeader } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const [postList, setPostList] = useState([]);
  const navigateToLanding = () => {
    navigation.navigate('Landing');
  };

  // Resets current session state
  const handleLogout = async () => {
    dispatch(logout());
    navigateToLanding();
  };

  // Handles receiving user data ensuring authorization from middleware
  const handleGetData = async () => {
    try {
      const userData = {
        email,
      };

      // Authorization header ensures signed in user
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/users/getData`, userData, { headers: authHeader });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log('This is the user data:');
        console.log(res.data[0]);
      }
    } catch (err) {
      console.error(err.message);
    }
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
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const tempPostList = postList;
    tempPostList.push({
      _id: postList.length + 1,
      username: postDraftUser,
      body: postDraftBody,
      timestamp,
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
    setPostDraftBody(val);
  };

  const onChangeDraftUser = (val) => {
    setPostDraftUser(val);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        Welcome
        {' '}
        {firstName}
      </Text>
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
        title="Logout"
        onPress={handleLogout}
      />
      <Button
        title="Get Correct User Data"
        onPress={handleGetData}
      />
    </View>
  );
}

Feed.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
