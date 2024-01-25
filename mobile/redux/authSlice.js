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
    },
    logout: (state) => {
      state.email = null;
    }
  },
});

export const {
  login,
} = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
