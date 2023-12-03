import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../slices/formSlice';
import countriesReducer from '../slices/countriesSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
