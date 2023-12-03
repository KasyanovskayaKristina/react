import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  formDataArray: FormData[];
  errors: { [key: string]: string };
}

interface FormData {
  gender: string;
  email: string;
  name: string;
  age: string;
  country: string;
  image: string | null;
}

const initialState: FormState = {
  formDataArray: [],
  errors: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    submitForm: (state, action: PayloadAction<FormData>) => {
      state.formDataArray.push(action.payload);
      state.errors = {}; 
    },
    setError: (
      state,
      action: PayloadAction<{ field: string; message: string }>
    ) => {
      state.errors[action.payload.field] = action.payload.message;
    },
    clearError: (state, action: PayloadAction<string>) => {
      delete state.errors[action.payload];
    },
    uploadImage: (state, action: PayloadAction<string>) => {
      console.log('Image value:', action.payload);
      state.formDataArray[state.formDataArray.length - 1].image =
        action.payload;
    },
  },
});

export const { submitForm, setError, clearError, uploadImage } =
  formSlice.actions;

export default formSlice.reducer;
