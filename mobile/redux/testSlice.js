/* eslint-disable no-param-reassign */
const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  count: 0,
};

const testSlice = createSlice({
  name: 'testSlice',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    update: (state, action) => {
      state.count = action.payload.count;
    },
  },
});

export const {
  increment,
  decrement,
  update,
} = testSlice.actions;

const { reducer } = testSlice;

export default reducer;
