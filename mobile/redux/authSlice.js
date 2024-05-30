/* eslint-disable no-param-reassign */
import jwt_decode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  id: null,
  token: null,
  email: null,
  firstName: null,
  authHeader: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log('login');
      state.id = action.payload.user._id;
      state.email = action.payload.user.email;
      state.firstName = action.payload.user.firstName;
      state.token = action.payload.token;
      state.authHeader = {
        Authorization: `Bearer ${action.payload.token}`,
      };
      SecureStore.setItemAsync('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      console.log('logout');
      state.id = null;
      state.email = null;
      state.firstName = null;
      state.token = null;
      state.authHeader = null;
      SecureStore.deleteItemAsync('user');
    },
    setFirstNameField: (state, action) => {
      console.log('set First Name');
      state.firstName = action.payload.firstName;
      // Update user object in Secure Store
      const obj = JSON.parse(SecureStore.getItem('user'));
      obj.user.firstName = action.payload.firstName;
      SecureStore.setItemAsync('user', JSON.stringify(obj));
    },
  },
});

export const {
  login,
  logout,
  setFirstNameField,
} = authSlice.actions;

const { reducer } = authSlice;

export default reducer;

export const isTokenExpired = (token) => {
  const decodedToken = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};
