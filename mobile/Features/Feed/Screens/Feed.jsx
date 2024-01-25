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
  const { email } = useSelector((state) => state.auth); // grabs the email from the backend
  const dispatch = useDispatch()

  const [postList, setPostList] = useState([]);
  const navigateToLanding = () => {
    navigation.navigate('Landing');
  };

  const handleLogout = async () => {
    dispatch(logout());
    navigateToLanding();
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
    
    foo();
  };

  const addPost = (e) => {
    e.preventDefault();
    const timestamp = new Date();
    const tempPostList = postList;
    tempPostList.push({
      _id: postList.length + 1,
      username: postDraftUser,
      body: postDraftBody,
      timestamp
    });
    setPostList(tempPostList);
    setPostDraftBody('');
    setPostDraftUser('');
    pushPosts({
      username: postDraftUser,
      body: postDraftBody,
      timestamp
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
      <Text>
        Welcome
        {' '}
        {email}
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
    </View>
  );
}

Feed.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
