/* eslint-disable no-param-reassign */
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { createSlice } = require('@reduxjs/toolkit');

console.log('authSlice');

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
    },
    logout: (state) => {
      console.log('logout');
      state.id = null;
      state.email = null;
      state.firstName = null;
      state.token = null;
      state.authHeader = null;
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
