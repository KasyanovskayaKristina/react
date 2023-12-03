import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import data from '../countries.json';
import { useNavigate } from 'react-router-dom';
import { setError, submitForm } from '../../../slices/formSlice';
import { RootState } from '../../store';
import { schema } from '../YupSchema/schemaUncontrolledElement';
import CountrySelect from './CountrySelect';
import ImageUpload from './ImageUpload';
import GenderSelect from './GenderSelect';
import TermsCheckbox from './TermsCheckbox';
import PasswordField from './PasswordField';
import NumberField from './NumberField';
import EmailField from './EmailField';
import TextField from './TextField';
import styles from '../ControlledForm/ControlledForm.module.css';

const PageTwo = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const formErrors = useSelector((state: RootState) => state.form.errors);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [filteredCountries, setFilteredCountries] = useState(
    data.countriesData
  );

  const handleInputChange = () => {
    const inputValue = inputRef.current!.value.toLowerCase();
    const filtered = data.countriesData.filter((country) =>
      country.name.toLowerCase().includes(inputValue)
    );
    setFilteredCountries(filtered);
  };

  const readImageFile = (file: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const age = ageRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const confirmPassword = confirmPasswordRef.current?.value || '';
    const gender = genderRef.current?.value || '';
    const countryId = countryRef.current?.value || '';
    const imageFile = imageRef.current?.files?.[0] || null;
    const image: string | null = imageFile
      ? ((await readImageFile(imageFile)) as string | null)
      : null;
    try {
      await schema.validate(
        {
          name,
          email,
          age,
          password,
          confirmPassword,
          gender,
          country: countryId,
          image: imageFile,
        },
        { abortEarly: false }
      );

      dispatch(
        submitForm({
          name,
          email,
          age,
          gender,
          country: countryId,
          image: image,
        })
      );

      navigator('/');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((validationError) => {
          const field = validationError.path || 'unknown';
          const message = validationError.message || 'Validation Error';
          dispatch(setError({ field, message }));
        });
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <TextField fieldName="name" inputRef={nameRef} formErrors={formErrors} />
      <EmailField
        fieldName="email"
        inputRef={emailRef}
        formErrors={formErrors}
      />
      <NumberField fieldName="age" inputRef={ageRef} formErrors={formErrors} />
      <PasswordField
        fieldName="password"
        inputRef={passwordRef}
        formErrors={formErrors}
      />
      <PasswordField
        fieldName="confirmPassword"
        inputRef={confirmPasswordRef}
        formErrors={formErrors}
      />
      <GenderSelect genderRef={genderRef} formErrors={formErrors} />
      <TermsCheckbox termsRef={termsRef} formErrors={formErrors} />
      <CountrySelect
        inputRef={inputRef}
        countryRef={countryRef}
        handleInputChange={handleInputChange}
        filteredCountries={filteredCountries}
        formErrors={formErrors}
      />
      <ImageUpload imageRef={imageRef} formErrors={formErrors} />
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default PageTwo;
