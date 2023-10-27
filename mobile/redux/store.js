import { configureStore } from '@reduxjs/toolkit';
import reducer from './testSlice';

const store = configureStore({
  reducer: {
    testSlice: reducer,
  },
});

export default store;
