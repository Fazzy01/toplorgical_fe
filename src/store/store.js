

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';  // Import the reducer

// Configure the store with Redux Toolkit
const store = configureStore({
  reducer: {
    counter: counterReducer,  // Add the counter reducer
  },
});

export default store;
