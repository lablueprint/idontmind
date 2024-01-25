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
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.email = null;
      state.token = null;
    }
  },
});

export const {
  login,
  logout,
} = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
