import { configureStore } from '@reduxjs/toolkit';
import { formSlice } from './formReducer';

const rootReducer = {
  [formSlice.name]: formSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
