/* eslint-disable no-param-reassign */
const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.user._id
      state.email = action.payload.user.email;
      state.firstName = action.payload.user.firstName;
      state.token = action.payload.token;
      state.authHeader = {
        Authorization: `Bearer ${action.payload.token}`
      };
    },
    logout: (state) => {
      state.id = null;
      state.email = null;
      state.firstName = null;
      state.token = null;
      state.authHeader = null;
    }
  },
});

export const {
  login,
  logout,
} = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
