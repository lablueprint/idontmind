import {
  Button, Text, View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { logout } from '../../../redux/authSlice';

export default function Feed({ navigation }) {
  // Grabs user firstName and authentication token for current user session
  const {
    email, firstName, authHeader, id,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getData`, userData, { headers: authHeader });
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

  const handleNewFolder = async () => {
    try {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/folder/createFavoritedFolder`, { id, headers: authHeader, folderName: 'folder test' });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log('This is the create folder data:');
        console.log(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getFolders = async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/folder/getFavoritedFolders`, { headers: authHeader, params: { id } });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log('This is the get folder data:');
        console.log(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const add = async () => {
    try {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/folder/addToFolder`, {
        id, headers: authHeader, folderName: 'folder test', tag: 'added tag',
      });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log('This is the get folder data:');
        console.log(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'recoleta-black' }}>
        Welcome
        {' '}
        {firstName}
      </Text>
      <Text style={{ fontFamily: 'cabinet-grotesk-black' }}> Demo Form </Text>
      <Button
        title="Logout"
        onPress={handleLogout}
      />
      <Button
        title="Get Correct User Data"
        onPress={handleGetData}
      />
      <Button
        title="new favorited folder"
        onPress={handleNewFolder}
      />
      <Button
        title="get favorited folders"
        onPress={getFolders}
      />
      <Button
        title="add tag to folder"
        onPress={add}
      />
    </View>
  );
}

Feed.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
