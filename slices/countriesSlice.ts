import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Country {
  id: string; 
  name: string;
}

interface CountriesState {
  countries: Country[];
}

const initialState: CountriesState = {
  countries: [],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
