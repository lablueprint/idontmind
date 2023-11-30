/* eslint-disable no-param-reassign */
const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  username: null,
};

const authSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
    },
  },
});

export const {
  login,
} = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
