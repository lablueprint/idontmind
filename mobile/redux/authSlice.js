/* eslint-disable no-param-reassign */
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';

const { createSlice } = require('@reduxjs/toolkit');

const user = SecureStore.getItemAsync('user');
const token = SecureStore.getItemAsync('token');
console.log(user);
console.log(token);

const initialState = {
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.user._id;
      state.email = action.payload.user.email;
      state.firstName = action.payload.user.firstName;
      state.token = action.payload.token;
      state.authHeader = {
        Authorization: `Bearer ${action.payload.token}`,
      };
      SecureStore.setItemAsync('token', JSON.stringify(action.payload.token));
      SecureStore.setItemAsync('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.id = null;
      state.email = null;
      state.firstName = null;
      state.token = null;
      state.authHeader = null;
      SecureStore.deleteItemAsync('token');
      SecureStore.deleteItemAsync('user');
    },
  },
});

export const {
  login,
  logout,
} = authSlice.actions;

const { reducer } = authSlice;

export default reducer;

export const isTokenExpired = (token) => {
  const decodedToken = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};
