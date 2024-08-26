import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';

// Configured the Redux store with the specified reducers
export const store = configureStore({
  reducer: {
    // The 'category' key represents the state managed by categoryReducer
    category: categoryReducer,
  },
});

export default store; // Exported the configured store for use in the application
