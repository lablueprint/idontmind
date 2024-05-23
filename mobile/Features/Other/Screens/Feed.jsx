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
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/folder/createFavoritedFolder`, { id, folderName: 'test 3' }, { headers: authHeader });
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
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/folder/addToFolder`, { id, folderName: 'test 3', tag: 't1' }, { headers: authHeader });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log('This is the add to folder data:');
        console.log(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteFromFolder = async () => {
    try {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/folder/deleteFromFolder`, { id, folderName: 'test 3', tag: 't1' }, { headers: authHeader });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log('This is the delete from folder data:');
        console.log(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteFolder = async () => {
    try {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/folder/deleteFavoritedFolder`, { id, folderName: 'test 2' }, { headers: authHeader });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log('This is the delete from folder data:');
        console.log(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getFavorites = async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getFavorites`, { headers: authHeader, params: { id } });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log('This is get favorites data:');
        console.log(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const favoriteTag = async () => {
    try {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/favoriteTag`, { id, tag: 'test tag' }, { headers: authHeader });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log('This is the favorite tag data:');
        console.log(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const favoriteResource = async () => {
    try {
      console.log(id);
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/favoriteResource`, { id, resource: 'test resource' }, { headers: authHeader });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log('This is the favorite resource data:');
        console.log(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const unfavoriteTag = async () => {
    try {
      console.log(id);
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/unfavoriteTag`, { id, resource: 'test tag' }, { headers: authHeader });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log('This is the favorite resource data:');
        console.log(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const unfavoriteResource = async () => {
    try {
      console.log(id);
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/unfavoriteResource`, { id, resource: 'test resource' }, { headers: authHeader });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log('This is the favorite resource data:');
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
        title="add to folder"
        onPress={add}
      />
      <Button
        title="delete from folder"
        onPress={deleteFromFolder}
      />
      <Button
        title="delete folder"
        onPress={deleteFolder}
      />
      <Button
        title="get favorites"
        onPress={getFavorites}
      />
      <Button
        title="favorite tag"
        onPress={favoriteTag}
      />
      <Button
        title="favorite resource"
        onPress={favoriteResource}
      />
      <Button
        title="unfavorite tag"
        onPress={unfavoriteTag}
      />
    </View>
  );
}

Feed.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
