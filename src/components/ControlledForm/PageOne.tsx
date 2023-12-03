import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import data from '../countries.json';
import { useNavigate } from 'react-router';
import { setCountries } from '../../../slices/countriesSlice';
import { schema } from '../YupSchema/schemaControlledElement';
import NameInput from './NameInput';
import EmailInput from './EmailInput';
import AgeInput from './AgeInput';
import PasswordInput from './PasswordInput';
import ConfirmPasswordInput from './ConfirmPasswordInput';
import GenderRadioGroup from './GenderRadioGroup';
import TermsCheckbox from './TermsCheckbox';
import CountrySelect from './CountrySelect';
import ImageUpload from './ImageUpload';
import {
  clearError,
  setError,
  submitForm,
  uploadImage,
} from '../../../slices/formSlice';
import styles from './ControlledForm.module.css';

const PageOne = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: false,
    country: '',
    image: '',
  });

  const dispatch = useDispatch();
  const formErrors = useSelector((state: RootState) => state.form.errors);
  const countries = data.countriesData;
  const navigator = useNavigate();

  useEffect(() => {
    dispatch(setCountries(countries));
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;

    const finalValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData({ ...formData, [name]: finalValue });

    schema
      .validateAt(name, { [name]: finalValue })
      .then(() => {
        dispatch(clearError(name));
      })
      .catch((error) => {
        dispatch(setError({ field: name, message: error.message }));
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      dispatch(submitForm(formData));
      navigator('/');
    } else {
      console.log('Form has Error.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleImageChange is called');
    const fileList = e.target.files;

    if (fileList) {
      const file = fileList[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          dispatch(uploadImage(reader.result));
        } else {
          console.error('Failed to read the image file.');
        }
      };

      reader.onerror = () => {
        if (reader.error) {
          console.error('Error reading the image file:', reader.error);
        } else {
          console.error('Unknown error reading the image file.');
        }
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <NameInput
        value={formData.name}
        onChange={handleChange}
        error={formErrors.name}
      />
      <EmailInput
        value={formData.email}
        onChange={handleChange}
        error={formErrors.email}
      />
      <AgeInput
        value={formData.age}
        onChange={handleChange}
        error={formErrors.age}
      />
      <PasswordInput
        value={formData.password}
        onChange={handleChange}
        error={formErrors.password}
      />
      <ConfirmPasswordInput
        value={formData.confirmPassword}
        onChange={handleChange}
        error={formErrors.confirmPassword}
      />
      <GenderRadioGroup
        selectedValue={formData.gender}
        onChange={handleChange}
        error={formErrors.gender}
      />
      <TermsCheckbox
        checked={formData.terms}
        onChange={handleChange}
        error={formErrors.terms}
      />
      <CountrySelect
        value={formData.country}
        onChange={handleChange}
        countries={countries}
        error={formErrors.country}
      />
      <ImageUpload onChange={handleImageChange} error={formErrors.image} />
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default PageOne;
